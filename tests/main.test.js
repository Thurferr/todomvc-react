import React, { useMemo, useCallback } from "react";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from '../src/todo/components/main';

const renderWithRoute = (ui, route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );

describe('Main', () => {
  it('não renderiza lista quando não há todos', () => {
    renderWithRoute(<Main todos={[]} dispatch={() => {}} />);

    const main = screen.getByTestId('main');
    expect(main).toHaveAttribute('hidden');
  });

  it('renderiza todos normalmente na rota "/"', () => {
    const todos = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: true }
    ];

    renderWithRoute(<Main todos={todos} dispatch={() => {}} />, '/');

    expect(screen.getByTestId('todo-list').children).toHaveLength(2);
  });

  it('filtra apenas ativos na rota /active', () => {
    const todos = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: true }
    ];

    renderWithRoute(<Main todos={todos} dispatch={() => {}} />, '/active');

    const list = screen.getByTestId('todo-list');
    expect(list.children).toHaveLength(1);
  });

  it('filtra apenas completos na rota /completed', () => {
    const todos = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: true }
    ];

    renderWithRoute(<Main todos={todos} dispatch={() => {}} />, '/completed');

    const list = screen.getByTestId('todo-list');
    expect(list.children).toHaveLength(1);
  });

  it('renderiza checkbox toggle-all', () => {
    const todos = [
      { id: 1, title: 'A', completed: false }
    ];

    renderWithRoute(<Main todos={todos} dispatch={() => {}} />);

    expect(screen.getByTestId('toggle-all')).toBeInTheDocument();
  });

  it('checkbox fica marcado quando todos estão completos', () => {
    const todos = [
      { id: 1, title: 'A', completed: true },
      { id: 2, title: 'B', completed: true }
    ];

    renderWithRoute(<Main todos={todos} dispatch={() => {}} />);

    expect(screen.getByTestId('toggle-all')).toBeChecked();
  });
});