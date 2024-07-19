import React, { useEffect, useState } from "react";
import "./Cart.css";
import ProductCart from "../../components/productCart/ProductCart.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar.jsx";
import { TailSpin } from "react-loader-spinner";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const loading = useSelector((state) => state.loading.status);
  const userExists = useSelector((state) => state.user.value);
  const allCartProducts = async () => {
    try {
      const res = await axios.get(`${config.Api}cart/get`, {
        withCredentials: true,
      });
      setData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = async (cartItemId) => {
    try {
      const res = await axios.delete(`${config.Api}cart/remove/${cartItemId}`, {
        withCredentials: true,
      });
      allCartProducts();
      toast("✅item removed");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userExists && !loading) {
      navigate("/auth/login");
    }
    allCartProducts();
  }, [userExists]);
  return (
    <>
      <NavBar />
      {loading ? (
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
        <div className="cartMainContainer">
          <div className="AllCartProducts">
            <h2 className="carttitle">Cart Items</h2>
            <div
              className="allItemContainer"
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                width: "100%",
              }}
            >
              {data?.map((item) => (
                <ProductCart
                  key={item.productId}
                  pid={item.productId}
                  removeFromCart={removeFromCart}
                  cartItemId={item._id}
                />
              ))}
            </div>
          </div>

          <div className="cartBuyingSection">
            <p>Price :{"................."} Rs, 67890</p>
            <p>Discounted :....... Rs, 45110</p>
            <p>Saved Amount :.. Rs, -22780</p>
            <p>delivery Charge : Rs, 40</p>
            <p>delivery Charge : Rs, -40</p>
            <p>Net Payable :...... Rs, 45110</p>
            <button>Buy Now</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
