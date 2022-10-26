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
    default:
      return state;
  }
};
