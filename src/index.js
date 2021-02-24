import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import authReducer from "./store/reducers/auth";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
