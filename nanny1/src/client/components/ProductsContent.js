import ProductCell from "./ProductCell";
import "./style/ProductsContent.css";
const ProductsContent = ({
  productsList,
  handleCreateProduct,
  handleProductShow,
}) => {
  console.log("inPC", productsList);
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
