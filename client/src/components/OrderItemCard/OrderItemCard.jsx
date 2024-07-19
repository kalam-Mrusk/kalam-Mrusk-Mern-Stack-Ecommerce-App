import React, { useEffect, useState } from "react";
import "./orderItemCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import singleProduct from "../../utility/singleProduct.js";
import { toast } from "react-toastify";
const OrderItemCard = ({
  pid,
  orderId,
  getItems,
  address,
  quantity,
  sellingPrice,
  deliveryCharge,
  paymentType,
  status,
  orderedDate,
  deliveryDate,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const deliveryAddress = address.split("@");

  const getSingleProductData = async () => {
    const singledata = await singleProduct(pid);
    setData(singledata);
  };

  const cancelOrder = async (orderid) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/ecommerce/product/order/cancel/${orderid}`,
        { status: "Order Cancelled" }
      );
      if (res) {
        toast("❌order cancelled");
        getItems();
      }
    } catch (error) {
      console.log(error);
    }
  };
  let disPercentage = parseInt(
    ((data.price - +sellingPrice) / data.price) * 100
  );
  useEffect(() => {
    // singleProduct();
    getSingleProductData();
  }, []);
  return (
    <div
      className={
        status === "Order Cancelled"
          ? "orderCardContainer orderCardContainerCancel"
          : "orderCardContainer "
      }
    >
      <div className="orderCardDetail">
        <img
          src={data.imageUrl}
          alt="image"
          onClick={() => navigate(`/product-detail/${pid}`)}
        />
        <div className="orderCardInfo">
          <h3 className="orderCardTitle">{data.title}</h3>

          <p className="orderCardPriceTag">
            Price : Rs{" "}
            <span
              style={
                status !== "Order Cancelled"
                  ? { textDecoration: "line-through", color: "red" }
                  : { textDecoration: "line-through" }
              }
            >
              {data.price}
            </span>{" "}
            <span
              style={
                status !== "Order Cancelled"
                  ? { color: " rgb(29, 227, 29)" }
                  : {}
              }
            >
              {" "}
              {sellingPrice}
            </span>
          </p>
          <p className="orderCardDiscounted">
            Dicount :
            <span
              style={
                status !== "Order Cancelled"
                  ? { color: " rgb(29, 227, 29)" }
                  : {}
              }
            >
              {" "}
              {disPercentage}%
            </span>
          </p>
          <p>Quantity : {quantity}</p>
          <p>
            Delivery: {deliveryCharge === "" ? "free" : `Rs, ${deliveryCharge}`}
          </p>
          <p className="orderCardPayableAmount">
            Amount : Rs,
            <span
              style={
                status !== "Order Cancelled"
                  ? { color: " rgb(29, 227, 29)" }
                  : {}
              }
            >
              {quantity * +sellingPrice + +deliveryCharge}
            </span>
          </p>
          <p style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {paymentType}
          </p>
          <p className="orderStatus">{status}</p>
        </div>
        <div className="orderShippingInfoContainer">
          <h5 className="orderdate">{orderedDate}</h5>
          <h4 className="orderId">
            Order id : {orderId.slice(7).toUpperCase()}
          </h4>
          <div className="orderShippingAddress">
            <h3 className="orderAddTitle">Shipping Address</h3>
            <p className="orderrecievername">{deliveryAddress[0]}</p>
            <p className="orderRecieverPhoneNo">{deliveryAddress[1]}</p>
            <p className="orderAddress">{deliveryAddress[2]}</p>
            <p className="distOrCountry">{deliveryAddress[3]}</p>
            <p className="orderPincode">{deliveryAddress[4]}</p>
          </div>
        </div>
      </div>
      {status !== "Order Cancelled" ? (
        <div className="orderCartButton">
          {status !== "Order Delivered" ? (
            <>
              <button
                className="cancelOrder"
                onClick={() => cancelOrder(orderId)}
              >
                cancel order
              </button>
              <span className="deliverydate">
                Expected delivery by{" "}
                <span style={{ fontWeight: "600" }}>{deliveryDate}</span>
              </span>
            </>
          ) : (
            <button className="buyNow">Return</button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderItemCard;
