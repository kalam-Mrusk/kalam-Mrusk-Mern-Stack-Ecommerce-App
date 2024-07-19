import React, { useEffect, useState } from "react";
import "./productCart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import singleProduct from "../../utility/singleProduct.js";

const ProductCart = ({ pid, cartItemId, removeFromCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState({});

  const getSingleProductData = async () => {
    const singledata = await singleProduct(pid);
    setData(singledata);
    setAmount(Number(singledata.discountedPrice));
  };
  const productIncrement = () => {
    if (productQuantity === 3) return;
    setProductQuantity(productQuantity + 1);
  };
  const productDecrement = () => {
    if (productQuantity === 1) return;
    setProductQuantity(productQuantity - 1);
  };

  let totalAmount = productQuantity * amount;

  let disPercentage = parseInt(
    ((data.price - data.discountedPrice) / data.price) * 100
  );
  useEffect(() => {
    getSingleProductData();
  }, []);
  return (
    <div className="productCartContainer">
      <div className="productCartDetail">
        <img
          src={data.imageUrl}
          alt=""
          onClick={() => navigate(`/product-detail/${pid}`)}
        />
        <div className="productcartInfo">
          <h3 className="cartTitle">{data.title}</h3>

          <p className="cartPriceTag">
            Price : Rs{" "}
            <span style={{ textDecoration: "line-through", color: "red" }}>
              {data.price}
            </span>{" "}
            <span style={{ color: " rgb(29, 227, 29)" }}>
              {data?.discountedPrice}
            </span>
          </p>
          <p className="cartDiscounted">
            Dicount :
            <span style={{ color: " rgb(29, 227, 29)" }}>{disPercentage}%</span>
          </p>
          <p className="cartPayableAmount">
            Amount : Rs,
            <span style={{ color: " rgb(29, 227, 29)" }}>{totalAmount}</span>
          </p>
          <div className="productIncDecButton">
            <button onClick={productDecrement}>-</button>
            <span>{productQuantity}</span>
            <button onClick={productIncrement}>+</button>
          </div>
        </div>
      </div>

      <div className="productCartButton">
        <button
          className="removeFromCart"
          onClick={() => removeFromCart(cartItemId)}
        >
          Remove
        </button>
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

export default ProductCart;
