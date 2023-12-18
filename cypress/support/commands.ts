/// <reference types="cypress" />

// import { BASE_URL } from "@src/utils/constants";
import { BASE_URL } from "../../src/utils/constants";
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit(BASE_URL);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get("button").click();
});
