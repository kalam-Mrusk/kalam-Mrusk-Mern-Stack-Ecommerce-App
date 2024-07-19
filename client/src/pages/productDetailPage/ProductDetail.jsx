import React, { useEffect, useState } from "react";
import "./productDetail.css";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadingEnd, loadingStart } from "../../redux/slice/loadingSlice.js";
import NavBar from "../../components/navBar/NavBar.jsx";
import singleProduct from "../../utility/singleProduct.js";
import { TailSpin } from "react-loader-spinner";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.status);
  const allProducts = useSelector((state) => state.product.value);
  const user = useSelector((state) => state.user.value);
  const [data, setData] = useState({});

  const getSingleProductData = async () => {
    dispatch(loadingStart());
    const singledata = await singleProduct(pid);
    setData(singledata);
    dispatch(loadingEnd());
  };

  const addToCart = async (productId) => {
    if (!user) {
      navigate("/auth/login");
    }
    try {
      const res = await axios.post(
        `${config.Api}cart/add-to-cart/${user?.user._id}/${productId}`,
        { withCredentials: true }
      );
      if (res.data?.data) {
        toast("✅Item Added Successfully...");
      }
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        toast("⚠️Item Already Added...");
      }
      console.log(error);
    }
  };

  let disPercentage = parseInt(
    ((data.price - data.discountedPrice) / data.price) * 100
  );
  const relatedData = allProducts
    ?.filter((item) => item.category1 === data.category1 && item._id != pid)
    .slice(0, 5);
  useEffect(() => {
    getSingleProductData();
  }, [pid]);
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
        <>
          <div className="productDetailcontainer">
            <div className="productDetailImage">
              <img src={data.imageUrl} alt="" />
            </div>
            <div className="productDetailSection">
              <h3 className="productDetailTitle">{data.title}</h3>
              <p className="productDetailDiscription">{data.discription}</p>
              <p>Size : {data.size}</p>
              <p className="detailpriceTag">
                Price : Rs{" "}
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  {data.price}
                </span>{" "}
                <span style={{ color: " rgb(29, 227, 29)" }}>
                  {" "}
                  {data.discountedPrice}
                </span>
              </p>
              <p className="detailDiscounted">
                Dicount :
                <span style={{ color: " rgb(29, 227, 29)" }}>
                  {disPercentage}%
                </span>
              </p>
              <button
                className="detailAddToCart"
                onClick={() => addToCart(pid)}
              >
                Add To Cart
              </button>
              <br />
              <button
                className="detailBuyNow"
                onClick={() => navigate(`/product-buying/${pid}`)}
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="relatedProduct">
            <h2 className="relatedProductTitle">Related Products</h2>
            <div className="relatedProductitems">
              {relatedData.map((product) => (
                <ProductCard
                  key={product._id}
                  pid={product._id}
                  imageUrl={product.imageUrl}
                  discountedPrice={product.discountedPrice}
                  price={product.price}
                  title={product.title}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
