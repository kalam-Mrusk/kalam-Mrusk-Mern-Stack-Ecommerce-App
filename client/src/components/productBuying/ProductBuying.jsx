import React, { useState } from "react";
import "./productBuying.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDetail } from "../../redux/slice/buyingProductDetailSlice.js";
const ProductBuying = ({
  pid,
  sellerId,
  imageUrl,
  title,
  discription,
  price,
  discountedPrice,
  deliveryCharge,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.shippingAddress.value);
  const [quantity, setQuantity] = useState(1);
  let disPercentage = parseInt(((price - discountedPrice) / price) * 100);

  // delivery date......
  const today = new Date();
  const date = new Date(today.setDate(today.getDate() + 4));
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // order Date........
  let current = new Date();
  let dd = current.getDate();
  let mm = current.getMonth() + 1;
  let yyyy = current.getFullYear();

  const buyingOrderDetails = {
    productId: pid,
    sellerId,
    deliveryAddress: `${shippingAddress?.fullname}@${shippingAddress?.phone}@${shippingAddress?.address}@${shippingAddress?.district},${shippingAddress?.state}@${shippingAddress?.pincode}`,
    quantity: quantity,
    orderedDate: `${dd}-${mm}-${yyyy}`,
    deliveryDate: `${day}-${month}-${year}`,
    sellingPrice: +discountedPrice + +deliveryCharge,
    deliveryCharge:
      deliveryCharge === "" || deliveryCharge === "0" ? "Free" : deliveryCharge,
  };
  return (
    <>
      <div className="productBuyingContainer">
        <div className="orderShippingAddress">
          <h3 className="DeliverAddTitle">Delivered to :</h3>
          <p className="orderDeliveredToname">{shippingAddress?.fullname}</p>
          <p className="orderDeliveredToPhoneNo">{shippingAddress?.phone}</p>
          <p className="orderDeliveredAddress">{shippingAddress?.address}</p>
          <p className="deliverDistOrCountry">
            {shippingAddress?.district} {shippingAddress?.state}
          </p>
          <p className="orderDeliverPincode">{shippingAddress?.pincode}</p>
          <div className="buttonCont">
            {shippingAddress ? (
              <button
                style={{ backgroundColor: "rgb(115, 141, 255)" }}
                onClick={() => navigate("/shipping-address")}
              >
                Change
              </button>
            ) : (
              <button
                style={{ backgroundColor: "rgb(115, 141, 255)" }}
                onClick={() => navigate("/shipping-address")}
              >
                Add Address
              </button>
            )}
          </div>
        </div>
        <div className="buyingProductDetailContainer">
          <img src={imageUrl} alt="" />
          <div className="buyingProductInfo">
            <h2 className="buyingProducttilte">{title}</h2>
            <p className="buyingProductDiscription">{discription}</p>
            <h4 className="buyingpriceTag">
              Price : Rs{" "}
              <span style={{ textDecoration: "line-through", color: "red" }}>
                {price}
              </span>{" "}
              <span style={{ color: " rgb(29, 227, 29)" }}>
                {" "}
                {discountedPrice}
              </span>
            </h4>
            <p>
              discount : <span style={{ color: "gold" }}>{disPercentage}%</span>
            </p>
            <div className="quantityContainer">
              <label htmlFor="productQuantity">Quantity : </label>
              <select
                name="quantity"
                id="productQuantity"
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="PricingContainer">
          <p className="listedPrice">Listed Price : Rs,{price}</p>
          <p className="sellingPrice">Selling Price: Rs,{discountedPrice}</p>
          <p className="deliveryCharge">
            Delivery Charge :
            {deliveryCharge === "" || deliveryCharge === "0"
              ? "Free Delivery"
              : deliveryCharge}
          </p>
          <h4 className="totalAmount">
            Total Amount : Rs,{+discountedPrice + +deliveryCharge}
          </h4>
        </div>
        <div className="continueBuying">
          <button
            style={{ backgroundColor: "rgb(85, 245, 136)" }}
            onClick={() => {
              dispatch(setDetail(buyingOrderDetails));
              shippingAddress && pid
                ? navigate("/order/payment")
                : window.alert("shipping address or product not available.");
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductBuying;
