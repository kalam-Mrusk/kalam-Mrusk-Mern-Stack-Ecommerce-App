import React, { useEffect } from "react";
import "./sellerDashboard.css";
import { NavLink, useNavigate } from "react-router-dom";

import SellerNav from "../../components/sellerNav/SellerNav.jsx";
import SellerMenu from "../../components/sellerMenu/SellerMenu.jsx";
import { useSelector } from "react-redux";
const Sellerdashboard = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.status);
  const availSeller = useSelector((state) => state.seller.value);
  useEffect(() => {
    if (!availSeller && !loading) {
      navigate("/");
    }
  }, [loading]);
  return (
    <div className="dashboardMainContainer">
      <SellerNav />
      <div className="sectionContainer">
        <div className="leftSection">
          <SellerMenu />
        </div>
        <div className="rightSection">
          <h3
            className="dashboardTitle"
            style={{
              margin: "1rem",
              color: "grey",
            }}
          >
            <i>Dashboard</i>
          </h3>
          <div className="rightSectionItem">
            <NavLink to="/seller/product" className="dashboard-link">
              <div
                className="yourProduct abc"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
                }}
              >
                <h3>your product</h3>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9752/9752284.png"
                  alt=""
                />
              </div>
            </NavLink>
            <NavLink to="/seller/add-product" className="dashboard-link">
              <div
                className="addProduct abc"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                }}
              >
                <h3>Add product</h3>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/11065/11065742.png"
                  alt=""
                />
              </div>
            </NavLink>
            <NavLink to="/seller/orders" className="dashboard-link">
              <div
                className="orders abc"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                }}
              >
                <h3>orders</h3>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4893/4893204.png"
                  alt=""
                />
              </div>
            </NavLink>
            <NavLink to="/seller/return" className="dashboard-link">
              <div
                className="return abc"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                }}
              >
                <h3>return</h3>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5313/5313905.png"
                  alt=""
                />
              </div>
            </NavLink>
          </div>
          <div className="rightSectionText">
            <p style={{ color: "grey", fontSize: "18px" }}>
              Hello{" "}
              <span style={{ color: "rgb(252, 98, 149)", fontSize: "24px" }}>
                {availSeller?.seller.sellername}
              </span>{" "}
              ! wellcome to your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellerdashboard;
