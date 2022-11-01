import React, { useState } from "react";
import "./style/CreateProduct.css";

const CreateProductContent = ({ handleCreateProduct, handleProductShow }) => {
  const [nameInput, setName] = useState("");
  const [descriptionInput, setDesInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setquantityInput] = useState("");
  const [imgLinkInput, setimgLinkInput] = useState("");
  const [categoryInput, setCategory] = useState("");

  return (
    <div id="CreatePage">
      <form id="createProductForm">
        <label className="createProductLabels" id="nameLabel">
          Product name
        </label>
        <input
          id="nameInput"
          type="text"
          value={nameInput}
          onChange={(event) => setName(event.target.value)}
        />
        <label className="createProductLabels" id="descriptionLable">
          Product Description
        </label>
        <input
          id="descriptionInput"
          type="text"
          value={descriptionInput}
          onChange={(event) => setDesInput(event.target.value)}
        />
        <b id="categoryLabel" className="createProductLabels">
          Category
        </b>
        <select
          id="categoryInput"
          value={categoryInput}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option value="c1">category1</option>
          <option value="c2">category2</option>
          <option value="c3">category3</option>
        </select>
        <label id="priceLabel" className="createProductLabels">
          Price
        </label>
        <input
          id="priceInput"
          type="number"
          value={priceInput}
          onChange={(event) => setPriceInput(event.target.value)}
        />
        <label id="quatityLabel" className="createProductLabels">
          In Stock Quantity
        </label>
        <input
          id="quatityInput"
          type="number"
          value={quantityInput}
          onChange={(event) => setquantityInput(event.target.value)}
        />
        <label id="linkLable" className="createProductLabels">
          Add Image Link
        </label>
        <input
          id="linkInput"
          type="text"
          value={imgLinkInput}
          onChange={(event) => setimgLinkInput(event.target.value)}
        />
      </form>
      <button
        id="backBtninCreate"
        onClick={() => {
          handleCreateProduct(false);
          handleProductShow(true);
        }}
      >
        Back
      </button>
      <button
        id="addProdBtninCreate"
        onClick={() => {
          handleCreateProduct(false);
          handleProductShow(true);
        }}
      >
        add product
      </button>
    </div>
  );
};
export default CreateProductContent;
