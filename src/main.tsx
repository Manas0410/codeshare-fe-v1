import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Services/ReduxService/Store/Store.ts";
import { UserContextProvider } from "./Hooks/auth/useUser.tsx";
import { Toaster } from "./Components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <UserContextProvider>
      <Toaster />
      <App />
    </UserContextProvider>
  </Provider>
);
