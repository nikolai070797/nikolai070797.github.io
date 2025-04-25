import { createRandomProduct } from '@homeworks/ts1/3_write';
import { Card, Grid } from '@mui/material';
import { PreviewFull, PreviewMini } from '@shared/ui/product';

const myProduct = createRandomProduct(new Date().toString());

const ProductPage = () => {
  return (
    <Grid container spacing={2}>
      <Card sx={{ height: 'fit-content' }}>
        <PreviewFull product={myProduct} />
      </Card>
      <Card sx={{ height: 'fit-content' }}>
        <PreviewMini product={myProduct} />
      </Card>
    </Grid>
  );
};

export default ProductPage;
