import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./sellerProfilePage.css";
import SellerNav from "../../components/sellerNav/SellerNav.jsx";
const SellerProfilePage = () => {
  const navigate = useNavigate();
  const seller = useSelector((state) => state.seller.value);
  const loading = useSelector((state) => state.loading.status);

  useEffect(() => {
    if (!seller && !loading) {
      navigate("/seller/auth/login");
    }
  }, [loading]);
  return (
    <>
      <SellerNav />
      <div className="profile-container">
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          seller Profile
        </h1>
        <div className="profile-info">
          <h3 style={{ marginBottom: "1.5rem", color: "rgb(252, 98, 149)" }}>
            Personal Information
          </h3>

          <p>
            <strong>Seller name:</strong>
            <span style={{ color: "goldenrod" }}>
              {" "}
              {seller?.seller.sellername}
            </span>
          </p>
          <p>
            <strong>Email:</strong>
            <span style={{ color: "goldenrod" }}> {seller?.seller.gmail}</span>
          </p>

          <p>
            <strong>Login id:</strong>{" "}
            <span style={{ color: "goldenrod" }}>
              {" "}
              {seller?.seller.sellerLoginId}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SellerProfilePage;
