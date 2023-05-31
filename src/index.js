import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotesProvider } from "./context/NotesContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <NotesProvider>
    <App />
  </NotesProvider>
);
