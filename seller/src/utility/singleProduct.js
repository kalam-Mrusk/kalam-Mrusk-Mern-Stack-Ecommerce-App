import axios from "axios";

const singleProduct = async (pid) => {
  if (!pid) {
    return;
  }
  try {
    let res = await axios.get(
      `http://localhost:8080/api/ecommerce/product/single-product/${pid}`
    );
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export default singleProduct;
