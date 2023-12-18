import { useState } from "react";
import Layout from "../layout/Layout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import serverAPI from "../api/api";
import useFetch from "../customHooks/useFetch";
import { ZodError } from "zod";
import { loginCredentialsSchema } from "../utils/schemas/loginSchema";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const auth = useAuth();
  const { requestState, errorMessage, startRequest, endRequest, setError } =
    useFetch();
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
      const credentialsValidated = loginCredentialsSchema.parse(credentials);
      const res = await serverAPI.login(
        credentialsValidated.email,
        credentialsValidated.password
      );
      auth.saveUser(res.token);
      goTo("/dashboard");
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors);
      } else {
        setError();
      }
    } finally {
      endRequest();
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <form data-test-id="login-form" onSubmit={handleCredentialsSubmit}>
        <h1>Login</h1>
        <label>Email</label>
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
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </Layout>
  );
}
