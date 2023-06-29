import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../baseURL";
import OrderDetails from "./OrderDetails";

export default function AdminOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [pending, setPending] = useState(true);
  // get the order by id (for admin)
  useEffect(() => {
    axios
      .get(`${baseURL}api/orders/${orderId}`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrder(res.data.order);
        setPending(false);
      })
      .catch((er) => console.log(er));
  }, []);
  return (
    <div className="cus-section">
      {pending ? (
        <div
          className="spinner-border  loading-store "
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="border-bottom d-flex align-items-center gap-3 flex-wrap py-1">
            <h6 className="">
              <i className="fa-solid fa-person-military-pointing me-1"></i>
              {`${order.userId?.firstName} ${order.userId?.lastName}`}
            </h6>
            <h6 className="">
              <i className="fa-solid fa-phone me-1"></i>
              {`${order.shippingAdress?.phone.slice(4)}`}
            </h6>
            <h6 className="">
              <i className="fa-solid fa-envelope me-1"></i>
              {`${order.userId?.email}`}
            </h6>
          </div>
          <OrderDetails order={order} setOrder={setOrder} isAdmin={true} />
        </>
      )}
    </div>
  );
}
