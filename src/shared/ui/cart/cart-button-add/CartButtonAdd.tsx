import { Box, Button, Input, InputBase } from '@mui/material';
import { useCartStore } from '@shared/store';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import s from './CartButtonAdd.module.scss';

export type CartButtonAddProps = {
  count?: number;
  // productId: number;
};

const CartButtonAdd = ({ count = 0 }: CartButtonAddProps) => {
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

  return (
    <>
      {countProduct == 0 ? (
        <Button variant="contained" className={s.buy} onClick={addHandle}>
          {/* <AddShoppingCartIcon /> */}
          Купить
        </Button>
      ) : (
        <Box className={s['count-buttons']}>
          <Box className={s['count-buttons-wrapper']} >
            <Button title="Добавить товар" onClick={addHandle}>
              <AddIcon />
            </Button>
          </Box>
          <InputBase
            inputProps={{ style: { textAlign: 'center' } }}
            className={s.input}
            readOnly
            value={countProduct}
            onChange={onChangeHandle}
          />
          <Box className={s['count-buttons-wrapper']}>
            <Button title="Удалить товар" onClick={removeHandle}>
              <RemoveIcon />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CartButtonAdd;
