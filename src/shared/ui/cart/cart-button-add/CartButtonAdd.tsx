import { Button } from '@mui/material';
import { useCartStore } from '@shared/store';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import s from './CartButtonAdd.module.scss';

import { NumberField } from '@base-ui-components/react/number-field';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type CartButtonAddProps = {
  count?: number;
  // productId: number;
};

const CartButtonAdd = ({ count = 0 }: CartButtonAddProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.CartButtonAdd' });
  const [countProduct, setCountProduct] = useState(count);
  const cartStore = useCartStore();

  const modifyValue = (delta: number) => {
    setCountProduct((prev) => {
      return (prev += delta);
    });
  };
  const addHandle = () => {
    modifyValue(1);
    cartStore.addProduct('1');
  };
  const removeHandle = () => {
    modifyValue(-1);
    cartStore.removeProduct('1');
  };
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountProduct(Number.parseInt(e.target.value));
  };

  const id = React.useId();

  return (
    <>
      {countProduct == 0 ? (
        <Button variant="contained" className={s.buy} onClick={addHandle}>
          {t("textButton")}
        </Button>
      ) : (
        <NumberField.Root id={id} defaultValue={countProduct} className={s.field}>
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
