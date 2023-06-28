import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import HelmetTitle from "../components/HelmetTitle";
import { Spinner } from "react-bootstrap";

export default function OrderHistory() {
  const [userOrders, setUserOrders] = useState([]);
  const [pending, setPending] = useState(true);
  
  useEffect(() => {
    axios
      .get(`${baseURL}api/orders/user/orders`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserOrders(res.data.orders)
        setPending(false)
      });
  }, []);
  const tranformDate = (date) => {
    let endDt = "",
      hr = "",
      dt = "";
    dt = date.split("T")[0].split("-").reverse().join("/");
    hr = date.split("T")[1].split(".")[0];
    hr = hr.split(":")[0] + ":" + hr.split(":")[1];
    endDt = hr + "-" + dt;
    return endDt;
  };
 
  return (
    <>
      <HelmetTitle title="Tech-Shop | Orders History" />
      <div className="mt-2 orders-list">
        <table className="table table-striped align-middle mb-0 bg-white custom-table">
          <thead className="bg-light">
            <tr>
              <th className="position-relative">
                Products
                {
                  pending && <div className="position-absolute" style={{top:"8px", left:"120px"}}>
                  <Spinner size="sm" />
                </div>
                }
              </th>
              <th>Date</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={order._id}>
                <td>
                    {order.products.map((prod) => (
                  <div key={prod._id} className="d-flex mt-1 align-items-center">
                       {/* <p className="mb-0" key={prod.productId._id}>
                         {prod.productId.name}
                       </p> */}
                        <img
                      src={prod.productId.image?.secure_url}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className=""
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {prod.productId.name}
                      </p>
                      <p className="text-muted mb-0">{prod.productId.price} $ ({prod.quantity})</p>
                    </div>
                  </div>
                    ))}
                    
                </td>
                <td>
                  <p className="fw-normal mb-1">
                    {tranformDate(order.createdAt)}
                  </p>
                  {/* <p className="text-muted mb-0">IT department</p> */}
                </td>
                <td>
                  <span
                    className={`badge rounded-pill d-inline ${
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
                  </span>
                </td>
                <td>{order.totalPrice} $</td>
                <td>
                  <Link
                    to={`/user/orders/${order._id}`}
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                  >
                    <i className="fa-solid fa-eye fs-6"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
}

/* 
<div className="section mt-2 d-flex align-items-center justify-content-between">
        <div>
          <select
            // onChange={(e) => {
            //   setFilter(e.target.value);
            // }}
            className="form-select py-0 "
          >
            <option value="">All Orders</option>
            <option value="status,Pending">Pending</option>
            <option value="status,Processing">Processing</option>
            <option value="status,Shipped">Shipped</option>
            <option value="status,Delivered">Delivered</option>
          </select>
        </div>
        {/* <div className="pages">
          {PagesButtons.map((page) => (
            <Link
              className={page === activePage ? "active" : ""}
              onClick={() => setActivePage(page)}
            >
              {page}
            </Link>
          ))}
        </div> 
        </div>
*/