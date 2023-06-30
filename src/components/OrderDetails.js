import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../baseURL";
import Spinner from "./Spinner";


export default function OrderDetails({ order, isAdmin, setOrder }) {
  const [pending, setPending] = useState(false);
  //------------------------- update Status function
  const updateStatusHandler = (status, id) => {
    setPending(true);
    let action =
      status === "Pending"
        ? "Processing"
        : status === "Processing"
        ? "Shipped"
        : status === "Shipped"
        ? "Delivered"
        : null;
    axios
      .put(
        `${baseURL}api/orders/update/${id}`,
        { action },
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setOrder(res.data.updatedOrder);
        setPending(false);
      })
      .catch((er) => console.log(er));
  };
  return (
    <div className="mt-2">
      <div
        className="row mt-3 d-flex align-items-center m-auto flex-wrap pb-2"
        style={{ maxWidth: "800px" }}
      >
        <div className="col-12 col-sm-4 ">
          <h5 className="mb-3 mb-sm-0">{`Total: ${order.totalPrice} $`}</h5>
        </div>
        <div className="col-12 mt-2 col-sm-8 d-flex align-items-center justify-content-around flex-wrap">
          <div className="mb-0 mb-sm-2">
            <span
              className={` px-3 py-2  text-white rounded-pill  ${
                order.status === "Pending"
                  ? "bg-warning"
                  : order.status === "Processing"
                  ? "bg-info"
                  : order.status === "Delivered"
                  ? "bg-primary"
                  : "bg-success"
              }`}
            >
              {order.status}
              {order.status === "Delivered" && (
                <i className="fa-solid ms-1 fa-check"></i>
              )}
            </span>
          </div>
          {isAdmin && (
            <div className="mb-0 mb-sm-2">
              {order.status !== "Delivered" && (
                <button
                  disabled={order.status === "Delivered" ? true : false}
                  className="link"
                  onClick={() => updateStatusHandler(order.status, order._id)}
                >
                  {pending ? (
                    <Spinner size="sm" />
                  ) : order.status === "Pending" ? (
                    "Processing"
                  ) : order.status === "Processing" ? (
                    "Shipped"
                  ) : order.status === "Shipped" ? (
                    "Delivered"
                  ) : (
                    "ended"
                  )}
                  {<i className="fa-solid ms-1 fa-arrow-right"></i>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <h5 className="ms-5">{`${order.products?.length} items`}</h5> */}
      {order.products?.map((product) => (
        <div
          key={product._id}
          className="border border-2 d-flex justify-content-around align-items-center my-1 m-auto p-0 p-sm-2"
          style={{ maxWidth: "800px" }}
        >
          <div className="col-sm-3">
            <img
              src={product.productId.image?.secure_url}
              alt=""
              style={{ width: "100px" }}
            />
          </div>
          <div className="col-sm-8 row">
            <div className="col-sm-5">
              <h4>{product.productId.name}</h4>
              <h6 className="text-primary">{product.productId.category}</h6>
              <h6 className="text-success">{product.productId.price} $</h6>
            </div>
            <div className="col-sm-5">
              <h5>Quantity: {product.quantity}</h5>
              <h6 className="text-danger">
                Sub-Total: {product.quantity * product.productId.price} $
              </h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
