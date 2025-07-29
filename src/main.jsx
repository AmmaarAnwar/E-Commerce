import React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/config.js";
import "./App.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Layout from "./pages/Layout.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home-page.jsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // HomePage
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "/signin",
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "/home",
    element: <Home />, // HomePage
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
