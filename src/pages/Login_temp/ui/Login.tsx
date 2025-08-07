import { useAuthStore } from '@features/auth';
import { AuthForm } from '@features/auth/ui/AuthForm';
import { Navigate, useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleLoginSuccess = () => {
    navigate('/');
  };

  const handleRegisterSuccess = () => {
    navigate('/');
  };

  const handleError = (error: string) => {
    console.error('Auth error:', error);
  };

  return (
    <AuthForm
      onLoginSuccess={handleLoginSuccess}
      onRegisterSuccess={handleRegisterSuccess}
      onError={handleError}
    />
  );
};

export default LoginPage;