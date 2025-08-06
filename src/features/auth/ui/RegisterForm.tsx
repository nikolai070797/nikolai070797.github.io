// features/auth/ui/AuthForm/RegisterForm.tsx
import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';
import { TextField, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@features/auth/model/authStore';
import { useProfileStore } from '@features/profile/model/profileStore';
import { SignUpBody } from '@entities/auth/SignUpBody';

export type RegisterFormProps = {
  onRegisterSuccess?: () => void;
  onError?: (error: string) => void;
  isAuthLoading: boolean;
  setLocalFormError: (error: string | null) => void;
};

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const useRegisterFormLogic = () => {
  const { t: tErrors } = useTranslation('translation');

  const registerSchema = z
    .object({
      email: z.string().email(tErrors('errors.auth.invalid_email')),
      password: z.string().min(6, tErrors('errors.auth.invalid_password', { length: 6 })),
      confirmPassword: z.string().min(6, tErrors('errors.auth.invalid_password', { length: 6 })),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tErrors('errors.auth.invalid_confirmPassword'),
      path: ['confirmPassword'],
    });

  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
  onError,
  isAuthLoading,
  setLocalFormError,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.auth' });
  const { signup } = useAuthStore();
  const { fetchProfile } = useProfileStore();

  const formMethods = useRegisterFormLogic();
  const { register, handleSubmit, formState } = formMethods;

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setLocalFormError(null);
      const { confirmPassword, ...registerData } = data;
      const success = await signup(registerData as Omit<SignUpBody, 'commandId'>);
      if (success) {
        await fetchProfile();
        onRegisterSuccess?.();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации';
      onError?.(errorMessage);
      setLocalFormError(errorMessage);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleRegisterSubmit)} noValidate sx={{ mt: 2 }}>
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
      <TextField
        {...register('confirmPassword')}
        label={t('confirmPassword')}
        type="password"
        fullWidth
        margin="normal"
        error={!!formState.errors.confirmPassword}
        helperText={formState.errors.confirmPassword?.message}
        disabled={isAuthLoading}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isAuthLoading}>
        {isAuthLoading ? t('loading') : t('register')}
      </Button>
    </Box>
  );
};
