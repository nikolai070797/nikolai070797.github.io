import { useEffect, useState } from 'react';
import Tip from '@features/Tip';
import { TipPlace } from '@features/Tip/ui/Tip';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AuthForm, ProductForm } from '@features/forms';
import { Category } from '@shared/types';
import { fetchCategories } from '@shared/api/categories';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ExamplePage = () => {
  const { t } = useTranslation('translation');
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadInitialCategories = async () => {
      setLoading(true);
      try {
        const initialCategories = await fetchCategories();
        setCategories(initialCategories);
      } finally {
        setLoading(false);
      }
    };
    loadInitialCategories();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Tip" {...a11yProps(0)} />
        <Tab label="Product form" {...a11yProps(1)} />
        <Tab label="Login form" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', gap: '1rem' }}>
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
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductForm categories={categories} loading={loading} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AuthForm />
      </TabPanel>
    </Box>
  );
};

export default ExamplePage;
