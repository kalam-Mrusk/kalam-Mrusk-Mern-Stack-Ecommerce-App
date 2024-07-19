import React, { useEffect, useState } from "react";
import "./shippingAddressPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { refresh } from "../../redux/slice/loadingSlice.js";
import config from "../../../config/config.js";
import { toast } from "react-toastify";
const ShippingAddressPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddressAvail = useSelector(
    (state) => state.shippingAddress.value
  );
  const [fullname, setFullname] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const setData = () => {
    setFullname(shippingAddressAvail?.fullname);
    setPhoneNo(shippingAddressAvail?.phone);
    setAddress(shippingAddressAvail?.address);
    setPincode(shippingAddressAvail?.pincode);
    setDistrict(shippingAddressAvail?.district);
    setState(shippingAddressAvail?.state);
    setCountry(shippingAddressAvail?.country);
  };
  const addAddress = async (e) => {
    e.preventDefault();
    const incompleteDetails = [
      fullname,
      phoneNo,
      address,
      pincode,
      district,
      state,
      country,
    ].some((item) => item.trim() === "" || item === null);
    if (incompleteDetails) {
      return toast("⚠️please fill all required fields.");
    }
    try {
      const res = await axios.post(
        `${config.Api}shipping-address/create`,
        {
          fullname,
          phone: phoneNo,
          address,
          pincode,
          district,
          state,
          country,
        },
        { withCredentials: true }
      );
      toast("✅shipping address created.");
      dispatch(refresh());
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  const updateAddress = async (e) => {
    e.preventDefault();
    const incompleteDetails = [
      fullname,
      phoneNo,
      address,
      pincode,
      district,
      state,
      country,
    ].some((item) => item.trim() === "" || item === null);
    if (incompleteDetails) {
      return toast("⚠️please fill all required fields.");
    }
    try {
      const res = await axios.put(
        `${config.Api}shipping-address/update/${shippingAddressAvail._id}`,
        {
          fullname,
          phone: phoneNo,
          address,
          pincode,
          district,
          state,
          country,
        }
      );
      toast("✅shipping address updated.");
      dispatch(refresh());
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (shippingAddressAvail) {
      setData();
    }
  }, [shippingAddressAvail]);
  return (
    <div className="ShippingAddressFormContainer">
      <h2 className="addressFormTitle">Shipping Address</h2>
      <form className="addressForm">
        <input
          type="text"
          placeholder="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="text"
          placeholder="phone no"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <input
          type="text"
          placeholder="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <input
          type="text"
          placeholder="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {shippingAddressAvail ? (
          <button onClick={(e) => updateAddress(e)}>update</button>
        ) : (
          <button onClick={(e) => addAddress(e)}>save</button>
        )}
      </form>
    </div>
  );
};

export default ShippingAddressPage;
