import React from "react";
import ReactDOM from "react-dom";

// main app component
import App from "./App";

// render app comp into elem with id root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
