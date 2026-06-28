import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../src/todo/components/input';

describe('Input', () => {

  it('chama onSubmit ao pressionar Enter', () => {
    const onSubmit = jest.fn();

    render(<Input onSubmit={onSubmit} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'novo item' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSubmit).toHaveBeenCalledWith('novo item');
  });

  it('não chama onSubmit com valor vazio quando NÃO é editing', () => {
    const onSubmit = jest.fn();

    render(<Input onSubmit={onSubmit} editing={false} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('chama onSubmit mesmo com vazio quando editing=true', () => {
    const onSubmit = jest.fn();

    render(<Input onSubmit={onSubmit} editing={true} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSubmit).toHaveBeenCalledWith('');
  });

  it('limpa o input após submit quando NÃO está editing', () => {
    const onSubmit = jest.fn();

    render(<Input onSubmit={onSubmit} editing={false} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.value).toBe('');
  });

  it('NÃO limpa o input quando editing=true', () => {
    const onSubmit = jest.fn();

    render(<Input onSubmit={onSubmit} editing={true} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.value).toBe('abc');
  });

  it('chama onBlur com valor trimado', () => {
    const onBlur = jest.fn();

    render(<Input onSubmit={() => {}} onBlur={onBlur} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: '  teste  ' } });
    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalledWith('teste');
  });

  it('não quebra se onBlur não existir', () => {
    render(<Input onSubmit={() => {}} />);

    const input = screen.getByTestId('text-input');

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(() => {
      fireEvent.blur(input);
    }).not.toThrow();
  });
});