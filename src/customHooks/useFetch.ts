import { useState } from "react";
import serverAPI from "../api/api";
import { APIResponse } from "../types";

const mapEndpoints = {
  LOGIN: serverAPI.login,
};

type FetcherFunction<T> = (payload: T) => Promise<APIResponse>;

const useFetch = <T>(endpoint: keyof typeof mapEndpoints) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetcher = mapEndpoints[endpoint] as FetcherFunction<T>;
  const fetch = async (payload: T) => {
    setLoading(true);
    try {
      return await fetcher(payload);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetch };
};

export default useFetch;
