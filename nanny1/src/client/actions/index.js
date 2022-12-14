import { ajaxConfigHelper } from "../helper/index";
//localhost：3000
//BE:3002
//cors

const SIGN_UP = "ADD";
const GET_USER_LIST = "USE";

export const allUsers = (dispatch) => async () => {
  try {
    const response = await fetch("/userlist");
    const result = await response.json();
    dispatch({
      type: GET_USER_LIST,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (dispatch) => async (email, password, id) => {
  try {
    const response = await fetch(
      "/signUp",
      ajaxConfigHelper({ email, password, id })
    );
    const result = await response.json();
    dispatch({
      type: SIGN_UP,
      payload: {
        email,
        password,
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (dispatch) => async () => {
  try {
    const response = await fetch("/getUser");
    const result = await response.json();
    if (response.ok) {
      dispatch({
        type: "GET",
        payload: result,
      });
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.log(error, "get user");
  }
};

export const signOut = (dispatch) => async () => {
  try {
    const response = await fetch("/signOut", ajaxConfigHelper());
    const result = await response.json();
    dispatch({
      type: "SIGNOUT",
      payload: result,
    });
  } catch (error) {
    console.log(error, "signout");
  }
};

export const getProducts = (dispatch) => async (page, num) => {
  try {
    console.log("page", page, "num", num);
    const response = await fetch(
      "/getProducts",
      ajaxConfigHelper({ page, num })
    );

    const result = await response.json();
    console.log("response", response, "result", result);
    dispatch({
      type: "GETPRODUCTS",
      payload: result,
    });
    console.log("result in action", result);
    return result;
  } catch (error) {
    console.log(error, "getProducts");
  }
};

export const addProduct =
  (dispatch) =>
  async (productName, productDescription, category, price, inStock, imgSrc) => {
    try {
      // console.log("in action", inStock);
      const response = await fetch(
        "/addProduct",
        ajaxConfigHelper({
          productName: productName,
          productDescription: productDescription,
          category: category,
          price: price,
          inStock: inStock,
          imgSrc: imgSrc,
        })
      );
      const result = response.json();
      dispatch({
        type: "ADDPRODUCT",
        payload: {
          productName: productName,
          productDescription: productDescription,
          category: category,
          price: price,
          inStock: inStock,
          imgSrc: imgSrc,
        },
      });
    } catch (error) {
      console.log(error, "addproduct");
    }
  };

export const getCart = (dispatch) => async () => {
  try {
    const response = await fetch("/getCart");
    const result = await response.json();
    if (response.ok) {
      dispatch({
        type: "GETCART",
        payload: result,
      });
      return result;
    } else {
      dispatch({
        type: "GETCART",
        payload: [],
      });
      return [];
    }
  } catch (error) {
    console.log(error, "get cart");
  }
};

export const addCart = (dispatch) => async (id, num) => {
  try {
    // console.log("in action", id, num);
    const response = await fetch("/addCart", ajaxConfigHelper({ id, num }));
    // console.log("in action respoinse", response);
    const result = await response.json();
    dispatch({
      type: "ADDTOCART",
      payload: {
        id,
        num,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProductInfo = (dispatch) => async (id) => {
  try {
    const response = await fetch("/getProductInfo", ajaxConfigHelper({ id }));
    const result = await response.json();
    dispatch({
      type: "GETPRODUCTINFO",
      payload: {
        result,
      },
    });
    return result;
  } catch (error) {
    console.log(error, "getproduct");
  }
};

export const deleteCart = (dispatch) => async (id) => {
  try {
    //console.log(id);
    const response = await fetch(
      "/deleteCart",
      ajaxConfigHelper(
        {
          id,
        },
        "DELETE"
      )
    );

    const result = await response.json();
    dispatch({
      type: "DEL_PRODUCT",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProduct =
  (dispatch) =>
  async (
    id,
    productName,
    productDescription,
    category,
    price,
    inStock,
    imgSrc
  ) => {
    try {
      const response = await fetch(
        "/editProduct",
        ajaxConfigHelper(
          {
            id: id,
            productName: productName,
            productDescription: productDescription,
            category: category,
            price: price,
            inStock: inStock,
            imgSrc: imgSrc,
          },
          "PUT"
        )
      );
      const result = response.json();
      dispatch({
        type: "EDITPRODUCT",
        payload: {
          result,
        },
      });
    } catch (error) {}
  };
