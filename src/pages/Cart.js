import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProd,
  updateQuantity,
} from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../baseURL";
import { pending } from "../redux/slices/authSlice";
import { loadStripe } from "@stripe/stripe-js";
import { clientSecretStripe } from "../utils/clientSecretStrippe";
import Spinner from "../components/Spinner"
import "../css/cart.css";

const stripePromise = loadStripe(clientSecretStripe);

export default function Cart() {
  const { cart, total } = useSelector((state) => state.shopCart);
  const { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checkoutHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(pending());

      const { data } = await axios.post(
        `${baseURL}api/orders/create-checkout`,
        {
          cart,
          userId: user.id,
        },
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      );
      const sessionId = data.sessionId;
      const stripe = await stripePromise;
      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("userId", user.id);
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.error(result.error);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end cart"
        tabIndex="-1"
        id="offcanvasExample8"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <h5 className="text-center">Your Cart</h5>
          {cart.length ===0 && <h3 className="text-secondary text-center my-4">Your Cart is Empty</h3>}
          {cart.map((prod) => (
            <div key={prod._id} className="d-flex mt-3 gap-3 position-relative">
              <img
                style={{ width: "80px", height: "80px", border: "1px solid #ccc8c8" }}
                src={prod.image.secure_url}
                alt=""
              />
              <div>
                <p className="text-uppercase">{prod.name}</p>
                <p style={{fontWeight:"500"}}>${prod.price * prod.count}</p>
                <div className=" count">
                  <input type="number" onChange={(e)=>dispatch(updateQuantity({...prod,quantity:+e.target.value}))} 
                  value={prod.count} />
                </div>
              </div>
              <i
              style={{position:"absolute", right:"10px", bottom:"10px"}}
              onClick={()=>dispatch(deleteProd(prod))}
                    className="fa-solid fa-trash cur-point"
                  ></i>
            </div>
          ))}
          <div className="text-end mt-3" style={{borderTop:"1px solid"}}>
            <p ><span style={{fontWeight:"600"}}>Total:</span> ${total}</p>
          </div>
          <div className="text-center mt-3">
            {cart.length !==0 && (isLoggedIn ? <button onClick={checkoutHandler} className="bye-now">
              {isLoading ? <Spinner size="sm"/> : "BUY NOW"}
              </button> : 
              <span className="alert alert-warning " disabled>please <Link to="/login">login</Link> first</span>)
              }
          </div>
        </div>
      </div>
    </>
  );
}
