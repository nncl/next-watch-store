import { fireEvent, render, screen } from '@testing-library/react';
import CartItem from './cart-item';

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

    const [_, button] = screen.getAllByRole('button');

    fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when first button is pressed', () => {
    renderCartItem();

    const [buttonDecrease, buttonIncrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe('2');

    fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('1');
  });

  it('should not go below zero in the quantity', () => {
    renderCartItem();

    const [buttonDecrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(buttonDecrease);
    fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe('0');
  });
});
