import ProductCell from "./ProductCell";
import "./style/ProductsContent.css";
const ProductsContent = ({ handleCreateProduct, handleProductShow }) => {
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
      <div className="ProductList">
        <ProductCell />
      </div>
    </div>
  );
};
export default ProductsContent;
