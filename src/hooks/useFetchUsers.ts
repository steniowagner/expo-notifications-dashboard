import { useCallback, useEffect, useState } from 'react';

import useFetch from './useFetch';
import { User } from '../types';

const fetchOptions = {
  url: 'http://192.168.25.4:4000/expo-notifications/api/v1/users',
  method: 'GET',
};

const useFetchUsers = (fireWhenMounted: boolean = false) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchParams = fireWhenMounted ? fetchOptions : undefined;

  const { isLoading, fetchData, response, error } = useFetch(fireWhenMounted, fetchParams);

  useEffect(() => {
    if (response && response.users) {
      setUsers(response.users);
    }
  }, [response]);

  return {
    fetchUsers: useCallback(() => fetchData(fetchOptions), [fetchData]),
    isLoading,
    error,
    users,
  };
};

export default useFetchUsers;
