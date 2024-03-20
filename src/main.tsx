import "./index.css";
import "./mocks/browser.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./Store/store.ts";
import { enableMockServiceWorker } from "./mocks/browser.ts";

enableMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
      ,
    </React.StrictMode>
  );
});
