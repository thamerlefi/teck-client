import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  login, reset } from "../redux/slices/authSlice";
import Spinner from "../components/Spinner"
import "../css/login.css";
import HelmetTitle from "../components/HelmetTitle";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isError, isSuccess, message, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoggedIn) navigate("/");
    else dispatch(reset());
  }, [isLoggedIn]);
  const user = { email, password };
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };
  
  return (
    <div className="container-xxl d-flex align-items-center" style={{height:"calc(100vh - 106px)"}}>
      <HelmetTitle title="Tech-Shop | Login" />
      <div className="row login">
        <div className="col-12 col-md-6 p-0 img">
          <img
            src="img/login.jpg"
            alt=""
          />
        </div>
        <div className="col-12 col-md-6 px-3 px-md-5 pt-3 ">
          <h4 className="text-center">Login</h4>
          <form className="d-flex login-card flex-column">
            <div>
              <label className="mb-2">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="form-control mb-4"
              />
            </div>
            <div>
              <label className="mb-2">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="form-control"
              />
              <Link to="/reset-password" className="mt-2 d-block text-center">
                Forgot your Password ?
              </Link>
            </div>

            <button
              onClick={loginHandler}
              type="submit"
              className="btn btn-dark mt-2"
            >
              {isLoading ? (
                <Spinner size="sm"/>
              ) : (
                "SIGN IN"
              )}
            </button>
            <div className="or text-center mt-2"></div>
            <p className="text-center or-p">OR</p>
            <Link to="/register" className="btn btn-outline-dark mt-3">
              CREATE AN ACCOUNT
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
