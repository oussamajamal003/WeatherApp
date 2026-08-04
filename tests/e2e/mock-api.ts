import { Page } from '@playwright/test';

export async function mockWeatherAPI(page: Page) {
  // Mock Geocoding API
  await page.route('**/geo/1.0/direct*', async route => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get('q');
    
    if (query?.toLowerCase().includes('lon')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            name: 'London',
            lat: 51.5074,
            lon: -0.1278,
            country: 'GB',
            state: 'England'
          }
        ])
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    }
  });

  // Mock Reverse Geocoding API (used by Geolocation)
  await page.route('**/geo/1.0/reverse*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          name: 'London',
          lat: 51.5074,
          lon: -0.1278,
          country: 'GB',
          state: 'England'
        }
      ])
    });
  });

  // Mock Current Weather API
  await page.route('**/data/2.5/weather*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d', id: 800 }],
        main: { temp: 20, feels_like: 19, humidity: 50, pressure: 1012, temp_min: 18, temp_max: 22 },
        wind: { speed: 5, deg: 180 },
        visibility: 10000,
        sys: { sunrise: 1629864000, sunset: 1629914400, country: 'GB' },
        name: 'London',
        dt: Date.now() / 1000
      })
    });
  });

  // Mock Forecast API (5 day / 3 hour)
  await page.route('**/data/2.5/forecast*', async route => {
    const list = Array.from({ length: 40 }).map((_, i) => ({
      dt: (Date.now() / 1000) + (i * 10800),
      main: { temp: 20, feels_like: 19, temp_min: 15, temp_max: 22 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      pop: 0
    }));
    
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        list,
        city: { name: 'London', country: 'GB', sunrise: 1629864000, sunset: 1629914400 }
      })
    });
  });

  // Mock Air Pollution API
  await page.route('**/data/2.5/air_pollution*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        list: [{ main: { aqi: 1 }, components: { co: 200, no2: 10, o3: 60, pm2_5: 5, pm10: 10 } }]
      })
    });
  });
}
