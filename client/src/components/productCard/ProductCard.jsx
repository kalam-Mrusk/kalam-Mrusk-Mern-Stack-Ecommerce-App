import React from "react";
import "./productCard.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const ProductCard = ({ pid, imageUrl, price, discountedPrice, title }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  let disPercentage = parseInt(((price - discountedPrice) / price) * 100);
  if (title?.length > 21) {
    title = title.substring(0, 21) + "...";
  }

  const addToCart = async (productId) => {
    if (!user) {
      navigate("/auth/login");
    }
    try {
      const res = await axios.post(
        `${config.Api}cart/add-to-cart/${user?.user._id}/${productId}`,
        { withCredentials: true }
      );
      if (res.data?.data) {
        toast("✅Item Added Successfully...");
      }
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        toast("⚠️Item Already Added...");
      }
      console.log(error);
    }
  };
  return (
    <div className="cardContainer">
      <NavLink to={`/product-detail/${pid}`}>
        <img src={imageUrl} alt="" />
      </NavLink>
      <div className="productCardDetailSection">
        <h4 className="productTitle">{title}</h4>

        <p className="priceTag">
          Price : Rs{" "}
          <span style={{ textDecoration: "line-through", color: "red" }}>
            {price}
          </span>{" "}
          <span style={{ color: " rgb(29, 227, 29)" }}> {discountedPrice}</span>
        </p>
        <p className="discounted">
          Dicount :
          <span style={{ color: " rgb(29, 227, 29)" }}> {disPercentage}%</span>
        </p>
        <button className="addToCart" onClick={() => addToCart(pid)}>
          Add To Cart
        </button>
        <br />
        <button
          className="buyNow"
          onClick={() => navigate(`/product-buying/${pid}`)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
