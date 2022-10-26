import { useSelector } from "react-redux";
import ProductCell from "./ProductCell";
import "./style/ProductsContent.css";
const ProductsContent = () => {
  const products = useSelector((state) => state);
  console.log(products);
  const productsList = products.map(
    (
      { productName, productDescription, category, price, inStock, imgSrc },
      index
    ) => {
      return (
        <ProductCell
          key={`${productName}-${index}`}
          productDescription={productDescription}
          category={category}
          price={price}
          inStock={inStock}
          imgSrc={imgSrc}
          index={index}
        />
      );
    }
  );
  return <div className="ProductList">{productsList}</div>;
};
export default ProductsContent;
