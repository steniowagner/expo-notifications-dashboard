import { useCallback } from 'react';

import useFetch from './useFetch';

const useSendNotifications = () => {
  const { isLoading, fetchData, response, error } = useFetch();

  const sendNotifications = useCallback(
    (title: string, body: string, tokens: string[]) => {
      const params = {
        url: 'http://192.168.25.4:4000/expo-notifications/api/v1/push-notifications',
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
