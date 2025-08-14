import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Category } from '@entities/category';
import { useTranslation } from 'react-i18next';

export type CategoryActionsProps = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting?: boolean;
};

export const CategoryActions: React.FC<CategoryActionsProps> = ({ category, onEdit, onDelete, isDeleting = false }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.category' });

  return (
    <ButtonGroup variant="outlined" size="small" aria-label={t('actionsLabel')}>
      <Button
        startIcon={<EditIcon />}
        onClick={() => onEdit(category)}
        aria-label={`${t('editAriaLabel')} ${category.name}`}
      >
        {t('edit')}
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => onDelete(category)}
        disabled={isDeleting}
        color="error"
        aria-label={`${t('deleteAriaLabel')} ${category.name}`}
      >
        {isDeleting ? t('deleting') : t('delete')}
      </Button>
    </ButtonGroup>
  );
};
