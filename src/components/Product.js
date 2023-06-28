import React from "react";
// import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decCount,
  incCount,
} from "../redux/slices/cartSlice";
import "../css/productCard.css";
import ReactStars from "react-rating-stars-component";
import { addToWish, deleteFromWish } from "../redux/slices/wishSlice";

export default function Product({ product, col, inWish }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shopCart);
  const { wishList } = useSelector((state) => state.wishList);
  const cartProd = cart.find((prod) => prod._id === product._id);
  const wishProd = wishList.find((prod) => prod._id === product._id);

  return (
    <div
      className={`${col || "col-2"} product-card position-relative`}
      // style={{ width: "24%" }}
    >
      <div className="product-img">
        <Link to={"/" + product._id}>
          <img
            src={product.image.secure_url}
            style={{ maxHeight: 180 }}
            alt=""
          />
        </Link>
      </div>
      <div className="product-details">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="brand mb-0">{product.category}</h6>
          <ReactStars
            count={5}
            size={18}
            value={product.rating}
            edit={false}
            isHalf={true}
            activeColor="#ffd700"
          />
        </div>
        <h5 className="product-title">{product.name}</h5>
        <div className="position-relative">
          <p className="product-price">${product.price}</p>
          {!cartProd ? (
            <div className="position-absolute cart-action">
              <i
                onClick={() => dispatch(addProduct(product))}
                className={`fa-sharp fa-solid fa-cart-shopping  `}
              ></i>
            </div>
          ) : (
            <div className="position-absolute btn-action cart-action-2">
              <Link style={{color:"#fff"}} onClick={() => dispatch(decCount(product))}>
                {cartProd.count > 1 ? "-" : <i className="fa-solid   fa-xmark"></i>}
              </Link>
              <span >{cartProd.count}</span>
              <Link style={{color:"#fff"}} onClick={() => dispatch(incCount(product))}>+</Link>
            </div>
          )}
        </div>
      </div>
      { inWish ?
        <i className="fa-solid position-absolute rem-wish fa-xmark"  
          onClick={()=>dispatch(deleteFromWish(product))}
        ></i>:
        <div className="action-bar position-absolute ">
        <div className="d-flex flex-column gap-2 align-items-center">
          <i className={`${wishProd ? "fa-solid" : "fa-regular"} fa-heart fs-6 ${wishProd ? "text-danger" : ""}`}
            onClick={()=>dispatch(addToWish(product))}
          ></i>
          <Link to={"/" + product._id}>
            <i className="fa-solid fa-eye fs-6"></i>
          </Link>
        </div>
      </div>
      }
    </div>
  );
}

