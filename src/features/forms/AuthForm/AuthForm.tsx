import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/v4';
import { TextField, Button, Box, Typography, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const AuthForm: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.auth' });
  const { t: tErrors } = useTranslation('translation', { keyPrefix: 'errors.auth' });

  const [isLogin, setIsLogin] = useState(true);

  const loginSchema = z.object({
    email: z.email(tErrors('invalid_email')),
    password: z.string().min(6, tErrors('invalid_password', { length: 6 })),
  });

  const registerSchema = loginSchema
    .extend({
      confirmPassword: z.string().min(6, tErrors('invalid_password', { length: 6 })),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tErrors('invalid_confirmPassword'),
      path: ['confirmPassword'],
    });

  type LoginFormData = z.infer<typeof loginSchema>;
  type RegisterFormData = z.infer<typeof registerSchema>;

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const handleLoginSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    loginForm.reset();
  };

  const handleRegisterSubmit = (data: RegisterFormData) => {
    console.log('Register ', data);
    registerForm.reset();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={isLogin ? 0 : 1} onChange={() => setIsLogin(!isLogin)} aria-label="auth tabs">
          <Tab label={t('login')} />
          <Tab label={t('register')} />
        </Tabs>
      </Box>

      {isLogin ? (
        <Box component="form" onSubmit={loginForm.handleSubmit(handleLoginSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            {...loginForm.register('email')}
            label={t('email')}
            fullWidth
            margin="normal"
            error={!!loginForm.formState.errors.email}
            helperText={loginForm.formState.errors.email?.message}
          />

          <TextField
            {...loginForm.register('password')}
            label={t('password')}
            type="password"
            fullWidth
            margin="normal"
            error={!!loginForm.formState.errors.password}
            helperText={loginForm.formState.errors.password?.message}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {t('login')}
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            {...registerForm.register('email')}
            label={t('email')}
            fullWidth
            margin="normal"
            error={!!registerForm.formState.errors.email}
            helperText={registerForm.formState.errors.email?.message}
          />

          <TextField
            {...registerForm.register('password')}
            label={t('password')}
            type="password"
            fullWidth
            margin="normal"
            error={!!registerForm.formState.errors.password}
            helperText={registerForm.formState.errors.password?.message}
          />

          <TextField
            {...registerForm.register('confirmPassword')}
            label={t('confirmPassword')}
            type="password"
            fullWidth
            margin="normal"
            error={!!registerForm.formState.errors.confirmPassword}
            helperText={registerForm.formState.errors.confirmPassword?.message}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {t('register')}
          </Button>
        </Box>
      )}
    </Box>
  );
};
