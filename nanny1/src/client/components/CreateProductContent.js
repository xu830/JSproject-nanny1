import React, { useEffect, useState } from "react";
import "./style/CreateProduct.css";
import { addProduct, getProductInfo, editProduct } from "../actions/index";
import { useDispatch } from "react-redux";
import previewicon from "../img/previewicon.png";
const CreateProductContent = ({
  handleCreateProduct,
  handleProductShow,
  editProductState,
  setEditProduct,
}) => {
  const [nameInput, setName] = useState("");
  const [descriptionInput, setDesInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setquantityInput] = useState("");
  const [imgLinkInput, setimgLinkInput] = useState("");
  const [categoryInput, setCategory] = useState("category1");
  const [editState, setEdit] = useState(false);
  const [previewimg, setPrevewimg] = useState(previewicon);
  const dispatch = useDispatch();
  //when rederer, check if editproduct is undefined, if so, input will be empty
  // if not, retrive product info, update existing product
  useEffect(() => {
    if (editProductState) {
      //retrice product info
      const getProductInput = async () => {
        try {
          const productInfo = await getProductInfo(dispatch)(editProductState);
          setName(productInfo.productName);
          setDesInput(productInfo.productDescription);
          setPriceInput(productInfo.price);
          setquantityInput(productInfo.inStock);
          setimgLinkInput(productInfo.imgSrc);
          setCategory(productInfo.category);
        } catch (error) {}
      };
      getProductInput();
      setEdit(true);
    }
  }, []);

  const handleAdd = async (product) => {
    try {
      const response = await addProduct(dispatch)(
        product.productName,
        product.productDescription,
        product.category,
        product.price,
        product.inStock,
        product.imgSrc
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (product) => {
    try {
      const response = await editProduct(dispatch)(
        editProductState,
        product.productName,
        product.productDescription,
        product.category,
        product.price,
        product.inStock,
        product.imgSrc
      );
    } catch (error) {
      console.log(error);
    }
  };
  const addClick = () => {
    // const prodictId = `${nameInput} + ${Date.now()}`;
    // console.log(prodictId);
    const product = {
      productName: nameInput,
      productDescription: descriptionInput,
      category: categoryInput,
      price: priceInput,
      inStock: quantityInput,
      imgSrc: imgLinkInput,
    };
    if (product.productName === "") {
      console.log("no name");
    } else if (product.productDescription === "") {
      console.log("no productDescription");
    } else if (product.category === "") {
      console.log("no category");
    } else if (product.price === "") {
      console.log("no price");
    } else if (product.inStock === "") {
      console.log("no inStock");
    } else if (product.imgSrc === "") {
      console.log("no imgSrc");
    } else {
      handleCreateProduct(false);
      handleProductShow(true);
      if (!editState) {
        handleAdd(product);
      } else {
        handleEdit(product);
      }
    }
  };

  return (
    <div id="CreatePage">
      <form id="createProductForm">
        <label className="createProductLabels" id="nameLabel">
          Product name
        </label>
        <input
          id="nameInput"
          type="text"
          maxLength="80"
          value={nameInput}
          onChange={(event) => setName(event.target.value)}
        />
        <label className="createProductLabels" id="descriptionLable">
          Product Description
        </label>
        <textarea
          id="descriptionInput"
          rows="6"
          cols="50"
          value={descriptionInput}
          onChange={(event) => setDesInput(event.target.value)}
        />
        <div className="middlecreate">
          <div className="cateSection">
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
          </div>
          <div className="priceSection">
            <label id="priceLabel" className="createProductLabels">
              Price
            </label>
            <input
              id="priceInput"
              type="number"
              value={priceInput}
              onChange={(event) => setPriceInput(event.target.value)}
            />
          </div>
        </div>
        <div className="bottomcreate">
          <div className="quantitySection">
            <label id="quatityLabel" className="createProductLabels">
              In Stock Quantity
            </label>
            <input
              id="quatityInput"
              type="number"
              value={quantityInput}
              onChange={(event) => setquantityInput(event.target.value)}
            />
          </div>
          <div className="linkSection">
            <label id="linkLable" className="createProductLabels">
              Add Image Link
            </label>
            <input
              id="linkInput"
              type="text"
              value={imgLinkInput}
              onChange={(event) => setimgLinkInput(event.target.value)}
            />
          </div>
        </div>
      </form>

      <div className="previewSection">
        <div className="imgBg">
          <img className="previewImg" alt="imge preview" src={previewimg}></img>
        </div>
        <button
          className="previewBtn"
          onClick={() => {
            setPrevewimg(imgLinkInput);
          }}
        >
          preview
        </button>
      </div>
      <div className="createFooter">
        <button
          id="backBtninCreate"
          onClick={() => {
            handleCreateProduct(false);
            handleProductShow(true);
            setEditProduct("");
          }}
        >
          Back
        </button>
        {!editState && (
          <button id="addProdBtninCreate" onClick={addClick}>
            add product
          </button>
        )}
        {editState && (
          <button id="addProdBtninCreate" onClick={addClick}>
            save
          </button>
        )}
      </div>
    </div>
  );
};
export default CreateProductContent;
