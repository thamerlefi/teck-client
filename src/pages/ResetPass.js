import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../baseURL";
import { useDispatch, useSelector } from "react-redux";
import { pending, rejected } from "../redux/slices/authSlice";
import { fulfilled } from "../redux/slices/authSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HelmetTitle from "../components/HelmetTitle";

export default function ResetPass() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const resetPassHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(pending());
      const res = await axios.post(`${baseURL}api/user/forgot-password`, {
        email,
      });
      setMessage(res.data.message);
      dispatch(fulfilled());
      toast("please check your email to reset your password",{type:"success"})
    } catch (error) {
      setMessage(error.response.data.message);
      dispatch(rejected());
    }
  };
  // return (
  //   <div className='container mt-5'>
  //       <h5 className='mb-3'>enter your email to reset your password</h5>
  //     <form onSubmit={resetPassHandler}>
  //       <input
  //           type="email"
  //           className="form-control"
  //           style={{width:"400px"}}
  //           placeholder="Enter email"
            // value={email}
            // onChange={(e)=>setEmail(e.target.value)}
  //       />
  //       <button type="submit" className="btn btn-primary mt-3">
  //           {auth.isLoading ? "sending..." : "send"}
  //       </button>
  //     </form>
  //     {message !== "" && <p>{message}</p>}
  //   </div>
  // )
  return (
    <div
      className="container-xxl d-flex align-items-center"
      style={{ height: "calc(100vh - 106px)" }}
    >
      <HelmetTitle title="Tech-Shop | Reset Password" />
      <div className="row login">
        <div className="col-12 col-md-6 p-0 img">
          <img src="img/4.jpg" alt="" />
        </div>
        <div className="col-12 col-md-6 px-3 px-md-5 pt-3 ">
        <h4 className="text-center">Reset Password</h4>
          <form onSubmit={resetPassHandler} className="d-flex login-card flex-column">
            <div>
              <label className="mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="email"
                className="form-control mb-4"
              />
            </div>
            

            <button
              
              type="submit"
              className="btn btn-dark mt-2"
            >
              {isLoading ? (
                <Spinner size="sm"/>
              ) : (
                "SEND"
              )}
            </button>
            <div className="or text-center mt-2"></div>
            <p className="text-center or-p">OR</p>
            <Link to="/login" className="btn btn-outline-dark mt-3">
              SIGN IN
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
