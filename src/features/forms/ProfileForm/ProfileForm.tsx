import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Client } from '@shared/types';

// Схема валидации
const createClientSchema = (tErrors: (key: string) => string) =>
  z.object({
    name: z.string().min(1, tErrors('invalid_name')),
    email: z.string().email(tErrors('invalid_email')),
    phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, tErrors('invalid_phone')),
    about: z.string().min(5, tErrors('invalid_about')),
  });

export type ClientFormValues = z.infer<ReturnType<typeof createClientSchema>>;

export type ClientFormProps = {
  defaultValues?: Client;
  loading?: boolean;
};

export const ProfileForm: React.FC<ClientFormProps> = ({ defaultValues, loading = false }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.client' });
  const { t: tErrors } = useTranslation('translation', { keyPrefix: 'errors.client' });

  const schema = React.useMemo(() => createClientSchema(tErrors), [tErrors]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      name: '',
      email: '',
      phone: '',
      about: '',
    },
  });

  const onSubmit = (data: ClientFormValues) => {
    console.log('Client form data:', data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate >
      <TextField
        {...register('name')}
        label={t('name')}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        {...register('email')}
        label={t('email')}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        {...register('phone')}
        label={t('phone')}
        fullWidth
        margin="normal"
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <TextField
        {...register('about')}
        label={t('about')}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        error={!!errors.about}
        helperText={errors.about?.message}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} disabled={loading}>
        {t('submit')}
      </Button>
    </Box>
  );
};
