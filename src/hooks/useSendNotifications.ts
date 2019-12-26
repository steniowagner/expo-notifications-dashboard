import { useCallback } from 'react';

import SERVER_BASE_URL from '../api';
import useFetch from './useFetch';

const useSendNotifications = () => {
  const { isLoading, fetchData, response, error } = useFetch();

  const sendNotifications = useCallback(
    (title: string, body: string, tokens: string[]) => {
      const params = {
        url: `${SERVER_BASE_URL}/push-notifications`,
        method: 'POST',
        body: {
          tokens,
          title,
          body,
        },
      };

      fetchData(params);
    },
    [fetchData],
  );

  return {
    sendNotifications,
    isLoading,
    response,
    error,
  };
};

export default useSendNotifications;
