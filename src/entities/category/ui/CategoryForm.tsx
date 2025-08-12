import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { Category, CategoryParams } from '@entities/category';
import { useTranslation } from 'react-i18next';

export type CategoryFormProps = {
  defaultValues?: Category;
  onSubmit: (data: CategoryParams) => void;
  isSubmitting?: boolean;
};

export const CategoryForm: React.FC<CategoryFormProps> = ({ defaultValues, onSubmit, isSubmitting = false }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.category' });
  const { t: tErrors } = useTranslation('translation', { keyPrefix: 'errors.category' });

  const categorySchema = z.object({
    name: z.string().min(1, { message: tErrors('invalid_name') }),
    photo: z
      .string()
      .url({ message: tErrors('invalid_photo') })
      .optional()
      .or(z.literal('')),
  });

  type CategoryFormValues = z.infer<typeof categorySchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || '',
      photo: defaultValues?.photo || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || '',
        photo: defaultValues.photo || '',
      });
    } else {
      reset({
        name: '',
        photo: '',
      });
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: CategoryFormValues) => {
    const submitData: CategoryParams = {
      name: data.name,
      ...(data.photo && { photo: data.photo }),
    };
    onSubmit(submitData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 2 }}>
      <TextField
        {...register('name')}
        label={t('name')}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
        disabled={isSubmitting}
      />
      <TextField
        {...register('photo')}
        label={t('photo')}
        fullWidth
        margin="normal"
        error={!!errors.photo}
        helperText={errors.photo?.message}
        disabled={isSubmitting}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={24} /> : null}
        {defaultValues ? t('update') : t('create')}
      </Button>
    </Box>
  );
};
