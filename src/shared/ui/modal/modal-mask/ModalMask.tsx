import s from './ModalMask.module.scss';
import { Box } from '@mui/material';
import cn from 'clsx';
import ModalContent, { ModalContentProps } from '../modal-content/ModalContent';

export type ModalMaskProps = ModalContentProps & {
  visible?: boolean;
  onClose: () => void;
};

const ModalMask = ({ visible, children, ...props }: ModalMaskProps) => {
  return (
    <Box className={cn(s.mask, visible && s.visible)}>
      <ModalContent className={s.content} {...props}>
        {children}
      </ModalContent>
    </Box>
  );
};

export default ModalMask;
