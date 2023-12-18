import { buildToken } from "../../../src/utils/utils";
import { BASE_URL } from "../../../src/utils/constants";

describe("Healthcheck", () => {
  it("Healthcheck", () => {
    cy.visit(BASE_URL);
    cy.contains("Login");
  });
});

describe("Protected routes", () => {
  it("Cant access to protected route: Dashboard", () => {
    cy.visit(`${BASE_URL}dashboard`);
    cy.contains("Login");
  });
});

describe("Login", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("Recive feedback error on email input", () => {
    cy.contains("Login");
    cy.get('input[name="email"]').type("email");
    cy.get('input[name="password"]').type("password");
    cy.get("button").click();
    cy.contains("must be email");
  });

  it("Recive feedback error on password input", () => {
    cy.contains("Login");
    cy.get('input[name="email"]').type("email@email.com");
    cy.get('input[name="password"]').type("pass");
    cy.get("button").click();

    cy.contains("must be at least 6 characters");
  });

  it("Login correctly", () => {
    const email = "email@email.com";
    const password = "password";
    cy.contains("Login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get("button").click();
    cy.url().should("include", "dashboard");
    cy.contains("To Do List");
    cy.wait(2000).then(() =>
      expect(localStorage.getItem("token")).to.eq(buildToken(email, password))
    );
  });
});

describe("Logout", () => {
  it("Logout", () => {
    cy.login("email@email.com", "password");
    cy.contains("button", "Logout").click();
    cy.contains("Login");
    expect(localStorage.getItem("token")).to.be.null;
  });
});
