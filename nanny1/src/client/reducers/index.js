import { SIGN_UP, GET_USER_LIST } from "../actions/index";

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case "ADD":
      return [...state, { ...payload }];
    case "MOD":
      return state.map(({ email, password }, index) => {
        if (payload != index) {
          return {
            email,
            password,
          };
        }
        return { email, password };
      });
    case "GET":
      // console.log("in reducer", payload);
      return { payload };
    case "SIGNOUT":
      console.log("inreducer", state);
      return state;
    case "GETPRODUCTS":
      console.log("inreducer getproduct", payload);
      return [...payload];
    case "ADDPRODUCT":
      console.log("in reducer add prod", payload);
      return [...state, { ...payload }];
    default:
      return state;
  }
};
