import { useCallback, useEffect, useState } from 'react';

import getSnackbarConfig, {
  Types as SnackbarTypes,
  Config as SnackbarConfig,
} from '../config/snackbar';

import useSendNotifications from '../../../../hooks/useSendNotifications';
import useFetchUsers from '../../../../hooks/useFetchUsers';

const INITIAL_SNACKBAR_STATE: SnackbarConfig = {
  type: 'SUCCESS',
  duration: 0,
  message: '',
};

const useNotificationsPage = () => {
  const [snackbar, setSnackbar] = useState<SnackbarConfig>(INITIAL_SNACKBAR_STATE);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const { error: errorFetchingUsers, isLoading: loadingUsers, fetchUsers, users } = useFetchUsers(
    false,
  );

  const {
    response: sendingNotificationsResult,
    error: errorSendingNotifitations,
    isLoading: sendingNotifications,
    sendNotifications,
  } = useSendNotifications();

  const setSnackbarConfig = useCallback((type: keyof SnackbarTypes) => {
    const snackbarConfig = getSnackbarConfig(type);

    setSnackbar(snackbarConfig);

    setIsSnackbarOpen(true);
  }, []);

  useEffect(() => {
    setSnackbarConfig('LOADING_USERS');

    fetchUsers();
  }, [setSnackbarConfig, fetchUsers]);

  useEffect(() => {
    if (errorFetchingUsers) {
      setSnackbarConfig('LOADING_USERS_ERROR');
    }
  }, [setSnackbarConfig, errorFetchingUsers]);

  useEffect(() => {
    if (!loadingUsers && users) {
      setSnackbarConfig('LOADING_USERS_SUCCESS');
    }
  }, [setSnackbarConfig, users, loadingUsers]);

  useEffect(() => {
    setSnackbarConfig('SENDING_NOTIFICATIONS');

    fetchUsers();
  }, [setSnackbarConfig, sendingNotifications, fetchUsers]);

  useEffect(() => {
    if (!sendingNotifications && sendingNotificationsResult) {
      setIsSnackbarOpen(false);
    }
  }, [setSnackbarConfig, sendingNotificationsResult, sendingNotifications]);

  useEffect(() => {
    if (errorSendingNotifitations) {
      setSnackbarConfig('SEND_NOTIFICATIONS_ERROR');
    }
  }, [setSnackbarConfig, errorSendingNotifitations]);

  return {
    snackbarConfig: snackbar,
    closeSnackbar: () => setIsSnackbarOpen(false),
    setSnackbarConfig,
    isSnackbarOpen,
    sendNotifications,
    isLoading: loadingUsers,
    users: users || [],
  };
};

export default useNotificationsPage;
