import s from './ModalContent.module.scss';
import cn from 'clsx';
import { Box, DialogContent } from '@mui/material';
import ModalHeader from '../modal-header/ModalHeader';

export type ModalContentProps = {
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

const ModalContent = ({ className, children, ...props }: ModalContentProps) => {
  return (
    <Box className={cn(s.content, className)}>
      <ModalHeader {...props} />
      <DialogContent dividers>{children}</DialogContent>
    </Box>
  );
};

export default ModalContent;
