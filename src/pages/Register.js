import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../redux/slices/authSlice";
import HelmetTitle from "../components/HelmetTitle";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn) navigate("/");
    else dispatch(reset());
  }, [isLoggedIn]);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, email, password, confirm };
    dispatch(register(newUser));
  };
 
  return (
    <div className="container-xxl d-flex align-items-center" style={{height:"calc(100vh - 106px)"}}>
      <HelmetTitle title="Tech-Shop | Register" />
      <div className="row login">
        <div className="col-12 col-md-6 p-0 img">
          <img src="img/4.jpg" alt="" />
        </div>
        <div className="col-12 col-md-6 px-3 px-md-5 pt-2">
          <h4 className="text-center">Sign Up</h4>
          <form className="d-flex login-card flex-column">
            <div>
              {/* <label className="mb-2">First Name</label> */}
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first name"
                className="form-control mb-2"
              />
            </div>
            <div>
              {/* <label className="mb-2">Last Name</label> */}
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name"
                className="form-control mb-2"
              />
            </div>
            <div>
              {/* <label className="mb-2">Email</label> */}
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="form-control mb-2"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
           

            <button
              onClick={handleRegister}
              type="submit"
              className="btn btn-dark mt-0"
            >
              {
                isLoading ?
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : "SIGN UP"
              }
            </button>
            <div className="or text-center mt-2"></div>
            <p className="text-center or-p">OR</p>
            <Link to="/login" className="btn btn-outline-dark mt-2">
              SIGN IN
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
