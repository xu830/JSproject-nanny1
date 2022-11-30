import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { getProducts } from "../actions/index";
import ProductCell from "./ProductCell";
import "./style/ProductsContent.css";
const ProductsContent = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [plistMap, setPlistMap] = useState([]);

  const dataLength = 20;
  let productdata = useRef([]);
  let nextStart = useRef(true);

  const GetPlist = () => {
    var pList = productdata.current.map(
      (
        {
          id,
          productName,
          price,
          imgSrc,
          productDescription,
          category,
          inStock,
        },
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
            isAdmin={props.isAdmin}
            handleCreateProduct={props.handleCreateProduct}
            setEditProduct={props.setEditProduct}
          />
        );
      }
    );
    setPlistMap(pList);
    console.log("Plist", pList);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const GetProductsList = async () => {
      try {
        const Products = await getProducts(dispatch)(0, dataLength);
        productdata.current = Products;
        console.log(productdata.current);
        nextStart.current = productdata.current.length;
        console.log("next start", nextStart.current);
        GetPlist();
      } catch (error) {}
    };
    GetProductsList();
  }, []);
  //console.log("productList", productsList);
  const fetchMoreData = () => {
    console.log("fetch more");

    // //making api call
    const GetProductsList = async () => {
      try {
        const Products = await getProducts(dispatch)(
          nextStart.current,
          dataLength
        );
        console.log("get product length", Products.length);
        if (Products.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        productdata.current = [...productdata.current, ...Products];
        console.log(productdata.current);
        nextStart.current = productdata.current.length;
        console.log("next start in fetch", nextStart.current);
        GetPlist();
      } catch (error) {}
    };
    GetProductsList();
  };

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
      {/* <div className="ProductList">{pList}</div> */}
      <div>
        <InfiniteScroll
          dataLength={productdata.current.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading</p>}
          endMessage={<p>There's no more product</p>}
        >
          {/* {productsList.map(({ index, productName }) => {
            return (
              <div>
                this is a div#{index + 1} #{productName} inside InfiniteScroll
              </div>
            );
          })} */}
          {plistMap}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default ProductsContent;
