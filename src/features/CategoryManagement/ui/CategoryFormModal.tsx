import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { CategoryForm, CategoryFormProps } from '@entities/category/ui/CategoryForm';
import { Category } from '@entities/category';
import { useTranslation } from 'react-i18next';

interface CategoryFormModalProps extends Omit<CategoryFormProps, 'defaultValues'> {
  open: boolean;
  onClose: () => void;
  title: string;
  initialData?: Category | null;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  isSubmitting = false,
  initialData,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.category' });
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box pt={1}>
          <CategoryForm defaultValues={initialData || undefined} onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
