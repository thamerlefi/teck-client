import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { baseURL } from "../baseURL";

export default function CategChart() {
  const [categories, setCategories] = useState([]);

  // for each categ getting the number of selling
  useEffect(() => {
    axios
      .get(baseURL + "api/orders/order-count-by-category", {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((res) => setCategories(res.data));
  }, []);

  let data = [
    ["Task", "Hours per Day"],
    
  ];

  categories.map(cat =>data.push(cat))
  
  const options = {
    title: "Selling By Categories",
    pieHole: 0.4,
    is3D: false,
  };
  return (
    <div style={{ width: "100%" }} className="p-0">
      <Chart
        chartType="PieChart"
        width="100%"
        height="250px"
        data={data}
        options={options}
      />
    </div>
  );
}
