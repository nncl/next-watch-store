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
  let result;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  });

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

  it('should call remove when pressing its button', () => {
    const spy = jest.spyOn(result.current.actions, 'remove');
    renderCartItem();

    const button = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(product);
  });

  it('should call increase when increase button is clicked', () => {
    const spy = jest.spyOn(result.current.actions, 'increase');
    renderCartItem();

    const button = screen.getByTestId('increase');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(product);
  });

  it('should call decrease when decrease button is clicked', () => {
    const spy = jest.spyOn(result.current.actions, 'decrease');
    renderCartItem();

    const button = screen.getByTestId('decrease');
    fireEvent.click(button);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(product);
  });
});
