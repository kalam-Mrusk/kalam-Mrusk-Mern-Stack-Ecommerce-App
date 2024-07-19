import React, { useEffect } from "react";
import "./sellerAuth.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SellerSignin = () => {
  const navigate = useNavigate();
  const availSeller = useSelector((state) => state.seller.value);
  const loading = useSelector((state) => state.loading.status);
  const sellerRegistration = () => {};
  useEffect(() => {
    if (availSeller && !loading) {
      navigate("/seller/dashboard");
    }
  }, [availSeller]);
  return (
    <div className="signinPage">
      <form action="" className="signinForm">
        <h2>Seller Registeration</h2>
        <input
          type="text"
          placeholder="sellername"
          //   value={phoneNo}
          //   onChange={(e) => setPhoneNo(e.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => sellerRegistration(e)}>signin</button>
      </form>
    </div>
  );
};

export default SellerSignin;
