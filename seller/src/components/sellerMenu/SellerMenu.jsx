import React, { useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import "./sellerMenu.css";
import { NavLink } from "react-router-dom";
const SellerMenu = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <div className="menuMainContainer">
      <MenuRoundedIcon
        className="menuIcon"
        style={{ marginLeft: "12px", fontSize: "2.5rem" }}
        onClick={() => setDisplayMenu(!displayMenu)}
      />
      <div className={displayMenu ? "menuContainer" : "menuContainer2"}>
        <NavLink to={"/seller/dashboard"} className="sellerNavLink">
          <div className="menuItems">
            <DashboardCustomizeOutlinedIcon className="menuItemIcon" />
            <li className="itemName">Dashboard</li>
          </div>
        </NavLink>
        <NavLink to={"/seller/profile"} className="sellerNavLink">
          <div className="menuItems">
            <PersonOutlinedIcon className="menuItemIcon" />
            <li className="itemName">Profile</li>
          </div>
        </NavLink>
        <div className="menuItems">
          <AccountBalanceOutlinedIcon className="menuItemIcon" />
          <li className="itemName">Transection</li>
        </div>
        <div className="menuItems">
          <CancelOutlinedIcon className="menuItemIcon" />
          <li className="itemName">Cancel Order</li>
        </div>
        <div className="menuItems">
          <HourglassEmptyOutlinedIcon className="menuItemIcon" />
          <li className="itemName">Out of Stock Product</li>
        </div>
        <div className="menuItems">
          <LocalShippingOutlinedIcon className="menuItemIcon" />
          <li className="itemName">Shipped Product</li>
        </div>
      </div>
    </div>
  );
};

export default SellerMenu;
