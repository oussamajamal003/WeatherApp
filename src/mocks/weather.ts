import type { WeatherData, HourlyForecastData, DailyForecastData } from '../types/weather';

export const mockCurrentWeather: WeatherData = {
  condition: 'partlyCloudy',
  temperature: 72,
  feelsLike: 74,
  humidity: 45,
  windSpeed: 12,
  windDirection: 180,
  pressure: 1012,
  visibility: 10,
  uvIndex: 5,
  airQuality: 42,
  sunrise: '06:15 AM',
  sunset: '08:45 PM',
  moonPhase: 'Waxing Crescent',
  description: 'Partly Cloudy',
  locationName: 'New York, NY',
  updatedAt: '10 mins ago',
};

export const mockHourlyForecast: HourlyForecastData[] = [
  { time: 'Now', condition: 'partlyCloudy', temperature: 72, precipitationProbability: 0 },
  { time: '1 PM', condition: 'sunny', temperature: 74, precipitationProbability: 0 },
  { time: '2 PM', condition: 'sunny', temperature: 75, precipitationProbability: 0 },
  { time: '3 PM', condition: 'partlyCloudy', temperature: 75, precipitationProbability: 10 },
  { time: '4 PM', condition: 'cloudy', temperature: 73, precipitationProbability: 20 },
  { time: '5 PM', condition: 'rain', temperature: 70, precipitationProbability: 60 },
  { time: '6 PM', condition: 'rain', temperature: 68, precipitationProbability: 80 },
  { time: '7 PM', condition: 'cloudy', temperature: 67, precipitationProbability: 30 },
];

export const mockDailyForecast: DailyForecastData[] = [
  { date: '2026-07-31', dayName: 'Today', condition: 'rain', highTemp: 75, lowTemp: 64, precipitationProbability: 60 },
  { date: '2026-08-01', dayName: 'Sat', condition: 'partlyCloudy', highTemp: 78, lowTemp: 65, precipitationProbability: 10 },
  { date: '2026-08-02', dayName: 'Sun', condition: 'sunny', highTemp: 82, lowTemp: 68, precipitationProbability: 0 },
  { date: '2026-08-03', dayName: 'Mon', condition: 'sunny', highTemp: 85, lowTemp: 70, precipitationProbability: 0 },
  { date: '2026-08-04', dayName: 'Tue', condition: 'thunderstorm', highTemp: 80, lowTemp: 68, precipitationProbability: 90 },
  { date: '2026-08-05', dayName: 'Wed', condition: 'rain', highTemp: 74, lowTemp: 65, precipitationProbability: 70 },
  { date: '2026-08-06', dayName: 'Thu', condition: 'cloudy', highTemp: 76, lowTemp: 64, precipitationProbability: 20 },
];
