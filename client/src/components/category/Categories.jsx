import React from "react";
import "./categories.css";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();

  const categoriesList = [
    {
      imgUrl: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
      title: "Laptop",
    },
    {
      imgUrl: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
      title: "phone",
    },
    {
      imgUrl: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
      title: "furniture",
    },
    {
      imgUrl: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
      title: "Jacket",
    },
    {
      imgUrl: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
      title: "Book",
    },
    {
      imgUrl: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
      title: "Tshirt",
    },
    {
      imgUrl: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
      title: "Shoes",
    },
  ];
  return (
    <div className="categoryContainer">
      {categoriesList.map((item) => (
        <div
          key={item.title}
          className="categoryItem"
          onClick={() => navigate(`/category/${item.title}`)}
        >
          <div className="imgContainer">
            <img src={item.imgUrl} alt="" />
          </div>
          <div className="ctgTitle">
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
