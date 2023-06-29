import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../css/user-dash.css";
import { useSelector } from "react-redux";

export default function UserDash() {
  // const location = useLocation()
  const [activeRoute, setActiveRoute] = useState("profile");
  const { pathname } = useLocation();
  const { isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname.includes("/user/orders")) setActiveRoute("orders");
    else setActiveRoute("profile");
  }, [pathname]);
  return (
    <>
      {isLoading ? (
        <div
          className="spinner-border loading-store "
          style={{ width: "4rem", height: "4rem", marginTop: "300px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="mt-0 container-xxl user-dash">
          <div className="links ">
            <Link
              className={activeRoute === "profile" ? "active" : ""}
              to="/user/profile"
            >
              My Profile
            </Link>
            <Link
              className={activeRoute !== "profile" ? "active" : ""}
              to="/user/orders"
            >
              Orders History
            </Link>
          </div>
          <div className="user-dash-container">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
