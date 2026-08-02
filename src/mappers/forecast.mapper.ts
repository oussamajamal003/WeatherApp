import type { OpenWeatherForecastResponse, OpenWeatherForecastItem } from '../api/models';
import type { HourlyForecastData, DailyForecastData } from '../types/weather';
import { mapCondition } from './weather.mapper';

/**
 * Transforms OpenWeather API forecast response into our internal domain model.
 */
export function mapForecastResponse(data: OpenWeatherForecastResponse): { hourly: HourlyForecastData[], daily: DailyForecastData[] } {
  const hourly: HourlyForecastData[] = data.list.slice(0, 8).map((item: OpenWeatherForecastItem) => ({
    time: item.dt_txt,
    condition: mapCondition(item.weather),
    temperature: Math.round(item.main.temp),
    precipitationProbability: Math.round(item.pop * 100)
  }));

  const dailyMap = new Map<string, DailyForecastData>();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (const item of data.list) {
    const dateStr = item.dt_txt.split(' ')[0];
    const dateObj = new Date(dateStr);

    if (!dailyMap.has(dateStr)) {
      dailyMap.set(dateStr, {
        date: dateStr,
        dayName: daysOfWeek[dateObj.getDay()],
        condition: mapCondition(item.weather),
        highTemp: item.main.temp_max,
        lowTemp: item.main.temp_min,
        precipitationProbability: Math.round(item.pop * 100)
      });
    } else {
      const currentDay = dailyMap.get(dateStr)!;
      if (item.main.temp_max > currentDay.highTemp) {
        currentDay.highTemp = item.main.temp_max;
        currentDay.condition = mapCondition(item.weather);
      }
      if (item.main.temp_min < currentDay.lowTemp) {
        currentDay.lowTemp = item.main.temp_min;
      }
      const pop = Math.round(item.pop * 100);
      if (pop > currentDay.precipitationProbability) {
        currentDay.precipitationProbability = pop;
      }
    }
  }

  const daily = Array.from(dailyMap.values())
    .map(d => ({ ...d, highTemp: Math.round(d.highTemp), lowTemp: Math.round(d.lowTemp) }))
    .slice(0, 5);

  return { hourly, daily };
}
