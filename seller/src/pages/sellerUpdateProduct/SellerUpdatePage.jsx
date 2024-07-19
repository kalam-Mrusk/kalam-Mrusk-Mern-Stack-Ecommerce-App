import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import singleProduct from "../../utility/singleProduct.js";
import { useNavigate, useParams } from "react-router-dom";
import SellerNav from "../../components/sellerNav/SellerNav.jsx";
import SellerMenu from "../../components/sellerMenu/SellerMenu.jsx";
import axios from "axios";
import "./sellerUpdateProductPage.css";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const SellerUpdatePage = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const availSeller = useSelector((state) => state.seller.value);
  const loading = useSelector((state) => state.loading.status);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const getSingleProductData = async () => {
    const singledata = await singleProduct(pid);

    setCategory1(singledata.category1);
    setCategory2(singledata.category2);
    setColor(singledata.color);
    setDiscountedPrice(singledata.discountedPrice);
    setDiscription(singledata.discription);
    setImageUrl(singledata.imageUrl);
    setPrice(singledata.price);
    setQuantity(singledata.quantity);
    setSize(singledata.size);
    setTitle(singledata.title);
  };

  const updateProduct = async () => {
    const incompleteDetail = [
      imageUrl,
      title,
      discription,
      category1,
      category2,
      size,
      price,
      discountedPrice,
      color,
      quantity,
    ].some((ele) => {
      return ele.trim() === "";
    });
    if (incompleteDetail) {
      return toast("⚠️incomplete details.");
    }
    try {
      const res = await axios.put(`${config.Api}product/update/${pid}`, {
        imageUrl,
        title,
        discription,
        category1,
        category2,
        size,
        price,
        discountedPrice,
        color,
        quantity,
      });
      if (res.data.data) {
        toast("✅product updated successfully");

        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!availSeller && !loading) {
      navigate(-1);
    }
    getSingleProductData();
  }, [availSeller]);
  return (
    <div className="sellerUpdateProductContainer">
      <SellerNav />
      <div className="updateMainContainer">
        <SellerMenu />
        <div className="productUpdatingForm">
          <div
            className="formItemContainer"
            style={{
              backgroundImage:
                "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
            }}
          >
            <h2 className="sellerProductTitle">
              <i>Update Product</i>
            </h2>
            <div className="formContainer">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="image Url"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
              <input
                type="text"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                placeholder="discription"
              />
              <input
                type="text"
                value={category1}
                onChange={(e) => setCategory1(e.target.value)}
                placeholder="category1"
              />
              <input
                type="text"
                value={category2}
                onChange={(e) => setCategory2(e.target.value)}
                placeholder="category2"
              />
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="size"
              />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="price"
              />
              <input
                type="text"
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                placeholder="discounted price"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="color"
              />
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="quantity"
              />
              <button onClick={updateProduct}>update product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerUpdatePage;
