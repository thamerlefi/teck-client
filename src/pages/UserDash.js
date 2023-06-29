import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import "../css/user-dash.css"

export default function UserDash() {
  // const location = useLocation()
  const [activeRoute, setActiveRoute] = useState("profile")
  const { pathname } = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
    if(pathname.includes("/user/orders") ) setActiveRoute("orders")
    else setActiveRoute("profile")
  },[pathname])
  return (
    <div className='mt-0 container-xxl user-dash'>
        <div className='links '>
        <Link className={activeRoute==="profile" ? "active" : ""} to='/user/profile'>My Profile</Link>
        <Link className={activeRoute !=="profile" ? "active" : ""} to='/user/orders'>Orders History</Link>
        </div>
        <div className='user-dash-container'>
        <Outlet />
        </div>
    </div>
  )
}
