import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { ApolloProvider } from "@apollo/client";
import {client} from "./config/apolloClient";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
