import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Services/ReduxService/Store/Store.ts";
import { UserContextProvider } from "./Hooks/auth/useUser.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Provider>
);
