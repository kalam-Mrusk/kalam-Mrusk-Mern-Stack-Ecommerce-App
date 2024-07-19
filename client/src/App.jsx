import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataFailure,
  fetchDataSuccess,
} from "./redux/slice/productSlice.js";
import { userLoginFailure, userLoginSuccess } from "./redux/slice/userSlice.js";

import { loadingEnd, loadingStart } from "./redux/slice/loadingSlice.js";
import {
  fetchAddressFailure,
  fetchAddressSuccess,
} from "./redux/slice/shippingAddressSlice.js";
import { TailSpin } from "react-loader-spinner";
import config from "../config/config.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = useSelector((state) => state.loading.refresh);
  const allProducts = useSelector((state) => state.product.value);
  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${config.Api}product/all-product`);
      dispatch(fetchDataSuccess(res.data?.data));
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(fetchDataFailure());
      dispatch(loadingEnd());
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${config.Api}user/current-user`, {
        withCredentials: true,
      });
      dispatch(userLoginSuccess(res.data?.data));
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(userLoginFailure());
      dispatch(loadingEnd());
    }
  };

  const getShippingAddress = async () => {
    try {
      const res = await axios.get(`${config.Api}shipping-address/get-address`, {
        withCredentials: true,
      });
      dispatch(fetchAddressSuccess(res.data?.data));
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(fetchAddressFailure());
      dispatch(loadingEnd());
    }
  };
  useEffect(() => {
    getAllProducts();
    getCurrentUser();
    getShippingAddress();
  }, [refresh]);
  return (
    <>
      {allProducts.length === 0 ? (
        <div
          style={{
            position: "absolute",
            top: "250px",
            left: "47%",
          }}
        >
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      ) : (
        <>
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </>
      )}
    </>
  );
}

export default App;
