import { IconButton, InputBase, Paper, Typography } from '@mui/material';
import { Modal } from '@shared/ui/modal';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ModalPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'components.modal' });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalText, setModalText] = useState<string>('');

  const closeModalHandler = () => {
    setIsOpenModal(false);
  };

  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalText(e.target.value);
  };

  return (
    <>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <InputBase
          onChange={inputChangeHandler}
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("placeholder")}
        />
        <IconButton onClick={openModalHandler} type="button" sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Modal open={isOpenModal} onClose={closeModalHandler} title={<Typography>{t("header")}</Typography>}>
        <Typography>{modalText}</Typography>
      </Modal>
    </>
  );
};

export default ModalPage;
