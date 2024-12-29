import { createRoot } from "react-dom/client";
// import "./index.css";
import "../styles/tailwind.css";
import App from "./App.tsx";
import { store } from "./state/store";
import { Provider } from "react-redux";
import Header from "./components/ui/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Header />
    <App />
  </Provider>
);
