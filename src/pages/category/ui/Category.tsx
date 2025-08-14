import React, { useState, useMemo } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDebounce } from 'use-debounce';
import { useQuery, useQueryClient, QueryFunctionContext, keepPreviousData, useMutation } from '@tanstack/react-query';
import { CategoryActions, CategoryFormModal } from '@features/CategoryManagement';
import { categoryApi } from '@entities/category/api/categoryApi';
import { CategoryFilters, CategoryResult, Category, CategoryParams } from '@entities/category';
import CategoryPreviewFull from '@entities/category/ui/PreviewFull';
import { List } from '@shared/ui/list';
import { useProfileStore } from '@features/profile/model/profileStore';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 10;

const CategoryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  // управляющие состояния
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<'createdAt' | 'updatedAt' | 'name' | 'id'>('createdAt');
  const [sortType, setSortType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  // Состояния для модальных окон и действий
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { profile } = useProfileStore();

  // мемо-фильтры
  const filters = useMemo<CategoryFilters>(
    () => ({
      pagination: { pageSize: PAGE_SIZE, pageNumber: page },
      sorting: { field: sortField, type: sortType },
      ...(debouncedSearch ? { name: debouncedSearch } : {}),
    }),
    [page, sortField, sortType, debouncedSearch]
  );

  const queryClient = useQueryClient();

  const {
    data: categoryResult,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<CategoryResult>({
    queryKey: ['categories', filters, profile],
    queryFn: ({ signal }) => categoryApi.list(filters, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  // Мутации для CRUD операций
  const createCategoryMutation = useMutation({
    mutationFn: (newCategory: CategoryParams) => categoryApi.create(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleCloseModal();
    },
    onError: (error) => {
      console.error('Ошибка при создании категории:', error);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, ...updateData }: CategoryParams & { id: string }) => categoryApi.update(id, updateData),
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData<CategoryResult | undefined>(['categories', filters], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)),
        };
      });
      handleCloseModal();
    },
    onError: (error) => {
      console.error('Ошибка при обновлении категории:', error);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<CategoryResult | undefined>(['categories', filters], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((c) => c.id !== deletedId),
          pagination: {
            ...old.pagination,
            total: old.pagination.total - 1,
          },
        };
      });
      handleCloseDeleteDialog();
    },
    onError: (error) => {
      console.error('Ошибка при удалении категории:', error);
    },
  });

  const items: Category[] = categoryResult?.data ?? [];
  const totalItems = categoryResult?.pagination.total ?? 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;

  // хэндлеры
  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortFieldChange = (e: SelectChangeEvent<'createdAt' | 'updatedAt' | 'name' | 'id'>) => {
    setSortField(e.target.value as any);
    setPage(1);
  };

  const handleSortTypeChange = (e: SelectChangeEvent<'ASC' | 'DESC'>) => {
    setSortType(e.target.value as any);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch('');
    setPage(1);
  };

  // Обработчики модальных окон
  const handleOpenCreateModal = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryToEdit(null);
  };

  // Обработчики удаления
  const handleOpenDeleteDialog = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategoryMutation.mutate(categoryToDelete.id);
    }
  };

  // Обработчик отправки формы (создание/обновление)
  const handleFormSubmit = (data: CategoryParams) => {
    if (categoryToEdit) {
      updateCategoryMutation.mutate({ ...data, id: categoryToEdit.id });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  return (
    <Box width="100%">
      {/* Панель управления */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          label={t('components.category.name')}
          size="small"
          value={search}
          onChange={handleSearchChange}
          placeholder={t('pages.category.title')}
          slotProps={{
            input: {
              endAdornment: search && (
                <Box component="span" sx={{ cursor: 'pointer', px: 1 }} onClick={handleClearSearch}>
                  ×
                </Box>
              ),
            },
          }}
        />
        <FormControl size="small">
          <InputLabel id="sort-field-label">{t('pages.category.title')}</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            label={t('pages.category.title')}
            onChange={handleSortFieldChange}
          >
            <MenuItem value="createdAt">{t('components.category.createdAt')}</MenuItem>
            <MenuItem value="updatedAt">{t('components.category.updatedAt')}</MenuItem>
            <MenuItem value="name">{t('components.category.name')}</MenuItem>
            <MenuItem value="id">ID</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="sort-type-label">{t('components.category.sortOrder')}</InputLabel>
          <Select
            labelId="sort-type-label"
            value={sortType}
            label={t('components.category.sortOrder')}
            onChange={handleSortTypeChange}
          >
            <MenuItem value="ASC">{t('components.category.ascending')}</MenuItem>
            <MenuItem value="DESC">{t('components.category.descending')}</MenuItem>
          </Select>
        </FormControl>
        {profile && profile.commandId && (
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenCreateModal}>
            {t('components.category.addCategory')}
          </Button>
        )}
      </Box>

      {/* Основной контент */}
      {isError ? (
        <Box>
          {/* Локализация ошибок */}
          {error?.message ? error.message : t('errors.LoadingCategories')}
        </Box>
      ) : isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Список категорий */}
          <Grid
            container
            spacing={2}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min-content, 352px))',
            }}
          >
            <List
              items={items}
              renderItem={(category) => (
                <>
                  <CategoryPreviewFull key={category.id} category={category} />
                  {profile && profile.commandId == category.commandId && (
                    <Box sx={{ p: 2 }}>
                      <CategoryActions
                        category={category}
                        onEdit={handleOpenEditModal}
                        onDelete={handleOpenDeleteDialog}
                        isDeleting={
                          deleteCategoryMutation.variables === category.id && deleteCategoryMutation.isPending
                        }
                      />
                    </Box>
                  )}
                </>
              )}
              itemGridProps={{
                sx: { xs: 12, sm: 6, md: 4 },
              }}
            />
          </Grid>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3} mb={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                siblingCount={1}
                boundaryCount={1}
              />
            </Box>
          )}

          {/* Индикатор фоновой загрузки */}
          {isFetching && !isLoading && (
            <Box textAlign="center" mt={1}>
              {t('components.category.updating')}
            </Box>
          )}
        </>
      )}

      {/* Модальное окно формы */}
      <CategoryFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        title={categoryToEdit ? t('components.category.editCategory') : t('components.category.createCategory')}
        isSubmitting={createCategoryMutation.isPending || updateCategoryMutation.isPending}
        initialData={categoryToEdit}
      />

      {/* Диалог подтверждения удаления */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t('components.category.confirmDelete')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {categoryToDelete && t('components.category.confirmDeleteMessage', { name: categoryToDelete.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={deleteCategoryMutation.isPending}>
            {t('components.category.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={deleteCategoryMutation.isPending}
            startIcon={deleteCategoryMutation.isPending ? <CircularProgress size={20} /> : <DeleteIcon />}
          >
            {t('components.category.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryPage;
