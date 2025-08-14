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
import { PreviewFull, PreviewMini } from '@entities/product';
import { ProductFormModal, ProductActions } from '@features/ProductManagement';
import { productApi } from '@entities/product/api/productApi';
import { ProductFilters, ProductsResult, Product, ProductParams } from '@entities/product';
import { CategoryResult } from '@entities/category';
import { categoryApi } from '@entities/category/api/categoryApi';
import { List } from '@shared/ui/list/List';
import { useProfileStore } from '@features/profile/model/profileStore';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 10;

const ProductPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  // управляющие состояния
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<'createdAt' | 'updatedAt' | 'name' | 'id'>('createdAt');
  const [sortType, setSortType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  // Состояния для модальных окон и действий
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { profile } = useProfileStore();

  // Загрузка категорий
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery<CategoryResult, Error, CategoryResult, ['categories']>({
    queryKey: ['categories'],
    queryFn: ({ signal }: QueryFunctionContext<['categories']>) => categoryApi.list(undefined, { signal }),
    staleTime: 5 * 60 * 1000, // 5 минут
  });

  const categories = categoriesData?.data || [];

  // мемо-фильтры
  const filters = useMemo<ProductFilters>(
    () => ({
      pagination: { pageSize: PAGE_SIZE, pageNumber: page },
      sorting: { field: sortField, type: sortType },
      ...(debouncedSearch ? { name: debouncedSearch } : {}),
    }),
    [page, sortField, sortType, debouncedSearch]
  );

  const queryClient = useQueryClient();

  const {
    data: productsResult,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<ProductsResult>({
    queryKey: ['products', filters, profile],
    queryFn: ({ signal }) => productApi.list(filters, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  // Мутации для CRUD операций
  const createProductMutation = useMutation({
    mutationFn: (newProduct: ProductParams) => productApi.create(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      handleCloseModal();
    },
    onError: (error) => {
      console.error('Ошибка при создании продукта:', error);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, ...updateData }: ProductParams & { id: string }) => productApi.update(id, updateData),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData<ProductsResult | undefined>(['products', filters], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
        };
      });
      handleCloseModal();
    },
    onError: (error) => {
      console.error('Ошибка при обновлении продукта:', error);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<ProductsResult | undefined>(['products', filters], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((p) => p.id !== deletedId),
          pagination: {
            ...old.pagination,
            total: old.pagination.total - 1,
          },
        };
      });
      handleCloseDeleteDialog();
    },
    onError: (error) => {
      console.error('Ошибка при удалении продукта:', error);
    },
  });

  const items: Product[] = productsResult?.data ?? [];
  const totalItems = productsResult?.pagination.total ?? 0;
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
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  // Обработчики удаления
  const handleOpenDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete.id);
    }
  };

  // Обработчик отправки формы (создание/обновление)
  const handleFormSubmit = (data: ProductParams) => {
    if (productToEdit) {
      updateProductMutation.mutate({ ...data, id: productToEdit.id });
    } else {
      createProductMutation.mutate(data);
    }
  };

  // Обработчик действий над продуктом
  const handleProductAction = (product: Product, action: 'edit' | 'delete') => {
    if (action === 'edit') {
      handleOpenEditModal(product);
    } else if (action === 'delete') {
      handleOpenDeleteDialog(product);
    }
  };

  return (
    <Box width="100%">
      {/* Панель управления */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          label={t('components.product.name')}
          size="small"
          value={search}
          onChange={handleSearchChange}
          placeholder={t('pages.product.title')}
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
          <InputLabel id="sort-field-label">{t('pages.product.title')}</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            label={t('pages.product.title')}
            onChange={handleSortFieldChange}
          >
            <MenuItem value="createdAt">{t('components.product.createdAt')}</MenuItem>
            <MenuItem value="updatedAt">{t('components.product.updatedAt')}</MenuItem>
            <MenuItem value="name">{t('components.product.name')}</MenuItem>
            <MenuItem value="id">ID</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="sort-type-label">{t('components.product.sortOrder')}</InputLabel>
          <Select
            labelId="sort-type-label"
            value={sortType}
            label={t('components.product.sortOrder')}
            onChange={handleSortTypeChange}
          >
            <MenuItem value="ASC">{t('components.product.ascending')}</MenuItem>
            <MenuItem value="DESC">{t('components.product.descending')}</MenuItem>
          </Select>
        </FormControl>
        {profile && profile.commandId && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            disabled={isCategoriesLoading || isCategoriesError}
          >
            {t('components.product.addProduct')}
          </Button>
        )}
      </Box>

      {/* Основной контент */}
      {isError || isCategoriesError ? (
        <Box>
          {/* Локализация ошибок */}
          {isError && t('errors.LoadingProducts')}
          {isCategoriesError && t('errors.LoadingCategories')}
        </Box>
      ) : isLoading || isCategoriesLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Список товаров */}
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
              renderItem={(product) => (
                <Box key={product.id} sx={{ position: 'relative' }}>
                  <PreviewFull product={product} />
                  {profile && profile.commandId == product.commandId && (
                    <Box sx={{ p: 2 }}>
                      <ProductActions
                        product={product}
                        onEdit={() => handleProductAction(product, 'edit')}
                        onDelete={() => handleProductAction(product, 'delete')}
                        isDeleting={deleteProductMutation.variables === product.id && deleteProductMutation.isPending}
                      />
                    </Box>
                  )}
                </Box>
              )}
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
              {t('components.product.updating')}
            </Box>
          )}
        </>
      )}

      {/* Модальное окно формы */}
      <ProductFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        title={productToEdit ? t('components.product.editProduct') : t('components.product.createProduct')}
        submitButtonText={productToEdit ? t('components.product.update') : t('components.product.create')}
        isSubmitting={createProductMutation.isPending || updateProductMutation.isPending}
        initialData={productToEdit}
        categories={categories}
        loading={isCategoriesLoading}
      />

      {/* Диалог подтверждения удаления */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{t('components.product.confirmDelete')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {productToDelete && t('components.product.confirmDeleteMessage', { name: productToDelete.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={deleteProductMutation.isPending}>
            {t('components.product.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={deleteProductMutation.isPending}
            startIcon={deleteProductMutation.isPending ? <CircularProgress size={20} /> : <DeleteIcon />}
          >
            {t('components.product.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductPage;
