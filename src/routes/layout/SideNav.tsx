import { NavLink } from 'react-router';
import { Home, Gym, ClockRotateRight, GraphUp, OpenBook, Settings } from 'iconoir-react';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home', shortcut: '1' },
  { to: '/workout', icon: Gym, label: 'Workout', shortcut: '2' },
  { to: '/history', icon: ClockRotateRight, label: 'History', shortcut: '3' },
  { to: '/progress', icon: GraphUp, label: 'Progress', shortcut: '4' },
  { to: '/form-guide', icon: OpenBook, label: 'Form Guide', shortcut: '5' },
  { to: '/settings', icon: Settings, label: 'Settings', shortcut: '6' },
];

export function SideNav() {
  return (
    <aside className="hidden md:flex md:w-56 lg:w-64 md:flex-col md:border-r md:border-border/50 md:dark:border-border-dark/50 md:bg-surface md:dark:bg-surface-secondary-dark">
      <div className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
            <span className="font-display text-sm font-bold text-black">Z</span>
          </div>
          <div>
            <h1 className="font-display text-sm font-bold uppercase tracking-widest">Zlatify</h1>
            <p className="text-[10px] uppercase tracking-wider text-text-muted dark:text-text-muted-dark leading-none">
              Weighted Calisthenics
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label, shortcut }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-all duration-100',
                isActive
                  ? 'bg-primary/8 text-primary border-l-2 border-primary -ml-px'
                  : 'text-text-muted hover:bg-surface-secondary hover:text-text dark:text-text-muted-dark dark:hover:bg-surface-dark dark:hover:text-text-dark',
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span className="flex-1 uppercase tracking-wide text-xs">{label}</span>
            <kbd className="hidden lg:inline text-[10px] text-text-muted/40 dark:text-text-muted-dark/40 font-mono">
              {shortcut}
            </kbd>
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-border/30 dark:border-border-dark/30">
        <p className="text-[10px] font-mono text-text-muted/40 dark:text-text-muted-dark/40 uppercase tracking-wider">
          v0.1.0
        </p>
      </div>
    </aside>
  );
}
