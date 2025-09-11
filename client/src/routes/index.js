import { Suspense, lazy } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
//layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import LockScreenPage from '../pages/LockScreenPage';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <LockScreenPage>
          <MainLayout />
        </LockScreenPage>
      ),
      children: [{ element: <HomePage />, index: true }],
    },
    {
      path: 'transporters',
      element: <MainLayout />,
      children: [{ path: 'map', element: <TransportersMapPage /> }],
    },
    {
      path: 'auth',
      element: (
        <GuestGuard>
          <MainLayout />
        </GuestGuard>
      ),
      children: [
        { path: 'login', element: <SignInPage /> },
        { path: 'register', element: <SignUpPage /> },
      ],
    },
    {
      path: 'auth/verify',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ path: '', element: <TransporterProfilePage /> }],
    },
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to='/dashboard/profile' replace />, index: true },
        { path: 'departures', element: <TransporterDepartures /> },
        { path: 'prices', element: <TransporterPrices /> },
        { path: 'preview', element: <TransporterProfilePreview /> },
        { path: 'profile', element: <TransporterProfilePage /> },
        { path: 'parameter', element: <TransporterParameters /> },
      ],
    },
    {
      path: '*',
      element: <DashboardLayout />,
      children: [{ path: 'verification', element: <VerificationPage /> }],
    },
  ]);
}

// Main
const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
const VerificationPage = Loadable(
  lazy(() => import('../pages/VerificationPage'))
);

// Transporters
const TransportersMapPage = Loadable(
  lazy(() => import('../pages/transporters/TransportersMapPage'))
);

// Auth
const SignInPage = Loadable(lazy(() => import('../pages/auth/SignInPage')));
const SignUpPage = Loadable(lazy(() => import('../pages/auth/SignUpPage')));

// Dashboard
const TransporterDepartures = Loadable(
  lazy(() => import('../pages/dashboard/TransporterDepartures'))
);

const TransporterPrices = Loadable(
  lazy(() => import('../pages/dashboard/TrasnporterPrices'))
);

const TransporterProfilePreview = Loadable(
  lazy(() => import('../pages/dashboard/TransporterProfilePreview'))
);

const TransporterProfilePage = Loadable(
  lazy(() => import('../pages/dashboard/TransporterProfilePage'))
);
const TransporterParameters = Loadable(
  lazy(() => import('../pages/dashboard/TransporterParameters'))
);

const TestPage = Loadable(lazy(() => import('../pages/TestPage')));
