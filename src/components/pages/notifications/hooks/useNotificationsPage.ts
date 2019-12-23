import { useEffect, useState } from 'react';

import getSnackbarConfig, {
  Types as SnackbarTypes,
  Config as SnackbarConfig,
} from '../config/snackbar';

const INITIAL_SNACKBAR_STATE: SnackbarConfig = {
  type: 'SUCCESS',
  duration: 0,
  message: '',
};

const useNotificationsPage = () => {
  const [snackbar, setSnackbar] = useState<SnackbarConfig>(INITIAL_SNACKBAR_STATE);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const setupSnackbar = (type: keyof SnackbarTypes) => {
    const snackbarConfig = getSnackbarConfig(type);

    setSnackbar(snackbarConfig);

    setIsSnackbarOpen(true);
  };

  useEffect(() => {
    setupSnackbar('LOADING_USERS_ERROR');
  }, []);

  return {
    snackbarConfig: snackbar,
    setIsSnackbarOpen,
    isSnackbarOpen,
  };
};

export default useNotificationsPage;
