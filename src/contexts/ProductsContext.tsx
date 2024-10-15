import React, { createContext, useState, useEffect } from 'react';
import { fetchProductsData } from '../services/api';

interface ProductsContextProps {
  products: any[];
  loading: boolean;
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  totalProducts: number;
  setTotalProducts: (page: number) => void;
  fetchProducts: (filter?: string) => void;
  setProducts: (products: any[]) => void;
}

export const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);

  const fetchProducts = (filter?: string) => {
    setLoading(true);
    
    fetchProductsData(filter)
      .then((response) => {
        setProducts(response.data.products);
        setTotalProducts(response.data.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(); // Fetch products initially
  }, [limit, page]);

  return (
    <ProductsContext.Provider value={{ products, loading, limit, setLimit, page, setPage, totalProducts, setTotalProducts, fetchProducts, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
