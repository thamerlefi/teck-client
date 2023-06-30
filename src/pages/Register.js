import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../redux/slices/authSlice";
import HelmetTitle from "../components/HelmetTitle";
import validate from "../utils/inputValidation";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loginErr, setLoginErr] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm:""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (isLoggedIn) navigate("/");
    else dispatch(reset());
  }, [isLoggedIn]);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, email, password, confirm };
    const errors = validate(newUser) 
    setLoginErr(errors)
    if (Object.keys(errors).length === 0) dispatch(register(newUser));
  };
 
  return (
    <div className="container-xxl d-flex align-items-center" style={{minHeight:"calc(100vh - 106px)"}}>
      <HelmetTitle title="Tech-Shop | Register" />
      <div className="row login">
        <div className="col-12 col-md-6 p-0 img">
          <img src="img/login.jpg" alt="" />
        </div>
        <div className="col-12 col-md-6 px-3 px-md-5 pt-2">
          <h4 className="text-center">Sign Up</h4>
          <form className="d-flex login-card flex-column">
            <div>
              {/* <label className="mb-2">First Name</label> */}
              <input
                type="text"
                onChange={(e) => {
                  setLoginErr({...loginErr, firstName:""})
                  setFirstName(e.target.value)}}
                placeholder="first name"
                className=
                {`form-control ${loginErr?.firstName ? "mb-0 border border-danger" : "mb-2"} `}
              />
              {loginErr?.firstName && <p className="input-error mb-1">{loginErr.firstName}</p>}
            </div>
            <div>
              {/* <label className="mb-2">Last Name</label> */}
              <input
                type="text"
                onChange={(e) => {
                  setLoginErr({...loginErr, lastName:""})
                  setLastName(e.target.value)}}
                placeholder="last name"
                className=
                {`form-control ${loginErr?.lastName ? "mb-0 border border-danger" : "mb-2"} `}
              />
              {loginErr?.lastName && <p className="input-error mb-1">{loginErr.lastName}</p>}
            </div>
            <div>
              {/* <label className="mb-2">Email</label> */}
              <input
                type="email"
                onChange={(e) => {
                  setLoginErr({...loginErr,email:""})
                  setEmail(e.target.value)}}
                placeholder="email"
                className=
                {`form-control ${loginErr?.email ? "mb-0 border border-danger" : "mb-2"} `}
              />
              {loginErr?.email && <p className="input-error mb-1">{loginErr.email}</p>}
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setLoginErr({...loginErr,password:""})
                  setPassword(e.target.value)}}
                className=
                {`form-control ${loginErr?.password ? "mb-0 border border-danger" : "mb-2"} `}
              />
              {loginErr?.password && <p className="input-error mb-1">{loginErr.password}</p>}
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => {
                  setLoginErr({...loginErr, confirm:""})
                  setConfirm(e.target.value)}}
                className=
                {`form-control ${loginErr?.confirm ? "mb-0 border border-danger" : "mb-2"} `}
              />
              {loginErr?.confirm && <p className="input-error mb-1">{loginErr.confirm}</p>}
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
            <Link to="/login" className="btn btn-outline-dark my-2">
              SIGN IN
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
