import React, { useEffect, useState } from "react";
import hero1 from "../../assets/hero1.png";
import Categories from "../../components/category/Categories.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import "./home.css";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import Testimonial from "../../components/testimonial/Testimonial.jsx";
const Home = () => {
  const allProducts = useSelector((state) => state.product.value.slice(1, 11));
  return (
    <>
      <NavBar />
      <div>
        <img src={hero1} alt="" style={{ width: "100%" }} />
        <Categories />
        <h2 className="homePageHeading">Bestselling Products</h2>
        <div className="bestSellingCard">
          {allProducts?.map((product) => (
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
        <Testimonial />
      </div>
      <Footer />
    </>
  );
};

export default Home;
