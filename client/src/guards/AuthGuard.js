import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import SignInPage from '../pages/auth/SignInPage';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------
AuthGuard.propType = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <SignInPage />;
  }

  if (isAuthenticated && !user?.isVerifiedByAdmin) {
    return <Navigate to='/verification' />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
