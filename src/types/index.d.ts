export type AuthReponse = {
  token: string;
};
export type APIResponse = AuthReponse;
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

export type CredentialsForm = {
  email: string;
  password: string;
};

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export type ListItemProps = {
  item: TodoType;
  handleSubmitEditTask: (editTodoInput: string, index: number) => void;
  handleChangeCheckTask: (index: number) => void;
  handleClickDeleteTask: (index: number) => void;
};
