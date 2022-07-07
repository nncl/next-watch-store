import { render, screen } from '@testing-library/react';
import ProductList from '../pages/index';

const renderProduct = () => {
  render(<ProductList />);
};

describe('ProductList', () => {
  it('should render', () => {
    renderProduct();

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  // FIXME
  fit('should render the ProductCard component 10 times', () => {
    renderProduct();

    expect(screen.getAllByTestId('product-card')).toHaveLength(10);
  });

  it.todo('should render the no products message');
  it.todo('should render the Search component');
  it.todo('should filter the product list when a search is performed');
  it.todo('should display error message when promise rejects');
  it.todo('should display the total quantity of products');
  it.todo('should display product (singular) when there is only 1 product');
});
