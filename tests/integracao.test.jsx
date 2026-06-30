import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { App } from "../src/todo/app";

describe("Teste de Integração", () => {

  test("deve adicionar uma tarefa e exibi-la na tela", async () => {

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("What needs to be done?");

    await userEvent.type(input, "Comprar pão{enter}");

    expect(screen.getByText("Comprar pão")).toBeInTheDocument();

  });

});