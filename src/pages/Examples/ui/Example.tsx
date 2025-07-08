import Tip from '@features/Tip';
import { TipPlace } from '@features/Tip/ui/Tip';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ExamplePage = () => {
  const { t } = useTranslation('translation');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', gap: '1rem' }}>
        <Tip place={TipPlace.top} title={<Typography>My custom title TOP</Typography>}>
          <Typography>TOP</Typography>
        </Tip>
        <Tip place={TipPlace.left} title={<Typography>My custom title LEFT</Typography>}>
          <Typography>LEFT</Typography>
        </Tip>
        <Tip place={TipPlace.right} title={<Typography>My custom title RIGHT</Typography>}>
          <Typography>RIGHT</Typography>
        </Tip>
        <Tip place={TipPlace.bottom} title={<Typography>My custom title Bottom</Typography>}>
          <Typography>BOTTOM</Typography>
        </Tip>
        
      </div>
    </>
  );
};

export default ExamplePage;
