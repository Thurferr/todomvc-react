import React, { useCallback, useMemo } from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../src/todo/components/footer';
import { REMOVE_COMPLETED_ITEMS } from '../src/todo/constants';

const renderWithRoute = (ui, route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );

describe('Footer', () => {
  it('não renderiza quando não há todos', () => {
    renderWithRoute(<Footer todos={[]} dispatch={() => {}} />);

    expect(screen.getByTestId('footer')).toHaveAttribute('hidden');
  });

  it('mostra quantidade correta de itens ativos', () => {
    const todos = [
      { id: 1, completed: false },
      { id: 2, completed: true }
    ];

    renderWithRoute(<Footer todos={todos} dispatch={() => {}} />);

    expect(screen.getByText('1 item left!')).toBeInTheDocument();
  });

  it('pluraliza corretamente quando há mais de 1 item', () => {
    const todos = [
      { id: 1, completed: false },
      { id: 2, completed: false }
    ];

    renderWithRoute(<Footer todos={todos} dispatch={() => {}} />);

    expect(screen.getByText('2 items left!')).toBeInTheDocument();
  });

  it('destaca filtro All quando rota é "/"', () => {
    const todos = [{ id: 1, completed: false }];

    renderWithRoute(<Footer todos={todos} dispatch={() => {}} />, '/');

    expect(screen.getByText('All').className).toContain('selected');
  });

  it('destaca filtro Active na rota /active', () => {
    const todos = [{ id: 1, completed: false }];

    renderWithRoute(<Footer todos={todos} dispatch={() => {}} />, '/active');

    expect(screen.getByText('Active').className).toContain('selected');
  });

  it('destaca filtro Completed na rota /completed', () => {
    const todos = [{ id: 1, completed: false }];

    renderWithRoute(<Footer todos={todos} dispatch={() => {}} />, '/completed');

    expect(screen.getByText('Completed').className).toContain('selected');
  });

  it('mostra botão clear apenas quando há itens concluídos', () => {
    const todos = [
      { id: 1, completed: true }
    ];

    renderWithRoute(<Footer todos={todos} dispatch={() => {}} />);

    expect(screen.getByText('Clear completed')).toBeVisible();
  });

  it('esconde botão clear quando não há concluídos', () => {
    const todos = [
      { id: 1, completed: false }
    ];

    renderWithRoute(<Footer todos={todos} dispatch={() => {}} />);

    const button = screen.getByText('Clear completed');
    expect(button).toHaveAttribute('hidden');
  });

  it('dispara dispatch ao clicar em clear completed', () => {
    const dispatch = jest.fn();

    const todos = [
      { id: 1, completed: true }
    ];

    renderWithRoute(<Footer todos={todos} dispatch={dispatch} />);

    fireEvent.click(screen.getByText('Clear completed'));

    expect(dispatch).toHaveBeenCalledWith({
      type: REMOVE_COMPLETED_ITEMS
    });
  });
});