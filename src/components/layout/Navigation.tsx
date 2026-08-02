import { Home, Search, Settings, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { t } = useTranslation();
  
  const navItems = [
    { label: t('navigation.home'), icon: Home, path: '/' },
    { label: t('navigation.search'), icon: Search, path: '/search' },
    { label: t('navigation.settings'), icon: Settings, path: '/settings' },
    { label: t('navigation.about'), icon: Info, path: '/about' },
  ];

  return (
    <>
      {/* Tablet (Nav Rail) & Desktop (Full Sidebar) */}
      <nav className="hidden md:flex flex-col sticky top-0 h-screen border-r rtl:border-r-0 rtl:border-l border-border-subtle bg-surface z-40 shrink-0 md:w-[72px] lg:w-[240px] transition-all duration-300 box-content pl-[env(safe-area-inset-left)] rtl:pl-0 rtl:pr-[env(safe-area-inset-right)]">
        <div className="flex-1 overflow-y-auto py-12 flex flex-col gap-4 px-6 lg:px-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-8 rounded-xl p-6 transition-colors ${
                  isActive 
                    ? 'bg-primary-subtle text-primary hover:bg-primary-subtle/80' 
                    : 'text-text-secondary hover:bg-card-subtle hover:text-text'
                }`
              }
              title={item.label}
            >
              <item.icon aria-hidden="true" className="w-6 h-6 shrink-0" />
              <span className="hidden lg:block font-medium text-body">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile (Bottom Tab Bar) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-[80px] box-content pb-[env(safe-area-inset-bottom,34px)] bg-surface/80 backdrop-blur-xl border-t border-border-subtle z-50 flex items-center justify-around px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-2 min-w-[64px] h-full transition-colors ${
                isActive ? 'text-primary' : 'text-text-secondary hover:text-text'
              }`
            }
          >
            <item.icon aria-hidden="true" className="w-6 h-6 shrink-0" />
            <span className="text-caption font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
