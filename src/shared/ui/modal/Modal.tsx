import { FC} from 'react';
// import s from './Modal.module.scss';
import { Dialog, DialogContent } from '@mui/material';
import { createPortal } from 'react-dom';
// import ModalMask from './modal-mask/ModalMask';
import ModalHeader from './modal-header/ModalHeader';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  container?: HTMLElement;
};

export const Modal: FC<ModalProps> = ({ container = document.body, open, onClose, children, title}) => {
  return createPortal(
    <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={onClose}>
      <ModalHeader onClose={onClose}>{title}</ModalHeader>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>,

    container
  );
  // return createPortal(<ModalMask children={children} visible={open} onClose={onClose} {...props}/>, container);
};
