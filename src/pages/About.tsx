import { Card, CardContent } from '../components/foundation/Card/Card';
import { Button } from '../components/foundation/Button/Button';
import { Code, MessageCircle, Globe, Heart } from 'lucide-react';
import { useDocumentTitle } from '../hooks/use-document-title';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  useDocumentTitle(`WeatherApp | ${t('about.title')}`);
  
  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <section aria-label={t('about.title')}>
        
        <div className="flex flex-col items-center text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-lg flex items-center justify-center mb-6">
             <CloudIcon aria-hidden="true" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-displayM font-display text-foreground mb-2">WeatherApp</h1>
          <p className="text-body text-muted-foreground max-w-md">
            {t('about.description')}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/50 text-caption font-mono text-subtle">
            {t('about.version')} 1.0.0
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card variant="elevated">
            <CardContent className="p-6 md:p-8 flex flex-col gap-6">
              <div>
                <h2 className="text-h3 font-display mb-2">{t('about.dataProvidedBy')}</h2>
                <p className="text-body text-subtle leading-relaxed">
                  {t('about.dataProvidedDesc')}
                </p>
              </div>
              
              <hr className="border-border/50" />
              
              <div>
                <h2 className="text-h3 font-display mb-2">{t('about.techStack')}</h2>
                <p className="text-body text-subtle leading-relaxed mb-6">
                  {t('about.techStackDesc')}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="gap-2">
                    <Code aria-hidden="true" className="w-4 h-4" /> {t('about.githubRepo')}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle aria-hidden="true" className="w-4 h-4" /> {t('about.followUpdates')}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Globe aria-hidden="true" className="w-4 h-4" /> {t('about.portfolio')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-center gap-2 text-caption text-muted-foreground mt-8">
            {t('about.madeWith')} <Heart className="w-3 h-3 text-destructive" fill="currentColor" /> {t('about.byDevTeam')}
          </div>
        </div>

      </section>
    </div>
  );
}

function CloudIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  );
}
