import { useState } from "react";
import serverAPI from "../api/api";
import { AuthReponse } from "../types";

type FetchAction = FetchActionLogin;

type FetchActionLogin = {
  type: "LOGIN";
  payload: CredentialsType;
};

type CredentialsType = {
  email: string;
  password: string;
};

// can be updated and improved in the future to accept other fetch types
const useFetch = () => {
  const [data, setData] = useState<AuthReponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = async ({ type, payload }: FetchAction) => {
    setLoading(true);
    try {
      let result: AuthReponse | null;
      switch (type) {
        case "LOGIN":
          result = await serverAPI.login(payload.email, payload.password);
          break;
        default:
          result = null;
      }
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
