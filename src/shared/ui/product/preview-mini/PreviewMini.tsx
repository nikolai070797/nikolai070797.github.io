import { ProductPreview } from '@entities/product';
import { Box, List, ListItem, Stack, Typography } from '@mui/material';
import s from './PreviewMini.module.scss';
import cn from 'clsx';
import { CartButtonAdd } from '@shared/ui/cart';
import Price from '@shared/ui/price';

export type PreviewMiniProps = {
  product: ProductPreview;
};

const PreviewMini = ({ product }: PreviewMiniProps) => {
  return (
    <Box className={s.container}>
      <Typography variant="h5">PreviewMini</Typography>
      <List>
        <ListItem>
          <Typography variant="h6">{product.name}</Typography>
        </ListItem>
        <ListItem>
          <Stack gap={1} direction="row">
            <img width={128} height={128} src={product.photo} />
            <Typography
              title={product.desc}
              className={cn(s['truncate-container'], s['truncate-text'])}
              component="div"
            >
              {product.desc}
            </Typography>
          </Stack>
        </ListItem>

        <ListItem>
          <Stack width={1} direction="row" sx={{ justifyContent: 'space-between' }}>
            <Price price={product.price} oldPrice={product.oldPrice} />
            <CartButtonAdd />
          </Stack>
        </ListItem>
      </List>
    </Box>
  );
};

export default PreviewMini;
