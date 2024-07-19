import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sellerAuth.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../redux/slice/loadingSlice.js";
import config from "../../../config/config.js";
import { toast } from "react-toastify";

const SellerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const availSeller = useSelector((state) => state.seller.value);
  const loading = useSelector((state) => state.loading.status);
  const [sellerLoginIdOrGmail, setSellerLoginIdOrGmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = (msg) => toast(msg);

  const sellerLogIn = async (e) => {
    e.preventDefault();
    if (sellerLoginIdOrGmail.trim() === "")
      return toast("⚠️please enter gmail or seller id");
    if (password.trim() === "") return toast("⚠️please enter password");
    try {
      const res = await axios.post(
        `${config.Api}seller/auth/login`,
        { sellerLoginIdOrGmail, password },
        { withCredentials: true }
      );

      toast("✅seller login successfully");

      dispatch(refresh());
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 409)
        return toast("❌username or password incorrect");
    }
  };
  useEffect(() => {
    if (availSeller && !loading) {
      navigate("/seller/dashboard");
    }
  }, [availSeller]);
  return (
    <>
      <div className="loginPage">
        <form className="loginForm">
          <h2> Seller Login</h2>
          <input
            type="text"
            placeholder="seller id / gmail"
            value={sellerLoginIdOrGmail}
            onChange={(e) => setSellerLoginIdOrGmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => sellerLogIn(e)}>login</button>
        </form>
        <div className="dontHaveAccount">
          <p>Do not have a account</p>
          <NavLink to="/seller/auth/signin">
            <button>signIn</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SellerLogin;
