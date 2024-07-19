import React, { useEffect } from "react";
import "./sellerNav.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refresh } from "../../redux/slice/loadingSlice.js";
import { useDispatch, useSelector } from "react-redux";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const SellerNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.status);
  const availSeller = useSelector((state) => state.seller.value);
  const sellerLogOut = async () => {
    try {
      const res = await axios.get(
        `${config.Api}seller/auth/logout`,

        {
          withCredentials: true,
        }
      );
      toast("⛔seller logout.");
      console.log(res.data.data);

      dispatch(refresh());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!availSeller && !loading) {
      navigate("/");
    }
  }, [availSeller]);
  return (
    <div className="navContainer">
      <h2>
        <i>
          Shopify<span style={{ color: "gold" }}>Seller</span>
        </i>
      </h2>
      <button onClick={sellerLogOut}>
        <LogoutSharpIcon />
      </button>
    </div>
  );
};

export default SellerNav;
