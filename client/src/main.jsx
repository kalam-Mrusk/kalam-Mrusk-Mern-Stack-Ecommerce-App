import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/homePage/Home.jsx";
import Cart from "./pages/cartPage/Cart.jsx";
import AllProductPage from "./pages/allProductPage/AllProductPage.jsx";
import ProductDetail from "./pages/productDetailPage/ProductDetail.jsx";
import Login from "./pages/authPage/Login.jsx";
import SignIn from "./pages/authPage/SignIn.jsx";
import NoPage from "./pages/noPage/NoPage.jsx";
import CategoryPage from "./pages/categoryPage/CategoryPage.jsx";
import OrderPage from "./pages/orderPage/OrderPage.jsx";
import ShippingAddressPage from "./pages/shippingAddressPage/ShippingAddressPage.jsx";
import ProductBuyingPage from "./pages/productBuyingPage/ProductBuyingPage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import PaymentPage from "./pages/paymentPage/PaymentPage.jsx";
import SearchedProductpage from "./pages/searchedProductPage/SearchedProductpage.jsx";
import UserProfilePage from "./pages/userProfilePage/UserProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "all-products",
        element: <AllProductPage />,
      },
      {
        path: "product-detail/:pid",
        element: <ProductDetail />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "my-order",
        element: <OrderPage />,
      },
      {
        path: "order/payment",
        element: <PaymentPage />,
      },
      {
        path: "shipping-address",
        element: <ShippingAddressPage />,
      },
      {
        path: "category/:categories",
        element: <CategoryPage />,
      },
      {
        path: "searched-products/:query",
        element: <SearchedProductpage />,
      },
      {
        path: "product-buying/:pid",
        element: <ProductBuyingPage />,
      },
      {
        path: "user/profile",
        element: <UserProfilePage />,
      },

      {
        path: "*",
        element: <NoPage />,
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
