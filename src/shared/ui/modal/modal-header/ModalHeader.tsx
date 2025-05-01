import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import s from './ModalHeader.module.scss';
// import cn from 'clsx';
import { ReactNode } from 'react';

export type ModalHeaderProps = {
  onClose?: () => void;
  children?: ReactNode;
  showCloseButton?: boolean;
};

const ModalHeader = ({ onClose, children, showCloseButton = true }: ModalHeaderProps) => {
  return (
    <DialogTitle sx={{ position: 'relative' }}>
      {children}
      {/* <Box className={cn(s.header)}> */}
      {showCloseButton && (
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      )}
      {/* </Box> */}
    </DialogTitle>
  );
};

export default ModalHeader;
