import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./redux/store/store.js";
import SellerLogin from "./pages/sellerAuth/SellerLogin.jsx";
import SellerSignin from "./pages/sellerAuth/SellerSignin.jsx";
import Sellerdashboard from "./pages/sellerDashboard/Sellerdashboard.jsx";
import SellerProductPage from "./pages/sellerProductPage/SellerProductPage.jsx";
import SellerAddProductPage from "./pages/sellerAddProduct/SellerAddProductPage.jsx";
import SellerUpdatePage from "./pages/sellerUpdateProduct/SellerUpdatePage.jsx";
import SellerOrderPage from "./pages/sellerOrderPage/SellerOrderPage.jsx";
import SellerProductReturnPage from "./pages/sellerProductReturnPage/SellerProductReturnPage.jsx";
import SellerNoPage from "./pages/sellerNoPage/SellerNoPage.jsx";
import { Provider } from "react-redux";
import SellerProfilePage from "./pages/sellerProfilePage/SellerProfilePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <SellerLogin />,
      },
      {
        path: "seller/auth/login",
        element: <SellerLogin />,
      },
      {
        path: "seller/auth/signin",
        element: <SellerSignin />,
      },
      {
        path: "seller/dashboard",
        element: <Sellerdashboard />,
      },
      {
        path: "seller/product",
        element: <SellerProductPage />,
      },
      {
        path: "seller/add-product",
        element: <SellerAddProductPage />,
      },
      {
        path: "seller/update-product/:pid",
        element: <SellerUpdatePage />,
      },
      {
        path: "seller/orders",
        element: <SellerOrderPage />,
      },
      {
        path: "seller/return",
        element: <SellerProductReturnPage />,
      },
      {
        path: "seller/profile",
        element: <SellerProfilePage />,
      },
      {
        path: "*",
        element: <SellerNoPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
