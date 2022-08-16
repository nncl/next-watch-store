import { renderHook } from '@testing-library/react-hooks';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { setAutoFreeze } from 'immer';
import { makeServer } from '../miragejs/server';
import { useCartStore } from '../store/cart';

import Cart from './cart';

setAutoFreeze(false);

describe('Cart', () => {
  let server;
  let result;

  let add;
  let toggle;
  let reset;

  let spy;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;

    add = result.current.actions.add;
    toggle = result.current.actions.toggle;
    reset = result.current.actions.reset;

    spy = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should have class "hidden" in the component', () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should NOT have class "hidden" in the component', () => {
    render(<Cart />);

    const button = screen.getByTestId('close-button');
    fireEvent.click(button);

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call store toggle() twice', () => {
    render(<Cart />);

    const button = screen.getByTestId('close-button');

    act(() => {
      button.click();
      button.click();
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should display 2 product cards', () => {
    const products = server.createList('product', 2);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });

    render(<Cart />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });
});
