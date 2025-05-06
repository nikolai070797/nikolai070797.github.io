import { Languages } from '@app/localization/config';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const ToggleLocalization = () => {
  const { i18n, t } = useTranslation('translation', { keyPrefix: 'components.localization' });
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const LanguagesArray = Object.keys(Languages) as Array<keyof typeof Languages>;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (LanguagesArray.length <= 1) {
    return null;
  }

  const renderMenu = (
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <FormControl sx={{ p: 1 }}>
        <FormLabel>{t('title')}</FormLabel>
        <RadioGroup
          name="theme-toggle"
          value={i18n.language}
          onChange={(event) => handleLanguageChange(event.target.value)}
        >
          {LanguagesArray.map((lang) => (
            <FormControlLabel key={lang} value={lang} control={<Radio />} label={lang.toUpperCase()} />
          ))}
        </RadioGroup>
      </FormControl>
    </Menu>
  );

  return (
    <>
      <IconButton size="large" onClick={handleClick} color="inherit" title={t('title')}>
        <Typography>{i18n.language.toUpperCase()}</Typography>
      </IconButton>

      {renderMenu}
    </>
  );
};

export default ToggleLocalization;
