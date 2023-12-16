import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            {auth.isAuthenticated && (
              <li>
                <button onClick={auth.logout}>Logout</button>{" "}
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
