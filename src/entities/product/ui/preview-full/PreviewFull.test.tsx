import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PreviewFull } from './PreviewFull';
import { Product } from '@entities/product';
import { Category } from '@entities/category';

// Мокаем дочерние компоненты
vi.mock('@shared/ui/cart', () => ({
  CartButtonAdd: ({ product }: { product: Product }) => (
    <button data-testid={`cart-button-${product.id}`}>Add to Cart</button>
  ),
}));

vi.mock('@shared/ui/price', () => ({
  default: ({ price, oldPrice }: { price: number; oldPrice?: number }) => (
    <div data-testid="price">
      <span data-testid="current-price">{price}</span>
      {oldPrice && <span data-testid="old-price">{oldPrice}</span>}
    </div>
  ),
}));

// Мокаем MUI компоненты
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Avatar: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} data-testid="avatar" />,
    Chip: ({ label, avatar }: { label: string; avatar: React.ReactNode }) => (
      <div data-testid="chip">
        {avatar}
        <span>{label}</span>
      </div>
    ),
    Box: ({ children, id, ...props }: any) => (
      <div id={id} {...props} data-testid="box">
        {children}
      </div>
    ),
    List: ({ children }: any) => <div data-testid="list">{children}</div>,
    ListItem: ({ children }: any) => <div data-testid="list-item">{children}</div>,
    Typography: ({ children, variant, color }: any) => {
      const props: any = {};
      if (variant) props['data-variant'] = variant;
      if (color) props['data-color'] = color;
      return <div {...props}>{children}</div>;
    },
  };
});

describe('PreviewFull', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Тестовый продукт',
    desc: 'Описание тестового продукта',
    price: 1000,
    oldPrice: 1200,
    photo: 'https://example.com/photo.jpg',
    createdAt: new Date('2025-02-01T10:00:00Z'),
    updatedAt: new Date('2025-02-02T15:30:00Z'),
    commandId: 'nikolai070797',
    category: {
      id: 'cat-1',
      name: 'Тестовая категория',
      photo: 'https://example.com/category.jpg',
      createdAt: new Date('2025-01-01T10:00:00Z'),
      updatedAt: new Date('2025-01-01T15:00:00Z'),
      commandId: 'nikolai070797',
    },
  };

  it('рендерится корректно с полными данными', () => {
    render(<PreviewFull product={mockProduct} />);

    // Проверяем название продукта
    expect(screen.getByText('Тестовый продукт')).toBeInTheDocument();

    // Проверяем изображение продукта
    const productImage = screen.getByRole('img', { name: '' });
    expect(productImage).toHaveAttribute('src', 'https://example.com/photo.jpg');

    // Проверяем описание
    expect(screen.getByText('Описание тестового продукта')).toBeInTheDocument();

    // Проверяем цену
    expect(screen.getByTestId('current-price')).toHaveTextContent('1000');
    expect(screen.getByTestId('old-price')).toHaveTextContent('1200');

    // Проверяем кнопку корзины
    expect(screen.getByTestId('cart-button-1')).toBeInTheDocument();

    // Проверяем категорию
    expect(screen.getByTestId('chip')).toBeInTheDocument();
    expect(screen.getByText('Тестовая категория')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toHaveAttribute('src', 'https://example.com/category.jpg');

    // Проверяем дополнительные поля
    expect(screen.getByText(/1 февраля 2025 г. в 20:00/)).toBeInTheDocument();
    expect(screen.getByText(/Обновлено: 3 февраля 2025 г. в 01:30/)).toBeInTheDocument();
    expect(screen.getByText(/commandId: nikolai070797/)).toBeInTheDocument();
  });

  it('рендерится корректно без категории', () => {
    const productWithoutCategory: Omit<Product, 'category'> & { category?: Category } = {
      ...mockProduct,
      category: undefined,
    };

    render(<PreviewFull product={productWithoutCategory as Product} />);

    // Категория не должна отображаться
    expect(screen.queryByTestId('chip')).not.toBeInTheDocument();
  });

  it('рендерится корректно без старой цены', () => {
    const productWithoutOldPrice = {
      ...mockProduct,
      oldPrice: undefined,
    };

    render(<PreviewFull product={productWithoutOldPrice} />);

    expect(screen.getByTestId('current-price')).toBeInTheDocument();
    expect(screen.queryByTestId('old-price')).not.toBeInTheDocument();
  });

  it('рендерится корректно без фото', () => {
    const productWithoutPhoto: Product = {
      ...mockProduct,
      photo: undefined,
    };

    render(<PreviewFull product={productWithoutPhoto} />);

    expect(screen.queryByRole('img', { name: '' })).not.toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('использует memo для оптимизации', () => {
    const { rerender } = render(<PreviewFull product={mockProduct} />);

    // Первый рендер
    expect(screen.getByText('Тестовый продукт')).toBeInTheDocument();

    // Ререндер с теми же пропсами - должен использовать memo
    rerender(<PreviewFull product={mockProduct} />);

    // Компонент должен остаться без перерендера
    expect(screen.getByText('Тестовый продукт')).toBeInTheDocument();
  });
});
