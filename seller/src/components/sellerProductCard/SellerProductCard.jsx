import React from "react";
import "./sellerProductCard.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const SellerProductCard = ({
  imageUrl,
  title,
  price,
  discountedPrice,
  quantity,
  pid,
  products,
}) => {
  const navigate = useNavigate();
  const deleteProduct = async (pid) => {
    try {
      const res = await axios.delete(`${config.Api}product/delete/${pid}`);
      toast("✅product removed.");
      products();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sellerProducrCardContainer">
      <img src={imageUrl} alt="" className="sellerProductcardImg" />
      <div className="productInfoContainer">
        <h3 className="pTitle">{title}</h3>
        <p className="listedPrice">Price: Rs,{price}</p>
        <p className="sellingPrice">Selling Price: Rs,{discountedPrice}</p>
        <p className="quantity">Qty:{quantity}</p>
      </div>
      <div className="sellerButtonContainer">
        <button onClick={() => deleteProduct(pid)}>
          <DeleteForeverOutlinedIcon />
        </button>
        <button onClick={() => navigate(`/seller/update-product/${pid}`)}>
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

export default SellerProductCard;
