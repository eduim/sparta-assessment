import { useState } from "react";
import Layout from "../layout/Layout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

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

  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <form>
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
