import { createRandomProduct } from '@homeworks/ts1/3_write';
import { Card, Grid } from '@mui/material';
import { PreviewFull, PreviewMini } from '@shared/ui/product';
import { MetaFunction } from 'react-router';

const myProduct = createRandomProduct(new Date().toString());

export const meta: MetaFunction = () => {
    return [{ title: "Conduit" }];
  };

const ProductPage = () => {
  return (
    <Grid container spacing={2}>
      <Card sx={{ height: "fit-content" }}>
        <PreviewFull product={myProduct} />
      </Card>
      <Card sx={{ height: "fit-content" }}>
        <PreviewMini product={myProduct} />
      </Card>
    </Grid>
  );
};

export default ProductPage;
