import React, { useEffect, useState } from "react";
import ProductBuying from "../../components/productBuying/ProductBuying.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import NavBar from "../../components/navBar/NavBar.jsx";
import config from "../../../config/config.js";
const ProductBuyingPage = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const userExist = useSelector((state) => state.user.value);
  const loading = useSelector((state) => state.loading.status);
  const [data, setData] = useState(null);
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

  singleProduct(pid);
  useEffect(() => {
    if (!userExist && !loading) {
      navigate("/auth/login");
    }
    singleProduct();
  }, [pid]);
  return (
    <>
      <NavBar />
      {data === null ? (
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
        <ProductBuying
          pid={pid}
          sellerId={data?.sellerId}
          imageUrl={data?.imageUrl}
          title={data?.title}
          discription={data?.discription}
          price={data?.price}
          discountedPrice={data?.discountedPrice}
          deliveryCharge={data?.deliveryCharge}
        />
      )}
    </>
  );
};

export default ProductBuyingPage;
