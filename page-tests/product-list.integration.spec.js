import { render, screen } from '@testing-library/react';
import ProductList from '../pages/index';

describe('ProductList', () => {
  it('should render', () => {
    render(<ProductList />);

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });
});
