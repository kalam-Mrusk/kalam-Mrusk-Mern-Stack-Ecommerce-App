import axios from "axios";
import config from "../../config/config.js";
const singleProduct = async (pid) => {
  if (!pid) {
    return;
  }
  try {
    let res = await axios.get(`${config.Api}product/single-product/${pid}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export default singleProduct;
