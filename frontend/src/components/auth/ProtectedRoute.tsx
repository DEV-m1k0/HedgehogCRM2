import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = localStorage.getItem('user');
  const accessToken = localStorage.getItem('access_token');

  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
