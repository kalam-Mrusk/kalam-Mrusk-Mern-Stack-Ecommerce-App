import React, { useEffect, useState } from "react";
import "./sellerOrderCard.css";
// import laptopImg from "../../../assets/laptopImg.png";
import axios from "axios";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const SellerOrderCard = ({
  pid,
  deliveryAddress,
  paymentType,
  sellingPrice,
  orderedDate,
  deliveryCharge,
  quantity,
  orderId,
  sellerOrder,
}) => {
  const [data, setData] = useState({});
  const address = deliveryAddress?.split("@");
  const singleProduct = async () => {
    try {
      if (!pid) {
        return;
      }
      let res = await axios.get(`${config.Api}product/single-product/${pid}`);
      setData(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (orderid, status) => {
    try {
      const res = await axios.put(
        `${config.Api}product/order/cancel/${orderid}`,
        { status: status }
      );
      if (res) {
        toast(`✅${status}`);
        sellerOrder();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    singleProduct();
  }, []);
  return (
    <div className="sellerOrderCardContainer ">
      <div className="sellerOrderCardDetail">
        <img src={data?.imageUrl} alt="image" />
        <div className="sellerOrderCardInfo">
          <h3 className="sellerOrderCardTitle">{data?.title}</h3>

          <p className="sellerOrderCardPriceTag">
            Price : Rs{" "}
            <span style={{ textDecoration: "line-through", color: "red" }}>
              {data?.price}
            </span>{" "}
            <span style={{ color: " rgb(29, 227, 29)" }}>
              {data?.discountedPrice}
            </span>
          </p>

          <p>Qty : {quantity}</p>
          <p>Delivery:{deliveryCharge === "" ? "free" : deliveryCharge}</p>
          <p className="sellerOrderCardPayableAmount">
            Amount : Rs,
            <span style={{ color: " rgb(29, 227, 29)" }}>{sellingPrice}</span>
          </p>
          <p style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {paymentType}
          </p>
        </div>
        <div className="sellerOrderShippingInfoContainer">
          <p className="orderdate">{orderedDate}</p>
          <p className="orderId">Order id : {orderId.slice(7)}</p>
          <div className="sellerOrderShippingAddress">
            <h3 className="sellerOrderAddTitle">Shipping Address</h3>
            <p className="sellerOrderRecieverName">{address[0]}</p>
            <p className="sellerOrderRecieverPhoneNo">{address[1]}</p>
            <p className="sellerOrderAddress">{address[2]}</p>
            <p className="distOrState">{address[3]} </p>
            <p className="orderPincode">{address[4]}</p>
          </div>
        </div>
      </div>

      <div className="sellerOrderCartButton">
        <button
          className="cancelOrder"
          onClick={() => updateOrderStatus(orderId, "Order Cancelled")}
        >
          cancel order
        </button>
        <button
          className="shipped"
          onClick={() => updateOrderStatus(orderId, "Order Shipped")}
        >
          Order Shipped
        </button>
      </div>
    </div>
  );
};

export default SellerOrderCard;
