import { useEffect, useState } from 'react';

import getSnackbarConfig, {
  Types as SnackbarTypes,
  Config as SnackbarConfig,
} from '../config/snackbar';

import useFetch from '../../../../hooks/useFetch';
import { User } from '../../../../types';

const INITIAL_SNACKBAR_STATE: SnackbarConfig = {
  type: 'SUCCESS',
  duration: 0,
  message: '',
};

const useNotificationsPage = () => {
  const [snackbar, setSnackbar] = useState<SnackbarConfig>(INITIAL_SNACKBAR_STATE);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { fetchData, isLoading, error, response } = useFetch();

  const setSnackbarConfig = (type: keyof SnackbarTypes) => {
    const snackbarConfig = getSnackbarConfig(type);

    setSnackbar(snackbarConfig);

    setIsSnackbarOpen(true);
  };

  useEffect(() => {
    setSnackbarConfig('LOADING_USERS');

    fetchData({
      url: 'http://192.168.25.4:4000/expo-notifications/api/v1/users',
      method: 'GET',
    });
  }, [fetchData]);

  const sendNotifications = (title: string, message: string, tokens: string[]) => {
    console.log(title, message, tokens);
    /* fetchData({
      url: 'http://192.168.25.4:4000/expo-notifications/api/v1/users',
      method: 'POST',
      body: {
        message,
        tokens,
        title,
      },
    }); */
  };

  useEffect(() => {
    if (response && response.users) {
      setUsers(response.users);
      setIsSnackbarOpen(false);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      setSnackbarConfig('SEND_NOTIFICATIONS_ERROR');
    }
  }, [error]);

  return {
    snackbarConfig: snackbar,
    sendNotifications,
    setSnackbarConfig,
    setIsSnackbarOpen,
    isSnackbarOpen,
    isLoading,
    users,
  };
};

export default useNotificationsPage;
