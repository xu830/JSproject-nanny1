import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/index";
import ProductCell from "./ProductCell";
import "./style/ProductsContent.css";
const ProductsContent = (props) => {
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

  // useEffect(() => {}, [props.cartList]);

  const pList = productsList.map(
    (
      { id, productName, price, imgSrc, productDescription, category, inStock },
      index
    ) => {
      return (
        <ProductCell
          key={`${productName} - ${index}`}
          id={id}
          productName={productName}
          price={price}
          imgSrc={imgSrc}
          productDescription={productDescription}
          category={category}
          inStock={inStock}
          index={index}
          handleProductShow={props.handleProductShow}
          setProductShowDetail={props.setProductShowDetail}
          setProductDetail={props.setProductDetail}
          isLogin={props.isLogin}
          handleSetCart={props.handleSetCart}
          cartList={props.cartList}
        />
      );
    }
  );
  return (
    <div className="ProductPage">
      {props.isAdmin && (
        <button
          id="addProductBtn"
          onClick={() => {
            props.handleCreateProduct(true);
            props.handleProductShow(false);
          }}
        >
          Add Product
        </button>
      )}
      <div className="ProductList">{pList}</div>
    </div>
  );
};
export default ProductsContent;
