import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginSignIn.css";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
function SignIn() {
  const navigate = useNavigate();
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const userRegistration = async (e) => {
    e.preventDefault();
    const inCompleteDetail = [phoneNo, email, password].some((element) => {
      return element === null || element.trim() === "";
    });
    if (inCompleteDetail) {
      return toast("⚠️incomplete details..");
    }
    try {
      const res = await axios.post(`${config.Api}user/auth/register`, {
        phone: phoneNo,
        gmail: email,
        password: password,
      });
      if (res) {
        toast("✅user register successfully.");
        setPhoneNo("");
        setEmail("");
        setPassword("");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signinPage">
      <form action="" className="signinForm">
        <h2>SignIn</h2>
        <input
          type="text"
          placeholder="phone no"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => userRegistration(e)}>signin</button>
      </form>
    </div>
  );
}

export default SignIn;
