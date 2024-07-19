import React, { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/navBar/NavBar.jsx";
import { loadingEnd, loadingStart } from "../../redux/slice/loadingSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import config from "../../../config/config.js";
const SearchedProductpage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.status);

  const [searchedData, setSearchedData] = useState([]);
  const { query } = useParams();
  const seachingProduct = async () => {
    try {
      dispatch(loadingStart());
      const res = await axios.get(`${config.Api}product/search?q=${query}`);
      setSearchedData(res.data?.data);
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(loadingEnd());
    }
  };
  useEffect(() => {
    seachingProduct();
  }, [query]);
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
      ) : searchedData.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "4rem", color: "grey" }}>
          Product Not Found...
        </h1>
      ) : (
        <div>
          <h2
            style={{
              borderBottom: "1px solid rgb(118, 116, 116)",
              margin: "2rem 0rem ",
              paddingBottom: "10px",
              paddingLeft: "4rem",
            }}
          >
            Searched products-
          </h2>
          <div
            className="searchedItemsContainer"
            style={{
              maxWidth: "90%",
              margin: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "10px",
            }}
          >
            {searchedData?.slice(0, 20).map((item) => (
              <ProductCard
                pid={item._id}
                imageUrl={item.imageUrl}
                price={item.price}
                discountedPrice={item.discountedPrice}
                title={item.title}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchedProductpage;
