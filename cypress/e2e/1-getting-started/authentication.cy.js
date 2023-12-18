import { buildToken } from "../../../src/utils/utils";

describe("Healthcheck", () => {
  it("Healthcheck", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Login");
  });
});

describe("Protected routes", () => {
  it("Cant access to protected route: Dashboard", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.contains("Login");
  });
});

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
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
