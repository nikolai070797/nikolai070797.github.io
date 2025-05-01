import { DarkMode } from '@mui/icons-material';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  Radio,
  RadioGroup,
  useColorScheme,
} from '@mui/material';
import { useState } from 'react';

const ToggleTheme = () => {
  const { mode, setMode } = useColorScheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!mode) {
    return null;
  }

  const renderMenu = (
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
      <FormControl sx={{ p: 1 }}>
        <FormLabel>Тема</FormLabel>
        <RadioGroup
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) => setMode(event.target.value as 'system' | 'light' | 'dark')}
        >
          <FormControlLabel value="system" control={<Radio />} label="Система" />
          <FormControlLabel value="light" control={<Radio />} label="Светлая" />
          <FormControlLabel value="dark" control={<Radio />} label="Тёмная" />
        </RadioGroup>
      </FormControl>
    </Menu>
  );

  return (
    <>
      <IconButton
        size="large"
        onClick={handleClick}
        color="inherit"
      >
        <DarkMode />
      </IconButton>

      {renderMenu}
    </>
  );
};

export default ToggleTheme;
