import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { CommonProps } from '@mui/material/OverridableComponent';

interface NavLinkProps extends CommonProps {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
}

const NavLink = ({ className, to, children, icon }: NavLinkProps) => (
  <Link className={className} component={RouterLink} to={to} underline="none" color="inherit">
    <MenuItem>
      {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
      {children}
    </MenuItem>
  </Link>
);

export default NavLink;
