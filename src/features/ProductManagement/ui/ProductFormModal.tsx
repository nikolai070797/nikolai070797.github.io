import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress } from '@mui/material';
import { ProductForm, ProductFormProps } from '@entities/product/ui/ProductForm/ProductForm';
import { Product } from '@entities/product';
import { useTranslation } from 'react-i18next';

interface ProductFormModalProps extends Omit<ProductFormProps, 'defaultValues'> {
  open: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  initialData?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  submitButtonText,
  isSubmitting = false,
  initialData,
  categories,
  loading,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.product' });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box pt={1}>
          <ProductForm
            categories={categories}
            defaultValues={initialData || undefined}
            loading={loading}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          {t('cancel')}
        </Button>
        <Button
          form="product-form"
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
