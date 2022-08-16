import { fireEvent, render, screen } from '@testing-library/react';
import CartItem from './cart-item';
import { renderHook } from '@testing-library/react-hooks';
import { useCartStore } from '../store/cart';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false);

const product = {
  title: 'Cool watch',
  price: '22.00',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
};

const addToCart = jest.fn();

const renderCartItem = () => {
  render(<CartItem product={product} addToCart={addToCart} />);
};

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper data', () => {
    renderCartItem();

    const image = screen.getByTestId('image');

    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(image).toHaveProperty('src');
    expect(image).toHaveProperty('alt', product.title);
  });

  it('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increase quantity by 1 when second button is pressed', () => {
    renderCartItem();

    const button = screen.getByTestId('increase');
    fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when first button is pressed', () => {
    renderCartItem();

    const buttonIncrease = screen.getByTestId('increase');
    const buttonDecrease = screen.getByTestId('decrease');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe('2');

    fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('1');
  });

  it('should not go below zero in the quantity', () => {
    renderCartItem();

    const buttonDecrease = screen.getByTestId('decrease');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(buttonDecrease);
    fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('0');
  });

  it('should call remove when pressing its button', () => {
    const result = renderHook(() => useCartStore()).result;
    const spy = jest.spyOn(result.current.actions, 'remove');
    renderCartItem();

    const button = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(product);
  });
});
