import { useEffect, useState } from 'react';

import { useFetchProducts } from '../hooks/use-fetch-products';

import ProductCard from '../components/product-card';
import Search from '../components/search';

export default function Home() {
  const { products, error } = useFetchProducts();

  const [term, setTerm] = useState('');
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    if (!term) {
      setLocalProducts(products);
    } else {
      setLocalProducts(
        products.filter(({ name = '', title = '' }) => {
          const item = title || name;
          return item.toLowerCase().indexOf(term.toLowerCase()) > -1;
        }),
      );
    }
  }, [products, term]);

  const renderProductsOrEmptyMessage = () => {
    if (!localProducts.length && !error) {
      return <h4 data-testid="no-products">No products left</h4>;
    }

    return localProducts.map((product) => (
      <ProductCard data-testid="product-card" product={product} key={product.id} />
    ));
  };

  const renderErrorMessage = () => {
    if (!error) {
      return null;
    }

    return <h4 data-testid="server-error">Error from the server</h4>;
  };

  const renderProductQuantity = () => {
    return localProducts.length === 1 ? '1 Product' : `${localProducts.length} Products`;
  };

  return (
    <main data-testid="product-list" className="my-8">
      <Search doSearch={(e) => setTerm(e)} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">{renderProductQuantity()}</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {renderErrorMessage()}
          {renderProductsOrEmptyMessage()}
        </div>
      </div>
    </main>
  );
}
