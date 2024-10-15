import React from 'react';
import { UsersProvider } from './UsersContext';
import { ProductsProvider } from './ProductsContext';

const AppContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <UsersProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </UsersProvider>
  );
};

export default AppContextProvider;
