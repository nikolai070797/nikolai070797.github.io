import { useAuthStore } from '@features/auth';
import { Navigate, useLocation } from 'react-router';

export type RequireAuthProps = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { token } = useAuthStore();
  const location = useLocation();

  // Пути, доступные без авторизации
  const publicPaths = ['/', '/login', '/about', '/team', '/examples', '/product', '/modal', '/cart'];
  const isPublicPath = publicPaths.includes(location.pathname);

  if (!isPublicPath && !token) {
    const redirectTo = encodeURIComponent(window.location.pathname + window.location.search);
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  return children;
};
