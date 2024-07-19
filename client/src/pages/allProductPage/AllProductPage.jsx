import React, { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import "./allProductPage.css";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar.jsx";
const AllProductPage = () => {
  let allProducts = useSelector((state) => state.product.value);
  const [sortedData, setSortedData] = useState([]);
  const sortProducts = (order) => {
    const sortedProducts = [...allProducts].sort((a, b) => {
      return order === "asc"
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price);
    });
    setSortedData(sortedProducts);
  };
  const topDiscountedProduct = (value) => {
    setSortedData(allProducts);
    let disFilter = allProducts.filter((item) => {
      let val = Number(value);
      let dis = parseInt(
        ((Number(item.price) - Number(item.discountedPrice)) /
          Number(item.price)) *
          100
      );
      return dis > val;
    });
    console.log(disFilter);
    setSortedData(disFilter);
  };
  useEffect(() => {
    setSortedData(allProducts);
  }, [allProducts]);
  return (
    <>
      <NavBar />
      <div className="allProductContainer">
        <div className="allProductTitle">
          <h2>All Products-</h2>
          <div className="sortingMainContainer">
            <div className="discountedContainer">
              <label htmlFor="discountedQuantity">Discount: </label>
              <select
                name="discount"
                id="discountedQuantity"
                onChange={(e) => {
                  topDiscountedProduct(e.target.value);
                }}
              >
                <option value="0"></option>
                <option value="5">5%</option>
                <option value="20">20%</option>
                <option value="45">45%</option>
                <option value="60">60%</option>
                <option value="75">75%</option>
              </select>
            </div>
            <div className="sortingButton">
              <p style={{ color: "", marginLeft: "5px" }}>Sort:</p>
              <button onClick={() => sortProducts("asc")}>
                <ArrowUpwardRoundedIcon />
              </button>
              <button onClick={() => sortProducts("dsc")}>
                <ArrowDownwardRoundedIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="allProductItems">
          {sortedData.map((product) => (
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
  );
};

export default AllProductPage;
