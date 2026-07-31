import { WeatherCard, ForecastCard, HourlyForecastCard, DailyForecastCard } from '../components/weather';
import { 
  UVIndex, 
  Sunrise, 
  Sunset, 
  Wind, 
  Humidity, 
  FeelsLike, 
  Pressure, 
  Visibility, 
  AirQuality, 
  MoonPhase 
} from '../components/weather';
import { Card, CardContent } from '../components/foundation/Card/Card';
import { mockCurrentWeather, mockHourlyForecast, mockDailyForecast } from '../mocks/weather';

export function Home() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <section aria-label="Current Weather">
        <WeatherCard 
          data={mockCurrentWeather} 
          size="lg" 
          variant="glass" 
          className="w-full"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main forecasts) */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          
          {/* Hourly Forecast */}
          <section aria-label="Hourly Forecast">
            <ForecastCard title="Hourly Forecast">
              <div className="flex overflow-x-auto pb-2 gap-6 scrollbar-hide snap-x">
                {mockHourlyForecast.map((hour, index) => (
                  <div key={index} className="snap-start shrink-0">
                    <HourlyForecastCard data={hour} />
                  </div>
                ))}
              </div>
            </ForecastCard>
          </section>
          
          {/* Daily Forecast */}
          <section aria-label="7-Day Forecast">
            <ForecastCard title="7-Day Forecast">
              <div className="flex flex-col gap-2">
                {mockDailyForecast.map((day, index) => (
                  <div key={index}>
                    <DailyForecastCard data={day} isToday={index === 0} />
                    {index < mockDailyForecast.length - 1 && (
                      <hr className="border-border/50 my-1" />
                    )}
                  </div>
                ))}
              </div>
            </ForecastCard>
          </section>

        </div>

        {/* Right Column (Metrics Grid) */}
        <div className="flex flex-col gap-6">
          <section aria-label="Weather Details" className="grid grid-cols-2 gap-4">
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <FeelsLike value={mockCurrentWeather.feelsLike} size="md" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <UVIndex value={mockCurrentWeather.uvIndex} size="md" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Wind speed={mockCurrentWeather.windSpeed} direction={mockCurrentWeather.windDirection} size="md" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Humidity value={mockCurrentWeather.humidity} size="md" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Visibility value={mockCurrentWeather.visibility} size="md" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Pressure value={mockCurrentWeather.pressure} size="md" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact" className="col-span-2">
              <CardContent className="h-full flex flex-col justify-center">
                <AirQuality value={mockCurrentWeather.airQuality} size="md" orientation="horizontal" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact" className="col-span-2">
              <CardContent className="h-full flex flex-row items-center justify-between">
                <Sunrise time={mockCurrentWeather.sunrise} size="sm" />
                <Sunset time={mockCurrentWeather.sunset} size="sm" />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact" className="col-span-2">
              <CardContent className="h-full flex flex-col justify-center">
                <MoonPhase phase={mockCurrentWeather.moonPhase} size="md" orientation="horizontal" />
              </CardContent>
            </Card>
          </section>
        </div>
        
      </div>
    </div>
  );
}
