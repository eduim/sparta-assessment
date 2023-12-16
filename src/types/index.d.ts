export type AuthReponse = {
  token: string;
};

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
}

export type AuthActions = AuthActionLogin | AuthActionLogout;

export interface AuthActionLogin {
  type: "LOGIN";
  payload: AuthReponse["token"];
}

export interface AuthActionLogout {
  type: "LOGOUT";
}
