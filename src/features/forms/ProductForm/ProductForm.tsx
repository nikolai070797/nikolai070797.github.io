import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  FormHelperText,
  Button,
  FormControl,
  Box,
  Autocomplete,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Category } from '@shared/types';
import { Product } from '@entities/product';

export type ProductFormProps = {
  categories: Category[];
  defaultValues?: Product;
  loading: boolean;
};

export const ProductForm: React.FC<ProductFormProps> = ({ categories, defaultValues, loading }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.product' });
  const { t: tErrors } = useTranslation('translation', { keyPrefix: 'errors.product' });

  const productSchema = z.object({
    name: z.string().nonempty(tErrors('invalid_name')),
    photo: z.string().url(tErrors('invalid_photo')),
    desc: z.string().optional(),
    oldPrice: z.union([z.number().int().positive(tErrors('invalid_oldPrice_min')).min(1), z.nan()]).optional(),
    price: z.number().positive(tErrors('invalid_price')),
    categoryId: z.string({ required_error: tErrors('invalid_category') }).nonempty(),
  });

  type ProductFormValues = z.infer<typeof productSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues || {
      name: '',
      photo: '',
      price: 0,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form data:', data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
      <TextField
        {...register('name')}
        label={t('name')}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        {...register('photo')}
        label={t('photo')}
        fullWidth
        margin="normal"
        error={!!errors.photo}
        helperText={errors.photo?.message}
      />

      <TextField {...register('desc')} label={t('desc')} fullWidth margin="normal" multiline rows={3} />

      <TextField
        {...register('oldPrice', { valueAsNumber: true })}
        label={t('oldPrice')}
        type="number"
        fullWidth
        margin="normal"
        error={!!errors.oldPrice}
        helperText={errors.oldPrice?.message}
      />

      <TextField
        {...register('price', { valueAsNumber: true })}
        label={t('price')}
        type="number"
        fullWidth
        margin="normal"
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
        <Controller
          name="categoryId"
          control={control}
          shouldUnregister
          render={({ field }) => {
            const selectedCategory = categories.find((cat) => cat.id === field.value);

            return (
              <Autocomplete
                loading={loading}
                options={categories}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionKey={(option) => option.id}
                value={selectedCategory || null}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<Typography>{t('category')}</Typography>}
                    error={!!errors.categoryId}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      },
                    }}
                  />
                )}
              />
            );
          }}
        />
        {errors.categoryId && <FormHelperText error>{errors.categoryId.message}</FormHelperText>}
      </FormControl>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {t('submit')}
      </Button>
    </Box>
  );
};
