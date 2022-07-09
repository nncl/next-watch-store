import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/products`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(() => setError(true));
  }, []);

  return { products, error };
};
