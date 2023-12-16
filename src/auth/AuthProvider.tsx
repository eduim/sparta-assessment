import { useContext, createContext, useReducer, useEffect } from "react";
import type { AuthReponse, AuthState, AuthActions } from "../types";

const authReducer = (state: AuthState, action: AuthActions) => {
  if (action.type === "LOGIN") {
    const token = action.payload;
    localStorage.setItem("token", token);
    return {
      isAuthenticated: true,
      token: action.payload!,
    };
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("token");
    return {
      isAuthenticated: false,
      token: "",
    };
  }
  return state;
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthActions>;
}>({
  state: {
    isAuthenticated: false,
    token: "",
  },
  dispatch: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    token: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const getAccessToken = () => state.token;
  const saveUser = (token: AuthReponse["token"]) => {
    dispatch({ type: "LOGIN", payload: token });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return {
    getAccessToken,
    saveUser,
    logout,
  };
};
