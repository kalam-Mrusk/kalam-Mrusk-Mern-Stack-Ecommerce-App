import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SellerNav from "../../components/sellerNav/SellerNav.jsx";
import SellerMenu from "../../components/sellerMenu/SellerMenu.jsx";
import { TailSpin } from "react-loader-spinner";

const SellerProductReturnPage = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const availSeller = useSelector((state) => state.seller.value);
  const sellerReturnData = {
    length: 0,
  };
  useEffect(() => {
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
            <i>Return Orders</i>
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
            ) : sellerReturnData.length === 0 ? (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9019/9019239.png"
                  alt=""
                  style={{ display: "block", margin: "auto", width: "50px" }}
                />
                <p style={{ textAlign: "center", fontWeight: "600" }}>Empty</p>
              </>
            ) : (
              // sellerReturnData?.map((item) => (
              // <SellerOrderCard
              //   key={item._id}
              //   orderId={item._id}
              //   pid={item.productId}
              //   deliveryAddress={item.deliveryAddress}
              //   paymentType={item.paymentType}
              //   sellingPrice={item.sellingPrice}
              //   orderedDate={item.orderedDate}
              //   deliveryCharge={item.deliveryCharge}
              //   quantity={item.quantity}
              //   sellerOrder={sellerOrder}
              // />
              <></>
              // ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductReturnPage;
