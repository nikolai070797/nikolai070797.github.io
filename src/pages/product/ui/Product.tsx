import { Product, ProductFilters, ProductPreview } from '@entities/product';
import { productApi } from '@entities/product/api/productApi';
import { ProductList } from '@features/ProductList';
import { Card, Grid, CircularProgress, Box, Pagination, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, TextField } from '@mui/material';
import { PreviewFull, PreviewMini } from '@shared/ui/product';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<'createdAt' | 'updatedAt' | 'name' | 'id'>('createdAt');
  const [sortType, setSortType] = useState<'ASC' | 'DESC'>('DESC');
  const [searchName, setSearchName] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const PAGE_SIZE = 10;

  const loadProducts = async (filters: ProductFilters) => {
    try {
      setLoading(true);
      const response = await productApi.getProducts(filters);
      setProducts(response.data);
      setTotalPages(response.pagination.total || 1); 
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filters: ProductFilters = {
      pagination: {
        pageSize: PAGE_SIZE,
        pageNumber: currentPage,
      },
      sorting: {
        field: sortField,
        type: sortType,
      },
    };

    // Добавляем поиск по имени, если он есть
    if (searchName.trim()) {
      filters.name = JSON.stringify(searchName.trim());
    }
    
    loadProducts(filters);
  }, [currentPage, sortField, sortType, searchName]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortFieldChange = (event: SelectChangeEvent) => {
    setSortField(event.target.value as any);
    setCurrentPage(1);
  };

  const handleSortTypeChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value as any);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Очищаем предыдущий таймаут
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Устанавливаем новый таймаут для debounce
    const newTimeout = setTimeout(() => {
      setSearchName(value);
      setCurrentPage(1); // Сбрасываем на первую страницу при поиске
    }, 300);
    
    setSearchTimeout(newTimeout);
  };

  const handleClearSearch = () => {
    setSearchName('');
    setCurrentPage(1);
  };

  // Показываем лоадер только при первой загрузке
  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Панель управления */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Поиск по имени */}
        <TextField
          label="Поиск по названию"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={handleSearchChange}
          sx={{ minWidth: 200 }}
          placeholder="Введите название товара..."
          InputProps={{
            endAdornment: searchName ? (
              <button 
                onClick={handleClearSearch}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '18px',
                  padding: '0 5px'
                }}
              >
                ×
              </button>
            ) : null
          }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Сортировать по</InputLabel>
          <Select
            value={sortField}
            label="Сортировать по"
            onChange={handleSortFieldChange}
          >
            <MenuItem value="createdAt">Дата создания</MenuItem>
            <MenuItem value="updatedAt">Дата обновления</MenuItem>
            <MenuItem value="name">Название</MenuItem>
            <MenuItem value="id">ID</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Порядок</InputLabel>
          <Select
            value={sortType}
            label="Порядок"
            onChange={handleSortTypeChange}
          >
            <MenuItem value="ASC">По возрастанию</MenuItem>
            <MenuItem value="DESC">По убыванию</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Список продуктов */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(min-content,352px))',
            }}
          >
            <ProductList products={products} renderItem={(product) => <PreviewMini product={product} />} />
          </Grid>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                siblingCount={1}
                boundaryCount={1}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductPage;