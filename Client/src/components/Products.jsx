import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try{
        const res = await axios.get(`http://localhost:5000/api/products/GetAllProducts?category=${cat===undefined?'':cat}`);
        setProducts(res.data)
      }catch(err) {}
    };
    getProducts();
  }, [cat]);
  
  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => 
        Object.entries(filters).every(([key, value]) => 
          item[key].includes(value)
          )
        )
    )
  }, [products, cat, filters])

  useEffect(() => {
    switch (sort) {
      case "newest":
        setFilteredProducts((prev) => 
          [...prev].sort((a, b) => a.createdAt - b.createdAt)
        );
        break;
      case "asc":
        setFilteredProducts((prev) => 
          [...prev].sort((a, b) => a.Price - b.Price)
        );
        break;

      default:
        setFilteredProducts((prev) => 
          [...prev].sort((a, b) => b.Price - a.Price)
        );
        break;
    }
  }, [sort])
  return (
    <Container>
      {cat !== undefined
        ? filteredProducts.map((item) => (<Product item={item} key={item.id} />))
        : products.slice(0, 8).map((item) => (<Product item={item} key={item.id} />))}
    </Container>
  );
};

export default Products;
