/**
 * Raw OpenWeather API response models for Air Quality.
 */

interface OpenWeatherAirPollutionItem {
  main: {
    aqi: number; // 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  dt: number;
}

export interface OpenWeatherAirPollutionResponse {
  coord: {
    lon: number;
    lat: number;
  };
  list: OpenWeatherAirPollutionItem[];
}
