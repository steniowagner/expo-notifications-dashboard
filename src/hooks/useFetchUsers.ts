import { useCallback, useEffect, useState } from 'react';

import SERVER_BASE_URL from '../api';
import useFetch from './useFetch';
import { User } from '../types';

const fetchOptions = {
  url: `${SERVER_BASE_URL}/users`,
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
