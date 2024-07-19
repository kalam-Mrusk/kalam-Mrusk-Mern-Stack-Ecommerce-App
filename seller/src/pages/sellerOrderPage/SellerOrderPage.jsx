import React, { useEffect, useState } from "react";
import "./sellerOrderPage.css";
import SellerNav from "../../components/sellerNav/SellerNav.jsx";
import SellerMenu from "../../components/sellerMenu/SellerMenu.jsx";
import SellerOrderCard from "../../components/sellerOrderCard/SellerOrderCard.jsx";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config.js";
const SellerOrderPage = () => {
  const availSeller = useSelector((state) => state.seller.value);
  const navigate = useNavigate();
  const [sellerOrderData, setSellerOrderData] = useState([]);
  const [load, setLoad] = useState(false);
  const sellerOrder = async () => {
    try {
      setLoad(true);
      const res = await axios.get(`${config.Api}product/order/seller-order`, {
        withCredentials: true,
      });
      setSellerOrderData(res.data?.data);
      setLoad(false);
    } catch (error) {
      console.log(first);
      sellerOrder(false);
    }
  };
  useEffect(() => {
    sellerOrder();
    if (!availSeller) {
      navigate("/");
    }
  }, []);
  return (
    <div className="sellerOrderPageMainContainer">
      <SellerNav />
      <div className="pageMainBodyContainer">
        <SellerMenu />
        <div className="ordersContainer">
          <h2 className="sellerOrderTitle">
            <i>All Orders</i>
          </h2>
          <div className="oderItemDiv">
            {load ? (
              <div
                className="sellerOrderLoader"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TailSpin
                  visible={true}
                  height="50"
                  width="50"
                  color="black"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              </div>
            ) : sellerOrderData.length === 0 ? (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9019/9019239.png"
                  alt=""
                  style={{ display: "block", margin: "auto", width: "50px" }}
                />
                <p style={{ textAlign: "center", fontWeight: "600" }}>Empty</p>
              </>
            ) : (
              sellerOrderData?.map((item) => (
                <SellerOrderCard
                  key={item._id}
                  orderId={item._id}
                  pid={item.productId}
                  deliveryAddress={item.deliveryAddress}
                  paymentType={item.paymentType}
                  sellingPrice={item.sellingPrice}
                  orderedDate={item.orderedDate}
                  deliveryCharge={item.deliveryCharge}
                  quantity={item.quantity}
                  sellerOrder={sellerOrder}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderPage;
