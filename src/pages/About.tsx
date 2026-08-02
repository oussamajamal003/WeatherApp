import { Card, CardContent } from '../components/foundation/Card/Card';
import { Button } from '../components/foundation/Button/Button';
import { Code, MessageCircle, Globe, Heart } from 'lucide-react';
import { useDocumentTitle } from '../hooks/use-document-title';

export function About() {
  useDocumentTitle('WeatherApp | About');
  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <section aria-label="About WeatherApp">
        
        <div className="flex flex-col items-center text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-lg flex items-center justify-center mb-6">
             <CloudIcon aria-hidden="true" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-displayM font-display text-foreground mb-2">WeatherApp</h1>
          <p className="text-body text-muted-foreground max-w-md">
            A beautiful, responsive, and fully featured weather dashboard built with React and Tailwind CSS.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/50 text-caption font-mono text-subtle">
            v1.0.0
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card variant="elevated">
            <CardContent className="p-6 md:p-8 flex flex-col gap-6">
              <div>
                <h2 className="text-h3 font-display mb-2">Data Sources</h2>
                <p className="text-body text-subtle leading-relaxed">
                  WeatherApp utilizes industry-leading meteorological APIs to provide accurate and real-time weather data. 
                  (Mock implementations are currently active for demonstration purposes).
                </p>
              </div>
              
              <hr className="border-border/50" />
              
              <div>
                <h2 className="text-h3 font-display mb-2">Design & Development</h2>
                <p className="text-body text-subtle leading-relaxed mb-6">
                  Carefully crafted with a custom design system, featuring a robust color palette, 
                  fluid typography, and glassmorphism UI elements. Built focusing on accessibility 
                  and responsive behavior across all device sizes.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="gap-2">
                    <Code aria-hidden="true" className="w-4 h-4" /> GitHub Repository
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle aria-hidden="true" className="w-4 h-4" /> Follow Updates
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Globe aria-hidden="true" className="w-4 h-4" /> Portfolio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-center gap-2 text-caption text-muted-foreground mt-8">
            Made with <Heart className="w-3 h-3 text-destructive" fill="currentColor" /> by the Development Team
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
