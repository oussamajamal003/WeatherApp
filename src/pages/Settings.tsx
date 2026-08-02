import { Card, CardHeader, CardTitle, CardContent } from '../components/foundation/Card/Card';
import { useSettings } from '../hooks/use-settings';
import { Moon, Sun, Monitor, Thermometer, Wind, Gauge, Globe } from 'lucide-react';
import { cn } from '../utils/cn';
import { useDocumentTitle } from '../hooks/use-document-title';
import { useToast } from '../hooks/useToast';
import { useTranslation } from 'react-i18next';
import type { Theme, TemperatureUnit, WindSpeedUnit, PressureUnit, Language } from '../types/settings';

export function Settings() {
  const { settings, updateSettings } = useSettings();
  const { toast } = useToast();
  const { t } = useTranslation();
  useDocumentTitle(`WeatherApp | ${t('navigation.settings')}`);

  const handleSetTheme = (newTheme: Theme) => {
    updateSettings({ theme: newTheme });
    toast.success(t('toasts.themeChanged', { theme: t(`settings.${newTheme}`) }));
  };

  const handleSetTemp = (unit: TemperatureUnit) => {
    updateSettings({ temperatureUnit: unit });
    toast.success(t('toasts.tempUpdated'));
  };

  const handleSetWind = (unit: WindSpeedUnit) => {
    updateSettings({ windSpeedUnit: unit });
    toast.success(t('toasts.windUpdated'));
  };

  const handleSetPressure = (unit: PressureUnit) => {
    updateSettings({ pressureUnit: unit });
    toast.success(t('toasts.pressureUpdated'));
  };

  const handleSetLanguage = (lang: Language) => {
    updateSettings({ language: lang });
    toast.success(t('toasts.langUpdated'));
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <section aria-label={t('navigation.settings')}>
        <h1 className="text-h2 font-display mb-8 text-foreground">{t('settings.title')}</h1>
        
        <div className="flex flex-col gap-6">
          
          {/* Appearance Settings */}
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="bg-surface-hover/50 pb-4 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary" />
                {t('settings.appearance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-body font-medium text-foreground">{t('settings.themePref')}</h3>
                  <p className="text-caption text-subtle mt-1">{t('settings.themeDesc')}</p>
                </div>
                
                <div className="flex bg-surface-hover p-1 rounded-lg border border-border/50 w-full sm:w-auto">
                  <button 
                    onClick={() => handleSetTheme('light')}
                    aria-pressed={settings.theme === 'light'}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-small font-medium rounded-md transition-all',
                      settings.theme === 'light' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Sun aria-hidden="true" className="w-4 h-4" /> {t('settings.light')}
                  </button>
                  <button 
                    onClick={() => handleSetTheme('dark')}
                    aria-pressed={settings.theme === 'dark'}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-small font-medium rounded-md transition-all',
                      settings.theme === 'dark' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Moon aria-hidden="true" className="w-4 h-4" /> {t('settings.dark')}
                  </button>
                  <button 
                    onClick={() => handleSetTheme('system')}
                    aria-pressed={settings.theme === 'system'}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-small font-medium rounded-md transition-all',
                      settings.theme === 'system' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Monitor aria-hidden="true" className="w-4 h-4" /> {t('settings.system')}
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
                {t('settings.units')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-6">
              {/* Temperature */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-body font-medium text-foreground">{t('settings.tempUnit')}</h3>
                  <p className="text-caption text-subtle mt-1">{t('settings.tempDesc')}</p>
                </div>
                
                <div className="flex bg-surface-hover p-1 rounded-lg border border-border/50 w-full sm:w-auto">
                  <button 
                    onClick={() => handleSetTemp('celsius')}
                    className={cn(
                      "flex-1 px-6 py-2 text-small font-medium rounded-md transition-all",
                      settings.temperatureUnit === 'celsius' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    °C
                  </button>
                  <button 
                    onClick={() => handleSetTemp('fahrenheit')}
                    className={cn(
                      "flex-1 px-6 py-2 text-small font-medium rounded-md transition-all",
                      settings.temperatureUnit === 'fahrenheit' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    °F
                  </button>
                </div>
              </div>
              
              {/* Wind Speed */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-t border-border/50 pt-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-subtle" />
                    <h3 className="text-body font-medium text-foreground">{t('settings.windUnit')}</h3>
                  </div>
                  <p className="text-caption text-subtle mt-1">{t('settings.windDesc')}</p>
                </div>
                
                <div className="flex bg-surface-hover p-1 rounded-lg border border-border/50 w-full sm:w-auto">
                  <button 
                    onClick={() => handleSetWind('ms')}
                    className={cn(
                      "flex-1 px-4 py-2 text-small font-medium rounded-md transition-all",
                      settings.windSpeedUnit === 'ms' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    m/s
                  </button>
                  <button 
                    onClick={() => handleSetWind('kmh')}
                    className={cn(
                      "flex-1 px-4 py-2 text-small font-medium rounded-md transition-all",
                      settings.windSpeedUnit === 'kmh' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    km/h
                  </button>
                  <button 
                    onClick={() => handleSetWind('mph')}
                    className={cn(
                      "flex-1 px-4 py-2 text-small font-medium rounded-md transition-all",
                      settings.windSpeedUnit === 'mph' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    mph
                  </button>
                </div>
              </div>
              
              {/* Pressure */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-t border-border/50 pt-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-subtle" />
                    <h3 className="text-body font-medium text-foreground">{t('settings.pressureUnit')}</h3>
                  </div>
                  <p className="text-caption text-subtle mt-1">{t('settings.pressureDesc')}</p>
                </div>
                
                <div className="flex bg-surface-hover p-1 rounded-lg border border-border/50 w-full sm:w-auto">
                  <button 
                    onClick={() => handleSetPressure('hpa')}
                    className={cn(
                      "flex-1 px-4 py-2 text-small font-medium rounded-md transition-all",
                      settings.pressureUnit === 'hpa' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    hPa
                  </button>
                  <button 
                    onClick={() => handleSetPressure('mmhg')}
                    className={cn(
                      "flex-1 px-4 py-2 text-small font-medium rounded-md transition-all",
                      settings.pressureUnit === 'mmhg' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    mmHg
                  </button>
                  <button 
                    onClick={() => handleSetPressure('inhg')}
                    className={cn(
                      "flex-1 px-4 py-2 text-small font-medium rounded-md transition-all",
                      settings.pressureUnit === 'inhg' ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    )}>
                    inHg
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Language Settings */}
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="bg-surface-hover/50 pb-4 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t('settings.language')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-body font-medium text-foreground">{t('settings.apiLocalization')}</h3>
                  <p className="text-caption text-subtle mt-1">{t('settings.langDesc')}</p>
                </div>
                
                <div className="flex flex-wrap bg-surface-hover p-1 rounded-lg border border-border/50 w-full sm:w-auto max-w-[300px]">
                  {(['en', 'ar'] as Language[]).map(lang => (
                    <button 
                      key={lang}
                      onClick={() => handleSetLanguage(lang)}
                      className={cn(
                        "px-4 py-2 text-small font-medium rounded-md transition-all",
                        settings.language === lang ? 'bg-surface text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      )}>
                      {lang === 'ar' ? 'العربية' : 'EN'}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}
