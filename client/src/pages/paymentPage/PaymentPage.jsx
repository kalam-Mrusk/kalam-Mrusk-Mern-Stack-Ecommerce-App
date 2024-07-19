import axios from "axios";
import "./paymentPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/ecommerce-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { unSetDetail } from "../../redux/slice/buyingProductDetailSlice.js";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.productDetail.value);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const placedOrder = async () => {
    if (paymentMethod !== "Cash on Delivery")
      return toast("⚠️please select payment method.");
    if (!orderDetail) {
      navigate("/all-products");
    }
    try {
      const res = await axios.post(
        `${config.Api}product/order/order-placed/${orderDetail.sellerId}/${orderDetail.productId}`,
        {
          quantity: orderDetail.quantity,
          paymentType: "cash on delivery",
          deliveryAddress: orderDetail.deliveryAddress,
          sellingPrice: orderDetail.sellingPrice,
          orderedDate: orderDetail.orderedDate,
          deliveryDate: orderDetail.deliveryDate,
        },
        { withCredentials: true }
      );
      if (res) {
        toast("✅order placed successfully");
        dispatch(unSetDetail());
        navigate("/my-order");
      }
    } catch (error) {
      console.log(error);
      // localStorage.removeItem("orderDetail");
    }
  };
  //Razorpay start ........

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    if (paymentMethod !== "online")
      return toast("⚠️please select payment method.");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      window.alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(`${config.Api}payment/orders`, {
      amount: orderDetail.sellingPrice * orderDetail.quantity * 100,
    });

    if (!result) {
      window.alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data?.data;
    const options = {
      key: "rzp_test_DoQeKlTVv63Xol",
      amount: amount,
      currency: currency,
      name: "ecommerce",
      description: "Test Transaction",
      image: logo,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(`${config.Api}payment/success`, data);

        if (result) {
          try {
            const res = await axios.post(
              `${config.Api}product/order/order-placed/${orderDetail.sellerId}/${orderDetail.productId}`,
              {
                quantity: orderDetail.quantity,
                paymentType: "Online Payment",
                deliveryAddress: orderDetail.deliveryAddress,
                sellingPrice: orderDetail.sellingPrice,
                orderedDate: orderDetail.orderedDate,
                deliveryDate: orderDetail.deliveryDate,
                deliveryCharge: orderDetail.deliveryCharge,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
              },
              { withCredentials: true }
            );

            if (res) {
              toast("✅order placed successfully");
              dispatch(unSetDetail());
              navigate("/my-order");
            }
          } catch (error) {
            console.log(error);
            dispatch(unSetDetail());
          }
        }
      },
      // prefill: {
      //   // name: "kalam",
      //   // email: "mruskpractice7000@gmail.com",
      //   // contact: "7903732730",
      // },
      notes: {
        address: "xyz Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  //RazorPay end ..........

  useEffect(() => {
    if (!orderDetail) {
      navigate("/all-products");
    }
  }, []);
  return (
    <>
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        *Note: Please do not refresh or reload the page.
      </p>
      <div className="mainContainer">
        <div className="paymentOptions">
          <h3>Payment Options</h3>
          <label htmlFor="COD" className="label">
            <input
              type="radio"
              id="COD"
              name="payment"
              value="Cash on Delivery"
              className="custom-radio"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>{" "}
          <br />
          <label htmlFor="online" className="label">
            <input
              type="radio"
              id="online"
              name="payment"
              value="online"
              className="custom-radio"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Internet Banking
          </label>
        </div>
        <div className="buttonContainer">
          {paymentMethod === "online" ? (
            <button
              onClick={displayRazorpay}
              style={{ backgroundColor: "rgb(68, 219, 68)" }}
            >
              procced
            </button>
          ) : (
            <button
              onClick={placedOrder}
              style={{ backgroundColor: "rgb(68, 219, 68)" }}
            >
              confirm Order
            </button>
          )}
          <button
            onClick={() => {
              localStorage.removeItem("orderDetail");
              navigate("/all-products");
            }}
            style={{ backgroundColor: "rgb(235, 95, 100)" }}
          >
            back
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
