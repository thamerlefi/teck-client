import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../baseURL";
import { fulfilled, pending, rejected } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import HelmetTitle from "./HelmetTitle";

export default function UsersList() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state=>state.auth)

  const [allUsers, setAllUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // sort states
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    getAllUsers(5, activePage, sortBy, order);
  }, [sortBy, order,activePage]);

  //------------------------------ get all users handler (admin)
  async function getAllUsers(limit, page, sortBy, order) {
    try {
      dispatch(pending());
      const res = await axios.get(
        baseURL +
          `api/admin/users/?limit=${limit}&page=${page}&sortBy=${sortBy},${order}`,
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      );
      setAllUsers(res.data.list);
      setPages(res.data.pages);
      setActivePage(page);
      dispatch(fulfilled(res.data.message));
    } catch (error) {
      dispatch(rejected(error.response.data.message));
    }
  }
  //----------------------------------------
  function isSort(sort, ord) {
    if (sortBy === sort && order === ord) return "";
    else return "text-secondary";
  }

  // generating an array for all users pages [1,2,3...]
  let PagesButtons = [];
  for (let i = 1; i <= pages; i++) {
    PagesButtons.push(i);
  }
  //------------------------------ delete a user handler (admin)
  const deleteUserHandler = async (user) => {
    try {
      dispatch(pending());
      const res = await axios.delete(
        baseURL + `api/admin/remove-user/${user._id}`,
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      );
      getAllUsers(5, activePage || activePage - 1);
      dispatch(fulfilled(res.data.message));
      toast(res.data.message, { type: "success" });
    } catch (error) {
      dispatch(rejected(error.response.data.message));
      toast(error.response.data.message, { type: "error" });
    }
  };
  

  return (
    <>
    <HelmetTitle title="Dashboard | Users" />
    <div className="users-list mt-4">
      <table className="table table-striped custom-table">
        <thead className="bg-light">
          <tr>
            <th scope="col" className="position-relative">
              <span
                className="cur-point"
                onClick={() => {
                  setSortBy("firstName");
                  order === "asc" ? setOrder("desc") : setOrder("asc");
                }}
              >
                Customer
                <i
                  className={
                    "fa-solid fa-arrow-up ms-1 " + isSort("firstName", "asc")
                  }
                ></i>
                <i
                  className={
                    "fa-solid fa-arrow-down " + isSort("firstName", "desc")
                  }
                ></i>
                {
                  isLoading ? <div className="position-absolute" style={{top:"8px", left:"120px"}}>
                  <Spinner size="sm" />
                </div> : ""
                }
              </span>
            </th>
            <th scope="col">
              <span
                className="cur-point"
                onClick={() => {
                  setSortBy("isAdmin");
                  order === "asc" ? setOrder("desc") : setOrder("asc");
                }}
              >
                Role
                <i
                  className={
                    "fa-solid  fa-arrow-up ms-1 " + isSort("isAdmin", "asc")
                  }
                ></i>
                <i
                  className={
                    "fa-solid fa-arrow-down " + isSort("isAdmin", "desc")
                  }
                ></i>
              </span>
            </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, i) => (
            <tr key={user._id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={user.image.secure_url}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className={ `badge rounded-pill d-inline ${user.isAdmin ? "bg-success": "bg-danger"}`}>
                  {user.isAdmin ? "admin" : "user"}
                </p>
                </td>
              <td>
                <a href="#" className="text-secondary">
                  <i
                    onClick={() => deleteUserHandler(user)}
                    className="fa-solid fa-trash "
                  ></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="section mt-2 d-flex align-items-center justify-content-end">
      <div className="pages">
      {PagesButtons.map((page) => (
            <Link
            key={page}
              className={page === activePage ? "active" : ""}
              onClick={() => setActivePage(page)}
            >
              {page}
            </Link>
          ))}
      </div>
    </div>
    </>
  );
}
