import React, { useContext, useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Pagination,
  Container,
  Typography,
  Box,
  SelectChangeEvent
} from '@mui/material';import { ProductsContext } from '../contexts/ProductsContext';
import Filters from '../components/Filters'; 

const ProductsPage: React.FC = () => {
  const { products, loading, limit, setLimit, page, setPage, totalProducts, fetchProducts } = useContext(ProductsContext)!;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalProducts / limit));
  }, [limit, totalProducts]);

  useEffect(() => {
    const skip = (page - 1) * limit;
    if(filterValue){
      fetchProducts(`/search?q=${filterValue}&limit=${limit}&skip=${skip}`);
    }else{
      fetchProducts(`?limit=${limit}&skip=${skip}`);
    }
  }, [filterValue]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value));
    setPage(1); // Reset to page 1 when the limit changes
  };

  // Handle client-side search
  const handleSearch = (value: string) => {
    setFilterValue(value);
    // setFilteredProducts(
    //   products.filter((product) =>
    //     Object.values(product).some((val: any) =>
    //       val.toString().toLowerCase().includes(value.toLowerCase())
    //     )
    //   )
    // );
  };

  return (
    <Container>
      <Typography variant="h4" component="h4" gutterBottom>
        Home / Products
      </Typography>
      <Box sx={{ p: 2 }}>
        <Filters
          onSearch={handleSearch}
          limit={limit}
          handleLimitChange={handleLimitChange}
        />
      </Box>
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: { xs: '100%', sm: 650 } }}>
          <TableHead>
            <TableRow>
            <TableCell>IMAGE</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>BRAND</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>DISCOUNT%</TableCell>
              <TableCell>RATING</TableCell>
              <TableCell>STOCK</TableCell>
              <TableCell>MIN ORDER QTY</TableCell>
              <TableCell>WARRANTY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
                <TableRow className="loader" >
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
            ) : (
              <>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell><img src={product.thumbnail} className='product-image' /></TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.discountPercentage}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.minimumOrderQuantity}</TableCell>
                    <TableCell>{product.warrantyInformation}</TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
      </Box>
    </Container>
  );
};

export default ProductsPage;
