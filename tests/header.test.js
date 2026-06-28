import React, { useCallback } from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../src/todo/components/header';
import { ADD_ITEM } from '../src/todo/constants';

describe('Header', () => {
  it('renderiza header corretamente', () => {
    render(<Header dispatch={() => {}} />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('todos')).toBeInTheDocument();
  });

  it('renderiza Input dentro do header', () => {
    render(<Header dispatch={() => {}} />);

    expect(screen.getByTestId('text-input')).toBeInTheDocument();
  });

  it('dispara dispatch ao submeter novo todo', () => {
    const dispatch = jest.fn();

    render(<Header dispatch={dispatch} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'novo todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(dispatch).toHaveBeenCalledWith({
      type: ADD_ITEM,
      payload: { title: 'novo todo' }
    });
  });

  it('não dispara dispatch com valor vazio', () => {
    const dispatch = jest.fn();

    render(<Header dispatch={dispatch} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('passa props corretas para Input', () => {
    render(<Header dispatch={() => {}} />);

    const input = screen.getByTestId('text-input');

    expect(input).toHaveAttribute('placeholder', 'What needs to be done?');
    expect(input).toHaveAttribute('aria-label', 'New Todo Input');
  });
});