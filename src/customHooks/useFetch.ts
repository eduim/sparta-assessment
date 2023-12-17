import { useState } from "react";
import { ZodIssue } from "zod";
import { FetchState } from "../types";

// can be updated and improved in the future to accept other fetch types
const useFetch = () => {
  const [requestState, setRequestState] = useState<FetchState>({
    loading: false,
    error: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startRequest = () => {
    setErrorMessage(null);
    setRequestState({
      ...requestState,
      loading: true,
    });
  };

  const endRequest = () => {
    setRequestState({
      ...requestState,
      loading: false,
    });
  };

  const setError = (issues?: ZodIssue[]) => {
    setRequestState((prevState) => {
      return {
        ...prevState,
        error: true,
      };
    });

    if (issues) {
      const errorMessages = issues.flatMap(
        (error: ZodIssue) => `${error.message}`
      );
      const message = errorMessages.join(", ").toString();
      setErrorMessage(message);
    }
  };

  return { requestState, errorMessage, startRequest, endRequest, setError };
};

export default useFetch;
