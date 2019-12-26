import { useCallback, useEffect, useState } from 'react';

import getSnackbarConfig, {
  Types as SnackbarTypes,
  Config as SnackbarConfig,
} from '../components/pages/notifications/config/snackbar';

import useSendNotifications from './useSendNotifications';
import useFetchUsers from './useFetchUsers';

const INITIAL_SNACKBAR_STATE: SnackbarConfig = {
  type: 'SUCCESS',
  duration: 0,
  message: '',
};

const useNotificationsPage = () => {
  const [isNotificationsDialogResultsOpen, setIsNotificationsDialogResultsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarConfig>(INITIAL_SNACKBAR_STATE);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const { error: errorFetchingUsers, isLoading: loadingUsers, fetchUsers, users } = useFetchUsers(
    false,
  );

  const {
    error: errorSendingNotifitations,
    isLoading: sendingNotifications,
    response: notificationsResult,
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
    if (!sendingNotifications && notificationsResult) {
      setIsNotificationsDialogResultsOpen(true);
      setIsSnackbarOpen(false);
    }
  }, [setSnackbarConfig, notificationsResult, sendingNotifications]);

  useEffect(() => {
    if (errorSendingNotifitations) {
      setSnackbarConfig('SEND_NOTIFICATIONS_ERROR');
    }
  }, [setSnackbarConfig, errorSendingNotifitations]);

  return {
    onCloseNotificationsResult: () => setIsNotificationsDialogResultsOpen(false),
    closeSnackbar: () => setIsSnackbarOpen(false),
    isNotificationsDialogResultsOpen,
    snackbarConfig: snackbar,
    isLoading: loadingUsers,
    notificationsResult,
    users: users || [],
    setSnackbarConfig,
    sendNotifications,
    isSnackbarOpen,
  };
};

export default useNotificationsPage;
