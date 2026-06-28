import React, { memo, useState, useCallback } from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { Item } from '../src/todo/components/item';

const todoMock = {
  id: 1,
  title: 'Teste',
  completed: false
};

describe('Item', () => {
  it('renderiza item corretamente', () => {
    render(<Item todo={todoMock} dispatch={() => {}} />);

    expect(screen.getByTestId('todo-item')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-label')).toHaveTextContent('Teste');
  });

  it('dispara toggle ao clicar checkbox', () => {
    const dispatch = jest.fn();

    render(<Item todo={todoMock} dispatch={dispatch} />);

    fireEvent.click(screen.getByTestId('todo-item-toggle'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_ITEM',
      payload: { id: 1 }
    });
  });

  it('dispara remove ao clicar no botão delete', () => {
    const dispatch = jest.fn();

    render(<Item todo={todoMock} dispatch={dispatch} />);

    fireEvent.click(screen.getByTestId('todo-item-button'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      payload: { id: 1 }
    });
  });

  it('entra em modo edição ao dar double click', () => {
    render(<Item todo={todoMock} dispatch={() => {}} />);

    fireEvent.doubleClick(screen.getByTestId('todo-item-label'));

    expect(screen.getByDisplayValue('Teste')).toBeInTheDocument();
  });

  it('atualiza item ao editar e pressionar Enter', () => {
    const dispatch = jest.fn();

    render(<Item todo={todoMock} dispatch={dispatch} />);

    fireEvent.doubleClick(screen.getByTestId('todo-item-label'));

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'Novo título' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_ITEM',
      payload: { id: 1, title: 'Novo título' }
    });
  });

  it('remove item quando editar para vazio', () => {
    const dispatch = jest.fn();

    render(<Item todo={todoMock} dispatch={dispatch} />);

    fireEvent.doubleClick(screen.getByTestId('todo-item-label'));

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      payload: { id: 1 }
    });
  });
});