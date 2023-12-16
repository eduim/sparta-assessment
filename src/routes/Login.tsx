import { useState } from "react";
import Layout from "../layout/Layout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import serverAPI from "../api/api";
import useFetch from "../customHooks/useFetch";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const { requestState, startRequest, endRequest, setError } = useFetch();
  const goTo = useNavigate();

  function handleCredentialsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startRequest();
    try {
      const res = await serverAPI.login(
        credentials.email,
        credentials.password
      );
      auth.saveUser(res.token);
      goTo("/dashboard");
    } catch (err) {
      setError();
    } finally {
      endRequest();
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
        {requestState.loading && <p>Loading...</p>}
      </form>
    </Layout>
  );
}
