import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../css/adminDash.css";

export default function Admin() {
  const [active, setActive] = useState("dash");
  const location = useLocation()

  useEffect(()=>{
    if(location.pathname.includes("/admin/users") ) setActive("cust")
    else if(location.pathname.includes("/admin/products") ) setActive("prod")
    else if(location.pathname.includes("/admin/orders") ) setActive("ord")
    else if(location.pathname.includes("/admin/dashboard") ) setActive("dash")
  },[location.pathname])

  useEffect(()=>{
    const scrollListener= (()=>{
      const adminSide = document.querySelector('.side-bar-nav')
    adminSide.classList.toggle("to-top", window.scrollY > 60)
    })
    window.addEventListener("scroll",scrollListener)
    return ()=>{
      window.removeEventListener('scroll', scrollListener)
    }
  },[])
  return (
    <div className="">
      <div className=" d-flex flex-column ">
        <div
          className="offcanvas offcanvas-start side-bar-nav "
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header d-flex flex-column align-items-center">
            <Link
              to="/admin/dashboard"
              className={active === "dash" ? "active": ""}
              onClick={() => setActive("dash")}
            >
              <i className="fa-solid fa-chart-line me-2"></i> Dashboard
            </Link>
            <Link
              to="/admin/users"
              className={active === "cust" ? "active": ""}
              onClick={() => setActive("cust")}
            >
              <i className="fa-solid fa-users me-2"></i> Users
            </Link>
            <Link
              to="/admin/products"
              className={active === "prod" ? "active": ""}
              onClick={() => setActive("prod")}
            >
              <i className="fa-solid fa-sitemap me-2"></i> Products
            </Link>
            <Link
              to="/admin/orders"
              className={active === "ord" ? "active": ""}
              onClick={() => setActive("ord")}
            >
              <i className="fa-solid fa-pen me-2"></i> Orders
            </Link>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body"></div>
        </div>
      </div>
      <div className="dash-main">
        {/* <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          {">"}
        </button> */}
        <Outlet />
      </div>
    </div>
  );
}
