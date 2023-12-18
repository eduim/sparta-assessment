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

export interface FetchState {
  loading: boolean;
  error: boolean;
}

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

/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<any>;
  }
}
