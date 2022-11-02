import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/index";
import ProductCell from "./ProductCell";
import "./style/ProductsContent.css";
const ProductsContent = ({ handleCreateProduct, handleProductShow }) => {
  const [productsList, setProductsList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const GetProductsList = async () => {
      try {
        const Products = await getProducts(dispatch)();
        setProductsList(Products);
      } catch (error) {}
    };
    GetProductsList();
  }, []);

  const pList = productsList.map(({ productName, price, imgSrc }, index) => {
    return (
      <ProductCell
        key={`${productName} - ${index}`}
        productName={productName}
        price={price}
        imgSrc={imgSrc}
        index={index}
      />
    );
  });
  return (
    <div className="ProductPage">
      <button
        id="addProductBtn"
        onClick={() => {
          handleCreateProduct(true);
          handleProductShow(false);
        }}
      >
        Add Product
      </button>
      <div className="ProductList">{pList}</div>
    </div>
  );
};
export default ProductsContent;
