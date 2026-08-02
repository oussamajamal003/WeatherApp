import type { TemperatureUnit, WindSpeedUnit, PressureUnit } from '../types/settings';

export const UnitConversion = {
  /**
   * Converts Celsius to the target temperature unit.
   */
  convertTemperature(celsius: number, targetUnit: TemperatureUnit): number {
    if (targetUnit === 'fahrenheit') {
      return (celsius * 9) / 5 + 32;
    }
    return celsius;
  },

  /**
   * Converts m/s to the target wind speed unit.
   */
  convertWindSpeed(ms: number, targetUnit: WindSpeedUnit): number {
    if (targetUnit === 'kmh') {
      return ms * 3.6;
    }
    if (targetUnit === 'mph') {
      return ms * 2.23694;
    }
    return ms;
  },

  /**
   * Converts hPa to the target pressure unit.
   */
  convertPressure(hpa: number, targetUnit: PressureUnit): number {
    if (targetUnit === 'mmhg') {
      return hpa * 0.750062;
    }
    if (targetUnit === 'inhg') {
      return hpa * 0.029530;
    }
    return hpa;
  }
};