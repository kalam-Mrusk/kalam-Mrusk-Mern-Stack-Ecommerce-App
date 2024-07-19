import React, { useEffect, useState } from "react";
import "./loginSignIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../redux/slice/loadingSlice.js";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userExist = useSelector((state) => state.user.value);
  const [phoneNoOrGmail, setPhoneNoOrGmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogIn = async (e) => {
    e.preventDefault();
    if (phoneNoOrGmail === "") {
      return toast("⚠️please enter username...");
    }
    if (password === "") {
      return toast("⚠️please enter password...");
    }
    try {
      const res = await axios.post(
        `${config.Api}user/auth/login`,
        {
          gmailOrPhone: phoneNoOrGmail,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      toast("✅user login successfully.");
      dispatch(refresh());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("⚠️incorrect username or password...");
    }
  };

  useEffect(() => {
    if (userExist) {
      navigate(-1);
    }
  }, [userExist]);
  return (
    <>
      <button
        style={{
          marginLeft: "3rem",
          marginTop: "2rem",
          padding: "3px 6px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
        onClick={() => navigate("/")}
      >
        back
      </button>
      <div className="loginPage">
        <form className="loginForm">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="phone no / gmail"
            value={phoneNoOrGmail}
            onChange={(e) => setPhoneNoOrGmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => userLogIn(e)}>login</button>
        </form>
        <div className="dontHaveAccount">
          <p>Do not have a account</p>
          <NavLink to="/auth/sign-in">
            <button>signIn</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
