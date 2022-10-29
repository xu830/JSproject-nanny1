import { useState } from "react";
import "./style/CreateProduct.css";

const CreateProductContent = ({ handleCreateProduct, handleProductShow }) => {
  const [nameInput, setName] = useState("");
  const [descriptionInput, setDesInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setquantityInput] = useState("");
  const [imgLinkInput, setimgLinkInput] = useState("");
  return (
    <div id="CreatePage">
      <form id="createProductForm">
        <label className="createProductLabels" id="nameLabel">
          Product name
        </label>
        <input id="nameInput" type="text" value={nameInput} />
        <label className="createProductLabels" id="descriptionLable">
          Product Description
        </label>
        <input id="descriptionInput" type="text" value={descriptionInput} />
        <b id="categoryLabel" className="createProductLabels">
          Category
        </b>
        <select id="categoryInput">
          <option>category1</option>
          <option>category2</option>
          <option>category3</option>
        </select>
        <label id="priceLabel" className="createProductLabels">
          Price
        </label>
        <input id="priceInput" type="number" value={priceInput} />
        <label id="quatityLabel" className="createProductLabels">
          In Stock Quantity
        </label>
        <input id="quatityInput" type="number" value={quantityInput} />
        <label id="linkLable" className="createProductLabels">
          Add Image Link
        </label>
        <input id="linkInput" type="text" value={imgLinkInput} />
      </form>
      <button
        id="addProdBtninCreate"
        onClick={() => {
          handleCreateProduct(false);
          handleProductShow(true);
        }}
      >
        Add Product
      </button>
    </div>
  );
};
export default CreateProductContent;
