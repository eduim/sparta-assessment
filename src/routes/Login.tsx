import { useState } from "react";
import Layout from "../layout/Layout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import serverAPI from "../api/api";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const goTo = useNavigate();

  const [requestState, setRequestState] = useState({
    loading: false,
    error: false,
  });

  function handleCredentialsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRequestState({
      ...requestState,
      loading: true,
    });
    try {
      const res = await serverAPI.login(
        credentials.email,
        credentials.password
      );

      setRequestState({
        ...requestState,
        loading: false,
      });

      console.log("TOKEN", res.token);
      auth.saveUser(res.token);
      goTo("/dashboard");
    } catch (err) {
      setRequestState({
        loading: false,
        error: true,
      });
    } finally {
      setRequestState({
        loading: false,
        error: false,
      });
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <form onSubmit={handleCredentialsSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="email"
          onChange={handleCredentialsChange}
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleCredentialsChange}
        ></input>
        <button>Login</button>
      </form>
    </Layout>
  );
}
