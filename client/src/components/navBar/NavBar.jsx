import React, { useEffect, useState } from "react";
import "./NavBar.css";
import logo from "../../../public/ecommerce-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../redux/slice/loadingSlice.js";
import SearchIcon from "@mui/icons-material/Search";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const userExist = useSelector((state) => state.user.value);
  const loading = useSelector((state) => state.loading.status);
  const userLogOut = async () => {
    try {
      const res = await axios.get(
        `${config.Api}user/auth/logout`,

        {
          withCredentials: true,
        }
      );
      toast("⛔user logout.");
      dispatch(refresh());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="" />
      </div>
      <ul className="navbar__links">
        <li className="navbar__link">
          <NavLink to={"/"} className="linkStyle">
            Home{" "}
          </NavLink>
        </li>

        <li className="navbar__link">
          <NavLink to={"/all-products"} className="linkStyle">
            All Product
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to={"/my-order"} className="linkStyle">
            Order
          </NavLink>
        </li>
        <div className="searchContainer">
          <input
            type="text"
            value={query}
            className="search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => {
              let q = query.trim();
              if (q !== "") {
                navigate(`/searched-products/${q}`);
              }
            }}
          >
            <SearchIcon className="search-icon" />
          </button>
        </div>
      </ul>
      <div className="navbar__actions">
        {!userExist ? (
          <NavLink to={"/auth/login"} className="linkStyle">
            <button className="navbar__button">
              <LoginRoundedIcon />
            </button>
          </NavLink>
        ) : (
          <button
            className="navbar__button logoutButton"
            onClick={() => userLogOut()}
          >
            <LogoutRoundedIcon />
          </button>
        )}

        <NavLink to={"/cart"} className="linkStyle">
          <div className="navbar__cart">
            <ShoppingCartRoundedIcon />
          </div>
        </NavLink>
        <NavLink to={"/user/profile"} className="linkStyle">
          <div className="navbar__profile">
            <AccountCircleIcon
              style={{ fontSize: "35px", cursor: "pointer" }}
            />
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
