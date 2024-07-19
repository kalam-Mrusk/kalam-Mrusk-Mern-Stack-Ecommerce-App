import React, { useState } from "react";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar.jsx";

const CategoryPage = () => {
  const { categories } = useParams();
  const allProducts = useSelector((state) => state.product.value);
  const filterdata = allProducts.filter(
    (item) => item.category1.toLowerCase() === categories.toLowerCase()
  );
  console.log(filterdata);
  return (
    <>
      <NavBar />
      <h2
        style={{
          borderBottom: "1px solid rgb(118, 116, 116)",
          margin: "2rem 0rem ",
          paddingBottom: "10px",
          paddingLeft: "4rem",
        }}
      >
        Showing Results : {categories}
      </h2>
      <div
        style={{
          maxWidth: "90%",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "10px",
        }}
      >
        {filterdata.map((product) => (
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
    </>
  );
};

export default CategoryPage;
