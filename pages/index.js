import ProductCard from '../components/product-card';
import Search from '../components/search';
import { useFetchProducts } from '../hooks/use-fetch-products';

export default function Home() {
  const { products, error } = useFetchProducts();

  const renderProductsOrEmptyMessage = () => {
    if (!products.length && !error) {
      return <h4 data-testid="no-products">No products left</h4>;
    }

    return products.map((product) => (
      <ProductCard data-testid="product-card" product={product} key={product.id} />
    ));
  };

  const renderErrorMessage = () => {
    if (!error) {
      return null;
    }

    return <h4 data-testid="server-error">Error from the server</h4>;
  };

  return (
    <main data-testid="product-list" className="my-8">
      <Search />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">200+ Products</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {renderErrorMessage()}
          {renderProductsOrEmptyMessage()}
        </div>
      </div>
    </main>
  );
}
