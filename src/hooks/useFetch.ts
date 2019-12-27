import { useCallback, useState, useEffect } from 'react';

interface Options {
  method: string;
  body?: object;
  url: string;
}

interface State {
  loading: boolean;
  response: any;
  error: any;
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const emptyFetchOptions = {
  method: '',
  url: '',
  headers,
};

const INITIAL_STATE: State = {
  loading: false,
  response: null,
  error: null,
};

const useFetch = (
  fireWhenMounted: boolean = false,
  defaultOptions: Options = emptyFetchOptions,
) => {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [state, setState] = useState<State>(INITIAL_STATE);

  const getFetchOptions = useCallback(() => {
    const fetchOptions = {
      body: JSON.stringify(options?.body),
      method: options.method,
      headers,
    };

    return fetchOptions;
  }, [options]);

  const startFetch = useCallback(async (): Promise<void> => {
    try {
      const fetchOptions = getFetchOptions();

      const rawResponse = await fetch(options.url, fetchOptions);
      const fetchResponse = await rawResponse.json();

      const stateUpdated = rawResponse.ok
        ? { response: fetchResponse }
        : { error: fetchResponse.message || fetchResponse };

      setState((preivousState: State) => ({
        ...preivousState,
        ...stateUpdated,
        loading: false,
      }));
    } catch (err) {
      setState((preivousState: State) => ({
        ...preivousState,
        error: err.message,
        loading: false,
      }));
    }
  }, [getFetchOptions, options.url]);

  const fetchData = useCallback(async () => {
    if (!options.url || !options.method) {
      throw new Error('You must specify an URL and a HTTP method.');
    }

    setState(() => ({
      ...INITIAL_STATE,
      loading: true,
    }));

    await startFetch();
  }, [startFetch, options]);

  useEffect(() => {
    if (fireWhenMounted) {
      fetchData();
    }
  }, [fireWhenMounted, fetchData]);

  useEffect(() => {
    if (!fireWhenMounted && options.url && options.method) {
      fetchData();
    }
  }, [fireWhenMounted, fetchData, options]);

  return {
    isLoading: state.loading,
    response: state.response,
    fetchData: setOptions,
    error: state.error,
  };
};

export default useFetch;
