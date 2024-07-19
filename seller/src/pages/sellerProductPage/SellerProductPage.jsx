import React, { useEffect, useState } from "react";
import "./sellerProductPage.css";
import SellerNav from "../../components/sellerNav/SellerNav.jsx";
import SellerMenu from "../../components/sellerMenu/SellerMenu.jsx";
import SellerProductCard from "../../components/sellerProductCard/SellerProductCard.jsx";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config.js";
const SellerProductPage = () => {
  const navigate = useNavigate();
  const availSeller = useSelector((state) => state.seller.value);

  const [sellerProduct, setSellerProduct] = useState([]);
  const [load, setLoad] = useState(null);
  const products = async () => {
    try {
      setLoad(true);
      const res = await axios.get(`${config.Api}product/seller-product`, {
        withCredentials: true,
      });
      setSellerProduct(res.data?.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  useEffect(() => {
    products();
    if (!availSeller) {
      navigate("/");
    }
  }, []);
  return (
    <div className="sellerProductPageMainContainer">
      <SellerNav />
      <div className="sellerProductContainer">
        <SellerMenu />
        <div className="AllproductContainer">
          <h2 className="allSellerProduct">
            <i>All Products</i>
          </h2>
          <div className="productItems">
            {load ? (
              <div
                className="sellerProductLoader"
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
            ) : sellerProduct.length === 0 ? (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9019/9019239.png"
                  alt=""
                  style={{ display: "block", margin: "auto", width: "50px" }}
                />
                <p style={{ textAlign: "center", fontWeight: "600" }}>Empty</p>
              </>
            ) : (
              sellerProduct?.map((item) => (
                <SellerProductCard
                  key={item._id}
                  pid={item._id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  price={item.price}
                  discountedPrice={item.discountedPrice}
                  quantity={item.quantity}
                  products={products}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductPage;
