import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { baseURL } from "../baseURL";
import axios from "axios";
import OrderDetails from "../components/OrderDetails";

export default function UserOneOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [pending, setPending] = useState(true);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    axios
      .get(`${baseURL}api/orders/user/order/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrder(res.data.order);
        setPending(false);
      });
  }, []);
  return pending ? (
    <div
      className="spinner-border loading-store "
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <OrderDetails order={order} />
  );
}
