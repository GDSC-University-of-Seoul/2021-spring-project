import "./styles/main.scss";

import { applyMiddleware, createStore } from "redux";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import ReduxThunk from "redux-thunk";
import rootReducers from "./modules";

const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
