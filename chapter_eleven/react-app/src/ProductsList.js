import Product from "./Product";
import { useEffect, useState } from "react";
import ProductsData from "./data";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhcjFAZ21haWwuY29tIiwiaWF0IjoxNzA0MDI0Njc3fQ.Wn9RLzWuEcZT0mqyP4PhtrSPrb1v35wWnkxdPsJbl9o";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const getProducts = async () => {
    const res = await axios.get("/products");
    console.log(res.data);
    setProducts(res.data);
    setTotal(res.data.length);
  };

  const handleClick = async (id) => {
    const res = await axios.delete(`/products/${id}`);
    console.log(res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
    // setProducts(res.data);
  };
  const handlePage = async (page) => {
    const res = await axios.get("/products/sort?page=" + page);
    console.log(res.data);
    setProducts(res.data);
  };

  const handleSort = async (e) => {
    const field = e.target.value.split(".");
    const res = await axios.get(
      `/products/sort?sort=${field[0]}&order=${field[1]}`
    );
    console.log(res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <select onChange={handleSort}>
        <option value="price.desc">Price High to Low</option>
        <option value="price.asc">Price Low to High</option>
        <option value="rating.desc">Rating High to Low</option>
        <option value="rating.asc">Rating Low to High</option>
      </select>

      {Array(Math.ceil(total / 4))
        .fill(0)
        .map((e, i) => (
          <button onClick={() => handlePage(i + 1)}>{i + 1}</button>
        ))}
      {products.map((product, index) => (
        <Product {...product} key={index} handleClick={handleClick}></Product>
      ))}
    </>
  );
};

export default ProductList;
