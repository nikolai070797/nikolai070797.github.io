import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@features/auth/model/authStore';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthErrorDisplay } from './AuthErrorDisplay';

export type AuthFormHandlers = {
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
  onError?: (error: string) => void;
};

export type AuthFormProps = {
  defaultIsLogin?: boolean;
} & AuthFormHandlers;

export const AuthForm: React.FC<AuthFormProps> = ({
  defaultIsLogin = true,
  onLoginSuccess,
  onRegisterSuccess,
  onError,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.auth' });
  const {
    isLoading: isAuthLoading,
    error: authError,
    serverErrors,
    clearErrors: clearAuthErrors,
  } = useAuthStore();

  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [localFormError, setLocalFormError] = useState<string | null>(null);

  // Эффект для очистки ошибок при переключении вкладок
  useEffect(() => {
    setLocalFormError(null);
    clearAuthErrors();
  }, [isLogin, clearAuthErrors]); 

  const handleLoginSuccess = () => {
    setLocalFormError(null);
    onLoginSuccess?.();
  };

  const handleRegisterSuccess = () => {
    setLocalFormError(null);
    onRegisterSuccess?.();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={(_, newValue) => setIsLogin(newValue === 0)}
          aria-label="auth tabs"
        >
          <Tab label={t('login')} />
          <Tab label={t('register')} />
        </Tabs>
      </Box>

      <AuthErrorDisplay
        authError={authError}
        serverErrors={serverErrors}
        localFormError={localFormError}
      />

      {isLogin ? (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onError={onError}
          isAuthLoading={isAuthLoading}
          setLocalFormError={setLocalFormError}
        />
      ) : (
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onError={onError}
          isAuthLoading={isAuthLoading}
          setLocalFormError={setLocalFormError}
        />
      )}
    </Box>
  );
};