import { createBrowserRouter } from 'react-router';
import { AppLayout } from './layout/AppLayout';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { WorkoutPage } from '../features/workout/pages/WorkoutPage';
import { WorkoutHistoryPage } from '../features/workout/pages/WorkoutHistoryPage';
import { FormGuidePage } from '../features/form-guide/pages/FormGuidePage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';
import { OnboardingPage } from '../features/onboarding/pages/OnboardingPage';

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'workout', element: <WorkoutPage /> },
      { path: 'history', element: <WorkoutHistoryPage /> },
      { path: 'form-guide', element: <FormGuidePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
