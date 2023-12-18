import { BASE_URL } from "../../src/utils/constants";
import { buildToken } from "../../src/utils/utils";

describe("To do list", () => {
  beforeEach(() => {
    localStorage.setItem("token", buildToken("email@email.com", "password"));
    cy.visit(BASE_URL);
  });

  it("Healthcheck", () => {
    cy.contains("To Do List");
  });
  it("Can add new todo items", () => {
    const task = "new task";
    cy.get('input[name="new-task"]').type(task);
    cy.contains("button", "Add").click();
    cy.contains(task);
  });

  it("Can add new todo in correct order", () => {
    const task = "new task";
    const task2 = "new task 2";
    cy.get('input[name="new-task"]').type(task);
    cy.contains("button", "Add").click();
    cy.get('input[name="new-task"]').type(task2);
    cy.contains("button", "Add").click();
    cy.get("ul[data-test-id=todo-list] li:last")
      .find("span")
      .should("exist")
      .then(($li) => {
        const text = $li.text();
        expect(text).to.eq(task2);
      });
  });

  describe("Alter To do tasks", () => {
    const task = "new task";

    beforeEach(() => {
      cy.get('input[name="new-task"]').type(task);
      cy.contains("button", "Add").click();
    });

    it("Can delete todo items", () => {
      cy.get("ul[data-test-id=todo-list] li:first")
        .contains("button", "Delete")
        .should("exist")
        .click();
      cy.get("ul[data-test-id=todo-list] li:first").should("not.exist");
    });

    it("Can check todo items", () => {
      cy.get("ul[data-test-id=todo-list] li:first")
        .get('input[type="checkbox"]')
        .click()
        .should("be.checked");
    });

    it("Can check todo items", () => {
      const editedTask = "task modified";
      cy.get("ul[data-test-id=todo-list] li:first")
        .contains("button", "Edit")
        .click()
        .get('input[name="editTask"]')
        .type(editedTask);

      cy.get("ul[data-test-id=todo-list] li:first")
        .contains("button", "Edit")
        .click();
      cy.contains(editedTask);
    });
  });
});
