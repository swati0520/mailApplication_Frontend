import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { mystore } from "./Store/mystore.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={mystore}>
    <App />
  </Provider>
);
