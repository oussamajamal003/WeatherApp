import { validateCoordinates } from './validators';
import { FeatureUnavailableError, ValidationError } from './errors';

/**
 * Service responsible for fetching UV Index data.
 */
export const UVService = {
  /**
   * Fetches the current UV Index for a specific location.
   * Note: The standard OpenWeather free tier does not natively support a UV endpoint.
   * Access to UV data requires an upgraded subscription (e.g. One Call API).
   * 
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns The UV Index value, or throws if unavailable
   */
  async getUVIndex(lat: number, lon: number): Promise<number> {
    const validation = validateCoordinates(lat, lon);
    if (!validation.success) {
      throw new ValidationError(validation.error);
    }

    // Explicitly throw a typed error indicating the feature is unsupported by the current plan
    throw new FeatureUnavailableError('UV Index data requires the One Call API 3.0 subscription, which is not currently available in this environment.');
  }
};
