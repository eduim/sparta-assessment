import { useState } from "react";

interface FetchState {
  loading: boolean;
  error: boolean;
}

// can be updated and improved in the future to accept other fetch types
const useFetch = () => {
  const [requestState, setRequestState] = useState<FetchState>({
    loading: false,
    error: false,
  });

  const startRequest = () => {
    setRequestState({
      loading: true,
      error: false,
    });
  };

  const endRequest = () => {
    setRequestState({
      loading: false,
      error: false,
    });
  };

  const setError = () => {
    setRequestState({
      loading: false,
      error: true,
    });
  };

  return { requestState, startRequest, endRequest, setError };
};

export default useFetch;
