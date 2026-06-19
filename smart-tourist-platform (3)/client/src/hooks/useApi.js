import { useEffect, useState } from 'react';

export const useApi = (apiFunction, options) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (options?.skip) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const result = await apiFunction();
        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err : new Error('Unknown error'),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiFunction, options?.skip]);

  return state;
};

export const useMutation = (mutationFunction) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = async (params) => {
    try {
      setState({ data: null, loading: true, error: null });
      const result = await mutationFunction(params);
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setState({ data: null, loading: false, error });
      throw error;
    }
  };

  return [mutate, state];
};
