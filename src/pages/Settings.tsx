import { Card, CardHeader, CardTitle, CardContent } from '../components/foundation/Card/Card';
import { Button } from '../components/foundation/Button/Button';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, Monitor, Thermometer, Bell } from 'lucide-react';
import { cn } from '../utils/cn';

export function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-4 md:p-8">
      <section aria-label="Settings">
        <h1 className="text-h2 font-display mb-8 text-foreground">Settings</h1>
        
        <div className="flex flex-col gap-6">
          
          {/* Appearance Settings */}
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="bg-surface-hover/50 pb-4 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-body font-medium text-foreground">Theme Preference</h3>
                  <p className="text-caption text-subtle mt-1">Choose how WeatherApp looks on this device.</p>
                </div>
                
                <div className="flex bg-surface-hover p-1 rounded-lg border border-border/50 w-full sm:w-auto">
                  <button 
                    onClick={() => setTheme('light')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-small font-medium rounded-md transition-all',
                      theme === 'light' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Sun className="w-4 h-4" /> Light
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-small font-medium rounded-md transition-all',
                      theme === 'dark' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                  <button 
                    onClick={() => setTheme('system')}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-small font-medium rounded-md transition-all',
                      theme === 'system' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Monitor className="w-4 h-4" /> System
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unit Settings */}
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="bg-surface-hover/50 pb-4 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-primary" />
                Units
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-body font-medium text-foreground">Temperature Unit</h3>
                  <p className="text-caption text-subtle mt-1">Display temperature in Celsius or Fahrenheit.</p>
                </div>
                
                <div className="flex bg-surface-hover p-1 rounded-lg border border-border/50 w-full sm:w-auto">
                  <button className="flex-1 px-6 py-2 text-small font-medium rounded-md bg-surface text-foreground shadow-sm">
                    °C
                  </button>
                  <button className="flex-1 px-6 py-2 text-small font-medium rounded-md text-muted-foreground hover:text-foreground">
                    °F
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="bg-surface-hover/50 pb-4 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-body font-medium text-foreground">Severe Weather Alerts</h3>
                  <p className="text-caption text-subtle mt-1">Get notified about extreme weather conditions.</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}
