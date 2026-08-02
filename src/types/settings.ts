export type Theme = 'light' | 'dark' | 'system';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'ms' | 'kmh' | 'mph';
export type PressureUnit = 'hpa' | 'mmhg' | 'inhg';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar';

export interface AppSettings {
  theme: Theme;
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  pressureUnit: PressureUnit;
  language: Language;
}
