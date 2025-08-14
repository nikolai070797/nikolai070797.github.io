import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, FormHelperText, FormControl, Box, Autocomplete, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Category } from '@entities/category';
import { Product, ProductParams } from '@entities/product';

export type ProductFormProps = {
  categories: Category[];
  defaultValues?: Product;
  loading: boolean;
  onSubmit: (data: ProductParams) => void;
  isSubmitting?: boolean;
};

export type ProductFormHandle = {
  submit: () => void;
};

export const ProductForm = forwardRef<ProductFormHandle, ProductFormProps>(
  ({ categories, defaultValues, loading, onSubmit, isSubmitting = false }, ref) => {
    const { t } = useTranslation('translation', { keyPrefix: 'components.product' });
    const { t: tErrors } = useTranslation('translation', { keyPrefix: 'errors.product' });

    const productSchema = z.object({
      name: z.string().min(1, { message: tErrors('invalid_name') }),
      photo: z
        .string()
        .url({ message: tErrors('invalid_photo') })
        .optional()
        .or(z.literal('')),
      desc: z.string().optional(),
      oldPrice: z
        .number()
        .int()
        .positive({ message: tErrors('invalid_oldPrice_min') })
        .optional()
        .or(z.nan()),
      price: z.number().positive({ message: tErrors('invalid_price') }),
      categoryId: z
        .string({ required_error: tErrors('invalid_category') })
        .min(1, { message: tErrors('invalid_category') }),
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
      defaultValues: {
        name: defaultValues?.name || '',
        photo: defaultValues?.photo || '',
        desc: defaultValues?.desc || '',
        oldPrice: defaultValues?.oldPrice,
        price: defaultValues?.price || 0,
        categoryId: defaultValues?.category?.id || '',
      },
    });

    useEffect(() => {
      if (defaultValues) {
        reset({
          name: defaultValues.name || '',
          photo: defaultValues.photo || '',
          desc: defaultValues.desc || '',
          oldPrice: defaultValues.oldPrice,
          price: defaultValues.price || 0,
          categoryId: defaultValues.category?.id || '',
        });
      } else {
        reset({
          name: '',
          photo: '',
          desc: '',
          oldPrice: undefined,
          price: 0,
          categoryId: '',
        });
      }
    }, [defaultValues, reset]);

    const handleFormSubmit = (data: ProductFormValues) => {
      const submitData: ProductParams = {
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
        ...(data.photo && { photo: data.photo }),
        ...(data.desc && { desc: data.desc }),
        ...(data.oldPrice !== undefined && !isNaN(data.oldPrice) && { oldPrice: data.oldPrice }),
      };
      onSubmit(submitData);
    };

    // Делаем метод submit доступным через ref
    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(handleFormSubmit)(),
    }));

    return (
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 2 }} id="product-form">
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
        <TextField
          {...register('desc')}
          label={t('desc')}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          disabled={isSubmitting}
        />
        <TextField
          {...register('oldPrice', { valueAsNumber: true })}
          label={t('oldPrice')}
          type="number"
          fullWidth
          margin="normal"
          error={!!errors.oldPrice}
          helperText={errors.oldPrice?.message}
          disabled={isSubmitting}
        />
        <TextField
          {...register('price', { valueAsNumber: true })}
          label={t('price')}
          type="number"
          fullWidth
          margin="normal"
          error={!!errors.price}
          helperText={errors.price?.message}
          disabled={isSubmitting}
        />
        <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => {
              const selectedCategory = categories.find((cat) => cat.id === field.value);
              return (
                <Autocomplete
                  loading={loading}
                  options={categories}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  getOptionKey={(option) => option.id}
                  value={selectedCategory || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue?.id || '');
                  }}
                  disabled={isSubmitting || loading}
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
      </Box>
    );
  }
);

ProductForm.displayName = 'ProductForm';
