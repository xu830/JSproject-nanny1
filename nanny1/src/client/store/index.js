import { createStore } from "redux";
import { reducer } from "../reducers/index";

export const store = createStore(reducer);
//wrap all the components in the app
