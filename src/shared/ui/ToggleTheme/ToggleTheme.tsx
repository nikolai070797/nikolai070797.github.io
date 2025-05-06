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
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTranslation } from 'react-i18next';


const ToggleTheme = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.theme' });
  const { mode, setMode, colorScheme } = useColorScheme();

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
        <FormLabel>{t("title")}</FormLabel>
        <RadioGroup
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) => setMode(event.target.value as 'system' | 'light' | 'dark')}
        >
          <FormControlLabel value="system" control={<Radio />} label={t("type.system")} />
          <FormControlLabel value="light" control={<Radio />} label={t("type.light")} />
          <FormControlLabel value="dark" control={<Radio />} label={t("type.dark")} />
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
        {colorScheme == "light" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      {renderMenu}
    </>
  );
};

export default ToggleTheme;
