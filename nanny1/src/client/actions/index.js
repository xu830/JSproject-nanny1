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

export const signUp = (dispatch) => async (email, password) => {
  try {
    const response = await fetch(
      "/signUp",
      ajaxConfigHelper({ email, password })
    );
    const result = await response.json();
    dispatch({
      type: SIGN_UP,
      payload: {
        email,
        password,
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
    // console.log("action", res);
    dispatch({
      type: "GET",
      payload: result,
    });
    return response;
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

export const getProducts = (dispatch) => async () => {
  try {
    const response = await fetch("/getProducts");
    const result = await response.json();
    dispatch({
      type: "GETPRODUCTS",
      payload: result,
    });
    console.log("in action", result);
    return result;
  } catch (error) {
    console.log(error, "getProducts");
  }
};
