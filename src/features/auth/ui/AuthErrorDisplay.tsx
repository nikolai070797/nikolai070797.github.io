import React from 'react';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form'; // Тип для useForm
import { ServerErrors } from '@shared/types';


export type AuthErrorDisplayProps = {
  // Ошибки из useAuthStore
  authError: string | null;
  serverErrors: ServerErrors | null;
  // Локальная ошибка (например, из catch)
  localFormError: string | null;
}

export const AuthErrorDisplay: React.FC<AuthErrorDisplayProps> = ({
  authError,
  serverErrors,
  localFormError,
}) => {
  const { t } = useTranslation('translation');

  // Получить сообщение об ошибке сервера
  const getServerErrorMessage = () => {
    if (serverErrors && serverErrors?.errors?.length > 0) {
      const firstError = serverErrors.errors[0];
      const errorCode = firstError.extensions?.code;
      const defaultMessage = firstError.message || t('errors.server.ERR_VALIDATION_ERROR');

      if (errorCode) {
        return t(`errors.server.${errorCode}`, { defaultValue: defaultMessage });
      }
      return defaultMessage;
    }
    return null;
  };

  // Определяем сообщение для отображения
  const serverErrorMessage = getServerErrorMessage();
  // Определяем основное сообщение для AlertTitle
  const displayErrorTitle =
    serverErrorMessage ||
    (authError && t('errors.server.ERR_VALIDATION_ERROR')) ||
    localFormError;

  // Определяем дополнительное описание
  let displayErrorDescription = '';
  if (serverErrorMessage) {
  } else if (!serverErrorMessage && authError) {
    displayErrorDescription = authError;
  } else if (!serverErrorMessage && !authError && localFormError) {
    displayErrorDescription = localFormError;
  }

  if (!displayErrorTitle) {
    return null; // Нет ошибок для отображения
  }

  return (
    <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
      <AlertTitle>{String(displayErrorTitle || t('errors.server.ERR_VALIDATION_ERROR'))}</AlertTitle>
      {displayErrorDescription && <Typography variant="body2">{displayErrorDescription}</Typography>}
    </Alert>
  );
};