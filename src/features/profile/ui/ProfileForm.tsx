import { ClientForm, ClientFormValues } from '@features/forms/ClientForm';
import { useProfileStore } from '../model/profileStore';
import { Modal } from '@shared/ui/modal';
import { Typography, AlertTitle, Alert, Snackbar, Slide } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

export const ProfileForm = () => {
  const { profile, updateProfile, error, serverErrors } = useProfileStore();
  const [isOpenModal, setOpen] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data: ClientFormValues) => {
    const success = await updateProfile(data);

    // Проверяем тип ошибки для отображения
    const isServerError =
      serverErrors && serverErrors.errors.some((err) => err.extensions?.code === 'ERR_INTERNAL_SERVER');

    if (isServerError) {
      // Отображаем 500 ошибку в модальном окне
      setOpen(true);
    } else if (success && !error && (!serverErrors || serverErrors.errors.length === 0)) {
      // Отображаем Snackbar при успешном сохранении
      enqueueSnackbar(t('pages.profile.updateProfile.success'), { variant: 'success' });
    }
    // Валидационные ошибки будут отображаться в форме автоматически через serverErrors
  };

  function handlerCloseModal(): void {
    setOpen(false);
  }

  // Функция для получения сообщения об ошибке 500
  const getServerErrorModalMessage = () => {
    if (serverErrors && serverErrors.errors.length > 0) {
      const serverError = serverErrors.errors.find((err) => err.extensions?.code === 'ERR_INTERNAL_SERVER');

      if (serverError) {
        return serverError.message || t('errors.server.ERR_INTERNAL_SERVER');
      }
    }

    return t('errors.server.ERR_INTERNAL_SERVER');
  };

  // Проверяем, есть ли ошибки валидации (не 500)
  const hasValidationErrors =
    serverErrors && serverErrors.errors.some((err) => err.extensions?.code !== 'ERR_INTERNAL_SERVER');

  // Получаем валидационную ошибку для отображения в форме
  const getValidationError = () => {
    if (hasValidationErrors && serverErrors) {
      const validationError = serverErrors.errors.find((err) => err.extensions?.code !== 'ERR_INTERNAL_SERVER');

      if (validationError) {
        const errorCode = validationError.extensions?.code;
        let title = '';
        let description = '';

        if (errorCode) {
          title = t(`errors.server.${errorCode}`, {
            fieldName: validationError.fieldName,
            defaultValue: t('errors.server.ERR_VALIDATION_ERROR'),
          });
          description = validationError.message || '';
        } else {
          title = t('errors.server.ERR_VALIDATION_ERROR');
          description = validationError.message || '';
        }

        return { title, description };
      }
    }

    // Для локальной ошибки
    if (error) {
      return {
        title: t('errors.server.ERR_VALIDATION_ERROR'),
        description: error,
      };
    }

    return null;
  };

  const validationError = getValidationError();

  return (
    <>
      {/* Отображаем ошибку валидации в верху формы с заголовком и описанием */}
      {validationError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>{validationError.title}</AlertTitle>
          {validationError.description && <Typography variant="body2">{validationError.description}</Typography>}
        </Alert>
      )}

      <ClientForm defaultValues={profile} onSubmit={handleSubmit} />

      {/* Модальное окно для ошибки 500 */}
      <Modal
        open={isOpenModal}
        onClose={handlerCloseModal}
        title={<Typography>{t('errors.server.ERR_INTERNAL_SERVER')}</Typography>}
      >
        <Typography>{getServerErrorModalMessage()}</Typography>
      </Modal>
    </>
  );
};
