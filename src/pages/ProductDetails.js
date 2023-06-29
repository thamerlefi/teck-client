import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../redux/slices/productSlice";
import { ListGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { addProduct, decCount, incCount } from "../redux/slices/cartSlice";
import "../css/ProdDeatils.css";
import ReactStars from "react-rating-stars-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Product from "../components/Product";
import { addToWish } from "../redux/slices/wishSlice";
import NotFound from "./NotFound";
import HelmetTitle from "../components/HelmetTitle";

export default function ProductDetails() {
  const [starsKey, setStarsKey] = useState(Math.random());
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.shopCart);
  const cartProd = cart.find((prod) => prod._id === products.product._id);
  const { id } = useParams();
  const { pathname } = useLocation();

  const [product, setProduct] = useState({});
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [randomProds, setRandomProds] = useState([]);

  const { wishList } = useSelector((state) => state.wishList);
  const wishProd = wishList.find((prod) => prod._id === product._id);

  const commentHandler = async (e) => {
    const data = {
      comment,
      userId: auth.user.id,
      firstName: auth.user.firstName,
      lastName: auth.user.lastName,
      image: auth.user.image.secure_url,
      rating,
    };
    e.preventDefault();
    try {
      setPending(true);
      if (rating === 0) {
        setPending(false);
        return toast("Rating is required", { type: "error" });
      }
      const res = await axios.post(
        `${baseURL}api/products/${id}/comment`,
        data,
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      );
      toast(res.data.message, { type: "success" });
      setPending(false);
      dispatch(getOneProduct(id));
      setComment("");
      setRating(0);
    } catch (error) {
      setPending(false);
      toast(error.response.data.message, { type: "error" });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getOneProduct(id));
    axios
      .get(baseURL + "api/products/random/?size=10")
      .then((res) => setRandomProds(res.data.randomProducts))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setProduct(products.product);
    setStarsKey(Math.random());
  }, [products.product]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: false,
    speed: 1000,
    nextArrow: <SlickNext />,
    prevArrow: <SlickPrev />,
    pauseOnHover: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return auth.isLoading ? (
    <div
      className="spinner-border loading-store "
      style={{ width: "4rem", height: "4rem", marginTop: "300px" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <>
      {products.message === "product not found" ? (
        <>
          <HelmetTitle title="Tech-Shop | Not Found" />
          <NotFound msg="404 Not Found" />
        </>
      ) : (
        <>
          {/* ----------------------------------------- prod details */}
          <div className="container-xxl">
            <HelmetTitle title={product.name} />
            <div className="prod-details p-3 mt-3 ">
              <div className="container-xxl">
                <div className="row">
                  <div className="col-12 col-md-6 img-wrapper">
                    <img src={product.image?.secure_url} alt="" />
                  </div>
                  <div className="col-12 col-md-6 info">
                    <h1 className="prod-title mt-3 mt-md-0 b-bottom">
                      {product.name}
                    </h1>
                    <h2 className="prod-price">${product.price}</h2>
                    <div className="prod-reviews d-flex gap-1 align-items-center">
                      <ReactStars
                        key={starsKey}
                        count={5}
                        size={18}
                        value={product.rating}
                        edit={false}
                        isHalf={true}
                        activeColor="#ffd700"
                      />
                      <p>({product.numOfReviews} reviews)</p>
                    </div>
                    <h1 className="prod-price mt-2">Category:</h1>
                    <p className="prod-categ">{product.category}</p>
                    <div className="d-flex gap-2 align-items-center mt-2">
                      <h1 className="prod-price mt-2">Avaibility:</h1>
                      <p className="prod-categ">
                        {product.stock > 0 ? (
                          <span
                            className={`badge rounded-pill d-inline bg-success`}
                          >
                            {product.stock} In stock
                          </span>
                        ) : (
                          <span
                            className={`badge rounded-pill d-inline bg-danger`}
                          >
                            out of stock
                          </span>
                        )}
                      </p>
                    </div>
                    <h1 className="prod-price mt-2">Description:</h1>
                    <p className="prod-descr">{product.description}</p>
                    <div className="prod-actions d-flex flex-column flex-sm-row gap-2 mt-2 ">
                      {cartProd ? (
                        <div className=" px-3 button d-flex align-items-center justify-content-between">
                          <Link
                            className="fs-4 text-white"
                            onClick={() => dispatch(decCount(product))}
                          >
                            {cartProd.count > 1 ? (
                              "-"
                            ) : (
                              <i className="fa-solid fs-5 fa-xmark"></i>
                            )}
                          </Link>
                          <span>{cartProd.count}</span>
                          <Link
                            className="fs-4 text-white"
                            onClick={() => dispatch(incCount(product))}
                          >
                            +
                          </Link>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            auth.isLoggedIn
                              ? dispatch(addProduct(product))
                              : toast(`you must loggin first`, {
                                  type: "error",
                                });
                          }}
                          className="button"
                        >
                          Add To cart
                        </button>
                      )}
                      <button
                        className="button by-now"
                        style={{ background: "#f02d34", color: "#fff" }}
                        onClick={() => {
                          auth.isLoggedIn
                            ? dispatch(addToWish(product))
                            : toast(`you must loggin first`, { type: "error" });
                        }}
                      >
                        {!wishProd ? "add to" : "remove from "} wish
                      </button>
                    </div>
                    <div className="d-flex gap-2 align-items-center mt-2">
                      <h1 className="prod-price mt-2">In Cart:</h1>
                      <p className="prod-categ">
                        {!cartProd?.count
                          ? "0 items"
                          : cartProd?.count === 1
                          ? "1 item"
                          : cartProd.count + " items"}
                      </p>
                    </div>
                    <div className="">
                      {/* {!wishProd ? (
                        <div className="mt-3 d-flex gap-2 align-items-center">
                          <i className="fa-regular  fa-heart fs-6"></i>
                          <p>In wishlist</p>
                        </div>
                      ) : (
                        ""
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ----------------------------------------- reviews */}
            <div className="prod-reviews mt-4">
              <h4 className=" ">Reviews</h4>
              <div className="reviews p-3">
                {auth.isLoggedIn ? (
                  <form className="row" onSubmit={commentHandler}>
                    <div className="col-12 col-sm-6 col-md-5">
                      <input
                        value={comment}
                        className="form-control "
                        placeholder="Write a comment"
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div className="d-flex gap-2 align-items-center mt-3 mt-sm-0 col-12 col-sm-6 col-md-4">
                      <p className="prod-rating">Rating:</p>
                      <ReactStars
                        key={starsKey}
                        count={5}
                        size={28}
                        edit={true}
                        value={rating}
                        onChange={ratingChanged}
                        isHalf={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="col-12 col-sm-5 col-md-2 mt-3 mt-md-0">
                      <button className="button">
                        {pending ? <Spinner size="sm" /> : "submit"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="alert alert-warning" role="alert">
                    please <Link to="/login">login</Link> to be able to add a
                    comment !!
                  </div>
                )}
                <ListGroup className="my-3">
                  {product.reviews &&
                    [...product.reviews].reverse().map((elmnt) => (
                      <ListGroup.Item key={elmnt._id} className="d-flex">
                        <div>
                          <img
                            src={elmnt.user.image}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="d-flex gap-2 align-items-center">
                            <span
                              style={{ fontSize: "14px" }}
                              className="ms-2 fw-bolder"
                            >
                              {`${elmnt.user?.firstName} ${elmnt.user?.lastName}`}
                            </span>
                            <ReactStars
                              count={5}
                              size={20}
                              edit={false}
                              value={elmnt.rating}
                              isHalf={true}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="ms-2 mb-0">{elmnt.comment}</p>
                        </div>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </div>
            </div>
          </div>
          {/* ----------------------------------------- recommanded products */}
          <div className="list m-auto  container-xxl row my-5">
            <h4 className=" ">Recommended Products</h4>
            <Slider {...settings}>
              {randomProds.map((prod) => (
                // prod._id !== product._id &&
                <div key={prod._id} className="px-2">
                  <Product col={"aa"} product={prod} />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </>
  );
}

function SlickNext(props) {
  const { onClick } = props;

  return (
    <div className="cntrl-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
}
function SlickPrev(props) {
  const { onClick } = props;

  return (
    <div className="cntrl-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
}
