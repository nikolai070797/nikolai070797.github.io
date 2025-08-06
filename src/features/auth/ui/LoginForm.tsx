import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';
import { TextField, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@features/auth/model/authStore';
import { useProfileStore } from '@features/profile/model/profileStore';
import { SignInBody } from '@entities/auth/SignInBody';

export type LoginFormProps = {
  onLoginSuccess?: () => void;
  onError?: (error: string) => void;
  isAuthLoading: boolean;
  setLocalFormError: (error: string | null) => void;
};

export type LoginFormData = {
  email: string;
  password: string;
};

const useLoginFormLogic = () => {
  const { t: tErrors } = useTranslation('translation');

  const loginSchema = z.object({
    email: z.string().email(tErrors('errors.auth.invalid_email')),
    password: z.string().min(6, tErrors('errors.auth.invalid_password', { length: 6 })),
  });

  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
};

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onError, isAuthLoading, setLocalFormError }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.auth' });
  const { login } = useAuthStore();
  const { fetchProfile } = useProfileStore();

  const formMethods = useLoginFormLogic();
  const { register, handleSubmit, formState } = formMethods;

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      setLocalFormError(null);
      const success = await login(data as SignInBody);
      if (success) {
        setTimeout(async () => {// use-broadcast-ts не успевает синхронизироваться без таймаута
             await fetchProfile();
        }, 0);
        onLoginSuccess?.();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа';
      onError?.(errorMessage);
      setLocalFormError(errorMessage);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)} noValidate sx={{ mt: 2 }}>
      <TextField
        {...register('email')}
        label={t('email')}
        fullWidth
        margin="normal"
        error={!!formState.errors.email}
        helperText={formState.errors.email?.message}
        disabled={isAuthLoading}
      />
      <TextField
        {...register('password')}
        label={t('password')}
        type="password"
        fullWidth
        margin="normal"
        error={!!formState.errors.password}
        helperText={formState.errors.password?.message}
        disabled={isAuthLoading}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isAuthLoading}>
        {isAuthLoading ? t('loading') : t('login')}
      </Button>
    </Box>
  );
};
