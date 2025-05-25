import { Button } from '@mui/material';
import { useCartStore } from '@shared/store';
import { useState, useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import s from './CartButtonAdd.module.scss';
import { NumberField } from '@base-ui-components/react/number-field';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '@entities/product';

export type CartButtonAddProps = {
  product: Product;
};

const CartButtonAdd = ({ product }: CartButtonAddProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.CartButtonAdd' });
  const cartStore = useCartStore();
  const [countProduct, setCountProduct] = useState(0);

  // Синхронизация локального состояния с корзиной
  useEffect(() => {
    const cartItem = cartStore.cartItems.find((item) => item.product.id === product.id);
    setCountProduct(cartItem ? cartItem.quantity : 0);
  }, [cartStore.cartItems, product.id]);

  const addHandle = () => {
    cartStore.addProduct(product);
  };

  const removeHandle = () => {
    cartStore.decrementProduct(product.id);
  };

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number.parseInt(e.target.value);
    if (!isNaN(newCount) && newCount >= 0) {
      const currentCount = cartStore.cartItems.find((item) => item.product.id === product.id)?.quantity || 0;
      const difference = newCount - currentCount;

      if (difference > 0) {
        // Увеличиваем количество в корзине
        for (let i = 0; i < difference; i++) {
          cartStore.addProduct(product);
        }
      } else if (difference < 0) {
        // Уменьшаем количество в корзине
        for (let i = 0; i < -difference; i++) {
          cartStore.decrementProduct(product.id);
        }
      }
      setCountProduct(newCount);
    }
  };

  const id = React.useId();

  return (
    <>
      {countProduct === 0 ? (
        <Button variant="contained" className={s.buy} onClick={addHandle}>
          {t('textButton')}
        </Button>
      ) : (
        <NumberField.Root id={id} value={countProduct} className={s.field}>
          <NumberField.Group className={s.group}>
            <NumberField.Decrement className={s.decrement} onClick={removeHandle}>
              <RemoveIcon />
            </NumberField.Decrement>
            <NumberField.Input className={s.input} value={countProduct} onChange={onChangeHandle} />
            <NumberField.Increment className={s.increment} onClick={addHandle}>
              <AddIcon />
            </NumberField.Increment>
          </NumberField.Group>
        </NumberField.Root>
      )}
    </>
  );
};

export default CartButtonAdd;