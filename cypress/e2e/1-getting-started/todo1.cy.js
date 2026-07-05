/// <reference types="cypress" />

describe("TodoMVC React", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve carregar a aplicação", () => {
    cy.contains("todos").should("be.visible");
    cy.get('[data-testid="header"]').should("be.visible");
  });

  it("deve adicionar uma tarefa", () => {
    cy.get('input[placeholder="What needs to be done?"]')
      .type("Estudar Cypress{enter}");

    cy.get('[data-testid="todo-item"]')
      .should("have.length", 1);

    cy.get('[data-testid="todo-item-label"]')
      .should("contain", "Estudar Cypress");
  });

  it("deve adicionar várias tarefas", () => {
    cy.get('input[placeholder="What needs to be done?"]')
      .type("Tarefa 1{enter}");

    cy.get('input[placeholder="What needs to be done?"]')
      .type("Tarefa 2{enter}");

    cy.get('[data-testid="todo-item"]')
      .should("have.length", 2);
  });

  it("deve marcar uma tarefa como concluída", () => {
    cy.get('input[placeholder="What needs to be done?"]')
      .type("Aprender Cypress{enter}");

    cy.get('[data-testid="todo-item-toggle"]')
      .check()
      .should("be.checked");

    cy.get('[data-testid="todo-item"]')
      .should("have.class", "completed");
  });

  it("deve marcar todas as tarefas", () => {
    cy.get('input[placeholder="What needs to be done?"]')
      .type("Tarefa A{enter}");

    cy.get('input[placeholder="What needs to be done?"]')
      .type("Tarefa B{enter}");

    cy.get('[data-testid="toggle-all"]')
      .check();

    cy.get('[data-testid="todo-item-toggle"]')
      .each(($checkbox) => {
        cy.wrap($checkbox).should("be.checked");
      });
  });

  it("deve remover uma tarefa", () => {
    cy.get('input[placeholder="What needs to be done?"]')
      .type("Excluir tarefa{enter}");

    cy.get('[data-testid="todo-item-button"]')
      .click({ force: true });

    cy.get('[data-testid="todo-item"]')
      .should("have.length", 0);
  });

  it("deve editar uma tarefa", () => {
    cy.get('input[placeholder="What needs to be done?"]')
      .type("Texto antigo{enter}");

    cy.get('[data-testid="todo-item-label"]')
      .dblclick();

    cy.get('input[value="Texto antigo"]')
      .clear()
      .type("Texto novo{enter}");

    cy.contains("Texto novo").should("exist");
  });
});