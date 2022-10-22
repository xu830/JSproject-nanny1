import { ajaxConfigHelper } from "../helper/index";
//localhost：3000
//BE:3002
//cors

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

export const signUp = (dispatch) => async (email) => {
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
