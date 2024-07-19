import React, { useEffect } from "react";
import "./userProfilePage.css";
import NavBar from "../../components/navBar/NavBar.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const loading = useSelector((state) => state.loading.status);
  const address = useSelector((state) => state.shippingAddress.value);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/auth/login");
    }
  }, [user]);
  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          User Profile
        </h1>
        <div className="profile-info">
          <h3 style={{ marginBottom: "1.5rem", color: "rgb(252, 98, 149)" }}>
            Personal Information
          </h3>

          <p>
            <strong>Email:</strong>
            <span style={{ color: "goldenrod" }}> {user?.user.gmail}</span>
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            <span style={{ color: "goldenrod" }}> {user?.user.phone}</span>
          </p>
        </div>
      </div>
      <div className="shippingAdd">
        <h2 className="shpTitle">Shipping Address</h2>
        <p>{address?.fullname}</p>
        <p>{address?.phone}</p>
        <p>{address?.address}</p>
        <p>
          {address?.district}
          {", "}
          {address?.pincode}
        </p>
        <p>
          {address?.state}
          {", "}
          {address?.country}
        </p>
      </div>
    </>
  );
};

export default UserProfilePage;
