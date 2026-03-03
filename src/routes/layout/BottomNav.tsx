import { NavLink } from 'react-router';
import { Home, Gym, ClockRotateRight, OpenBook, Settings } from 'iconoir-react';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/workout', icon: Gym, label: 'Train' },
  { to: '/history', icon: ClockRotateRight, label: 'Log' },
  { to: '/form-guide', icon: OpenBook, label: 'Form' },
  { to: '/settings', icon: Settings, label: 'Setup' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-surface/95 backdrop-blur-md dark:bg-surface-secondary-dark/95 md:hidden safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'relative flex flex-col items-center gap-0.5 px-3 py-2.5 text-xs transition-all duration-100 tap-target',
                isActive
                  ? 'text-primary'
                  : 'text-text-muted dark:text-text-muted-dark',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-5 w-5 transition-transform duration-100', isActive && 'scale-110')} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[9px] font-medium uppercase tracking-wider">{label}</span>
                {isActive && (
                  <span className="absolute -top-px left-1/2 h-[2px] w-5 -translate-x-1/2 bg-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
