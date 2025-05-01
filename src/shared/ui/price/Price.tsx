import { Box, Typography } from '@mui/material';
import s from './Price.module.scss';

export type PriceProps = {
  price: number;
  oldPrice?: number;
};

const Price = ({ price, oldPrice }: PriceProps) => {
  return (
    <Box component="span">
      <Typography component="span" className={s.price}>
        {price
          .toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0, // Убирает копейки
          })
          .replace('руб.', '₽')
          .replace(/\s/g, ' ')}
      </Typography>
      {oldPrice && (
        <Typography component="span" className={s['price-old']}>
          {oldPrice
            .toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 0, // Убирает копейки
            })
            .replace('руб.', '₽')
            .replace(/\s/g, ' ')}
        </Typography>
      )}
    </Box>
  );
};

export default Price;
