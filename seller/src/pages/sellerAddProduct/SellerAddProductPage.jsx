import React, { useEffect, useState } from "react";
import SellerNav from "../../components/sellerNav/SellerNav.jsx";
import SellerMenu from "../../components/sellerMenu/SellerMenu.jsx";
import "./sellerAddProduct.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const SellerAddProductPage = () => {
  const availSeller = useSelector((state) => state.seller.value);
  const navigate = useNavigate();
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

  const addProduct = async () => {
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
      const res = await axios.post(
        `${config.Api}product/add-product`,
        {
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
        },
        { withCredentials: true }
      );
      if (res.data.data) {
        toast("✅product added successfully");
        setCategory1("");
        setCategory2("");
        setColor("");
        setDiscountedPrice("");
        setDiscription("");
        setImageUrl("");
        setPrice("");
        setQuantity("");
        setSize("");
        setTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!availSeller) {
      navigate("/");
    }
  }, []);
  return (
    <div className="sellerAddProductContainer">
      <SellerNav />
      <div className="addMainContainer">
        <SellerMenu />
        <div className="productAddingForm">
          <div
            className="formItemContainer"
            style={{
              backgroundImage:
                "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
            }}
          >
            <h2 className="sellerProductTitle">
              <i>Add Product</i>
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
              <button onClick={addProduct}>add product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAddProductPage;
