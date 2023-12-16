import { useState } from "react";
import Layout from "../layout/Layout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import serverAPI from "../api/api";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleCredentialsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(credentials);
    const res = await serverAPI.login(credentials.email, credentials.password);
    console.log(res);
  }

  const auth = useAuth();

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
          type="text"
          name="password"
          onChange={handleCredentialsChange}
        ></input>
        <button>Login</button>
      </form>
    </Layout>
  );
}
