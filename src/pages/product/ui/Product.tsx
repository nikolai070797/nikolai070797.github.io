import React, { useState, useMemo, useEffect } from 'react';
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
} from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useQuery, QueryFunctionContext, keepPreviousData } from '@tanstack/react-query';
import { PreviewMini } from '@shared/ui/product';
import { ProductList } from '@features/ProductList';
import { productApi } from '@entities/product/api/productApi';
import { ProductFilters, ProductsResult, Product } from '@entities/product';

const PAGE_SIZE = 10;

const ProductPage: React.FC = () => {
  // управляющие состояния
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<'createdAt' | 'updatedAt' | 'name' | 'id'>('createdAt');
  const [sortType, setSortType] = useState<'ASC' | 'DESC'>('DESC');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  // мемо-фильтры
  const filters = useMemo<ProductFilters>(
    () => ({
      pagination: { pageSize: PAGE_SIZE, pageNumber: page },
      sorting: { field: sortField, type: sortType },
      ...(debouncedSearch ? { name: debouncedSearch } : {}),
    }),
    [page, sortField, sortType, debouncedSearch]
  );

  const {
    data: productsResult,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<ProductsResult, Error, ProductsResult, ['products', ProductFilters]>({
    queryKey: ['products', filters],
    queryFn: ({ signal }: QueryFunctionContext<['products', ProductFilters]>) => productApi.list(filters, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
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
    setSortField(e.target.value);
    setPage(1);
  };
  const handleSortTypeChange = (e: SelectChangeEvent<'ASC' | 'DESC'>) => {
    setSortType(e.target.value);
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

  return (
    <Box width="100%">
      {/* Панель управления */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
        <TextField
          label="Поиск по названию"
          size="small"
          value={search}
          onChange={handleSearchChange}
          placeholder="Введите название..."
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
          <InputLabel id="sort-field-label">Сортировка</InputLabel>
          <Select labelId="sort-field-label" value={sortField} label="Сортировка" onChange={handleSortFieldChange}>
            <MenuItem value="createdAt">Дата создания</MenuItem>
            <MenuItem value="updatedAt">Дата обновления</MenuItem>
            <MenuItem value="name">Название</MenuItem>
            <MenuItem value="id">ID</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel id="sort-type-label">Порядок</InputLabel>
          <Select labelId="sort-type-label" value={sortType} label="Порядок" onChange={handleSortTypeChange}>
            <MenuItem value="ASC">По возрастанию</MenuItem>
            <MenuItem value="DESC">По убыванию</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Основной контент */}
      {isError ? (
        <Box>Ошибка при загрузке продуктов</Box>
      ) : isLoading ? (
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
            <ProductList
              products={items}
              renderItem={(product) => <PreviewMini key={product.id} product={product} />}
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
              Обновление...
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductPage;
