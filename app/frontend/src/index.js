import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./modules";
import ReduxThunk from "redux-thunk";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
