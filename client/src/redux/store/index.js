import { createStore, applyMiddleware } from "redux";
import { composeWithDevtools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, composeEnhacer )