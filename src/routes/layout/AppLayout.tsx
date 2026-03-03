import { Outlet } from 'react-router';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-surface-secondary dark:bg-surface-dark md:flex">
      <SideNav />

      <main className="flex-1 pb-20 pt-6 px-4 md:pb-6 md:pl-8 md:pr-8 md:pt-8">
        <div className="mx-auto max-w-3xl page-enter">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
