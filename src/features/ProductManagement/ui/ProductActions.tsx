import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Product } from '@entities/product';
import { useTranslation } from 'react-i18next';

type ProductActionsProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isDeleting?: boolean;
};

export const ProductActions: React.FC<ProductActionsProps> = ({ product, onEdit, onDelete, isDeleting = false }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.product' });

  return (
    <ButtonGroup variant="outlined" size="small" aria-label={t('actionsLabel')}>
      <Button
        startIcon={<EditIcon />}
        onClick={() => onEdit(product)}
        aria-label={`${t('editAriaLabel')} ${product.name}`}
      >
        {t('edit')}
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => onDelete(product)}
        disabled={isDeleting}
        color="error"
        aria-label={`${t('deleteAriaLabel')} ${product.name}`}
      >
        {isDeleting ? t('deleting') : t('delete')}
      </Button>
    </ButtonGroup>
  );
};
