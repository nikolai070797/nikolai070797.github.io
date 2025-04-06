'use client';
import PropTypes from 'prop-types';

// @next
// import NextLink from 'next/link';
import { Link } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

// @project
import { generateFocusVisibleStyles } from './CommonFocusStyle';
import LogoMain from './LogoMain';
import LogoIcon from './LogoIcon';

/***************************  MAIN - LOGO  ***************************/

export default function LogoSection({ isIcon, sx, to }) {
  const theme = useTheme();
  return (
    <Link href={!to ? import.meta.env.NEXT_PUBLIC_BASE_NAME || '/' : to} passHref legacyBehavior>
      <ButtonBase
        disableRipple
        sx={{ ...sx, display: 'block', '&:focus-visible': generateFocusVisibleStyles(theme.palette.primary.main) }}
        aria-label="logo"
      >
        {isIcon ? <LogoIcon /> : <LogoMain />}
      </ButtonBase>
    </Link>
  );
}

LogoSection.propTypes = { isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.string };
