import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { getProducts } from "../actions/index";
import ProductCell from "./ProductCell";
import "./style/ProductsContent.css";
const ProductsContent = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [plistMap, setPlistMap] = useState([]);
  const [plist, setpList] = useState([]);

  const dataLength = 9;
  let productdata = useRef([]);
  //let nextStart = useRef(0);

  const GetPlist = () => {
    console.log("in plist", productdata.current);
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
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const GetProductsList = async () => {
      try {
        const Products = await getProducts(dispatch)(0, 9);
        productdata.current = Products;

        //nextStart.current = productdata.current.length;

        GetPlist();
      } catch (error) {}
    };
    GetProductsList();
  }, []);

  useEffect(() => {
    GetPlist();
  }, [props.isAdmin, props.cartList, productdata.current]);

  //console.log("productList", productsList);
  const fetchMoreData = () => {
    setTimeout(() => {
      console.log(plistMap.length);
      const GetProductsList = async () => {
        try {
          const Products = await getProducts(dispatch)(
            plistMap.length,
            dataLength
          );

          if (Products.length === 0) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          console.log(
            "infetch products",
            Products,
            "product.current",
            productdata.current
          );
          console.log(
            "compare",
            Products.toString() === productdata.current.toString()
          );
          if (Products.toString() === productdata.current.toString()) {
          } else {
            productdata.current = [...productdata.current, ...Products];
            GetPlist();
          }
          // productdata.current = [...productdata.current, ...Products];
          // nextStart.current = productdata.current.length;
          // console.log("here 3");
          // console.log("in fetch", productdata.current);
        } catch (error) {}
      };
      GetProductsList();
    }, 10);
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
          dataLength={plistMap.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading</p>}
          endMessage={<p>There's no more product</p>}
        >
          {plistMap}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default ProductsContent;
