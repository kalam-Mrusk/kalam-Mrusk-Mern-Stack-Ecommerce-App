import React, { useEffect, useState } from "react";
import OrderItemCard from "../../components/OrderItemCard/OrderItemCard.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../../components/navBar/NavBar.jsx";
import config from "../../../config/config.js";
const OrderPage = () => {
  const navigate = useNavigate();
  const userExists = useSelector((state) => state.user.value);
  const loading = useSelector((state) => state.loading.status);

  const [allOrderedItems, setAllOrderedItems] = useState([]);
  const getItems = async () => {
    try {
      const res = await axios.get(`${config.Api}product/order/myorder`, {
        withCredentials: true,
      });
      setAllOrderedItems(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const userNotExist = () => {
    if (!userExists && !loading) {
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    userNotExist();
    getItems();
  }, [loading, userExists]);
  return (
    <>
      <NavBar />
      <h2
        className="myOrderTitle"
        style={{ textAlign: "center", margin: "20px 0px" }}
      >
        All Orders
      </h2>
      <div
        className="allOrderItemContainer"
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          maxWidth: "70%",
          margin: "auto",
        }}
      >
        {allOrderedItems.map((item) => (
          <OrderItemCard
            key={item._id}
            getItems={getItems}
            orderId={item._id}
            pid={item.productId}
            address={item.deliveryAddress}
            quantity={item.quantity}
            deliveryCharge={item.deliveryCharge}
            paymentType={item.paymentType}
            status={item.status}
            orderedDate={item.orderedDate}
            deliveryDate={item.deliveryDate}
            sellingPrice={item.sellingPrice}
          />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
