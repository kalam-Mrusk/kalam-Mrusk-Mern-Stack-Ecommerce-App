import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  sellerLoginFailure,
  sellerLoginSuccess,
} from "./redux/slice/sellerSlice.js";
import { loadingEnd, loadingStart } from "./redux/slice/loadingSlice.js";

import { TailSpin } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availSeller = useSelector((state) => state.seller.value);
  const refresh = useSelector((state) => state.loading.refresh);
  const getCurrentSeller = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/ecommerce/seller/current-seller",
        {
          withCredentials: true,
        }
      );
      dispatch(sellerLoginSuccess(res.data?.data));
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(sellerLoginFailure());
      dispatch(loadingEnd());
    }
  };

  useEffect(() => {
    getCurrentSeller();
  }, [refresh]);
  return (
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
  );
}

export default App;
