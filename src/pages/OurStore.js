import React, { useEffect, useState } from "react";
import "../css/ourStore.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { clearCateg, getAllProducts } from "../redux/slices/productSlice";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../baseURL";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { LinkContainer } from "react-router-bootstrap";
import HelmetTitle from "../components/HelmetTitle";
import NotFound from "./NotFound";

export default function OurStore() {
  const [starsKey, setStarsKey] = useState(Math.random());
  const [randomProds, setRandomProds] = useState([]);
  const categ = ["Laptop", "Phone", "Camera", "Accessories"];
  const { products, miniPrice, maxiPrice, isLoading, currCateg } = useSelector(
    (state) => state.products
  );
  const [categories, setCategories] = useState(currCateg ? [currCateg] : []);
  const [maxPrice, setMaxPrice] = useState(maxiPrice);
  const [minPrice, setMinPrice] = useState(miniPrice);
  const [minRating, setMinRating] = useState(null);
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }
  };
  const { prodSearch } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const limit = 8,
      page = 1;
    dispatch(
      getAllProducts({
        limit,
        page,
        search: prodSearch,
        categories,
        minPrice,
        maxPrice,
        minRating,
        sortBy: "createdAt",
        order: "asc",
      })
    );

    axios
      .get(baseURL + "api/products/random/?size=3")
      .then((res) => setRandomProds(res.data.randomProducts))
      .catch((err) => console.log(err));
  }, [prodSearch, categories, minPrice, maxPrice, minRating]);

  const ratingChanged = (newRating) => {
    setMinRating(newRating);
  };
  useEffect(() => {
    setMaxPrice(maxiPrice);
    setMinPrice(miniPrice);
  }, [maxiPrice]);
  // generate buttons pages
  let PagesButtons = [];
  for (let i = 1; i <= products.pages; i++) {
    PagesButtons.push(i);
  }

  return (
    <div className="mt-4 container-xxl">
      <HelmetTitle title="Tech-Shop | Store" />
      <div className="row">
        {/* -------------------------------------------------- filter side */}
        <div className="col-12 col-md-3 d-md-block d-flex  flex-column flex-sm-row  justify-content-between mb-2 mb-md-0">
          {/* ---------------------------- categories */}
          <div className="filter-prod">
            <h3>Shop By Categories</h3>
            <ul>
              {categ.map((elmnt) => (
                <li key={elmnt}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={elmnt}
                      checked={categories.includes(elmnt)}
                      onChange={handleCheckboxChange}
                      id={"flexCheckDefault" + elmnt}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={"flexCheckDefault" + elmnt}
                    >
                      {elmnt}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* ----------------------------- filter by */}
          <div className="filter-prod mt-2 mt-sm-0 mt-md-2">
            <h3>Filter By</h3>
            {/* ---------------------- price */}
            <div className="">
              <h4 className="sub-title mt-3">Price ($)</h4>
              <div className="d-flex align-items-center gap-1 row ">
                <div className="form-floating mb-3 col-4 col-md-5">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={minPrice || 0}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <label htmlFor="floatingInput">From</label>
                </div>

                <div className="form-floating mb-3 col-4 col-md-5">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={maxPrice || 0}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <label htmlFor="floatingInput">To</label>
                </div>
                <div style={{ width: "100%" }}>
                  <RangeSlider
                    min={miniPrice || 0}
                    max={maxiPrice || 0}
                    value={[minPrice || 0, maxPrice || 0]}
                    defaultValue={[minPrice, maxPrice]}
                    onInput={(tr) => {
                      dispatch(clearCateg());
                      setMinPrice(tr[0]);
                      setMaxPrice(tr[1]);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* ---------------------- rating */}
            <div className=" align-items-center ">
              <h4 className="sub-title mt-4">Rating</h4>
              <ReactStars
                key={starsKey}
                count={5}
                onChange={ratingChanged}
                size={28}
                value={minRating}
                isHalf={true}
                activeColor="#ffd700"
              />
            </div>
          </div>
          {/* ----------------------------- random product */}
          <div className="random-products filter-prod mt-2 d-none d-md-block">
            <h3>Random Products</h3>
            {randomProds.map((product) => (
              <div key={product._id}>
                {
                  <LinkContainer className="cur-point" to={`/${product._id}`}>
                    <div className="d-flex pt-1 border-bottom ">
                      <div className="w-25">
                        <img
                          src={product.image.secure_url}
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="w-75 ms-2">
                        <h5 style={{ fontSize: 14 }}>{product.name}</h5>
                        <ReactStars
                          count={5}
                          size={18}
                          value={product.rating}
                          edit={false}
                          isHalf={true}
                          activeColor="#ffd700"
                        />
                        <p>${product.price}</p>
                      </div>
                    </div>
                  </LinkContainer>
                }
              </div>
            ))}
          </div>
        </div>
        {/* -------------------------------------------------- product list side */}
        <div className="col-12 col-md-9">
          {/* ------------ sort  */}
          <div className="filter-sort-grid ">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-wrap align-items-center gap-3">
                {/* <p>SortBy:</p>
                <select
                  className="form-control form-select"
                  style={{ width: "auto" }}
                >
                  <option value="createdAt">Date</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="category">Category</option>
                  <option value="stock">Count in Stock</option>
                </select> */}
                <p>Filter By:</p>
                {categories.map((cat) => (
                  <div className="filter-small" key={cat}>
                    {cat}{" "}
                    <i
                      onClick={() => {
                        setCategories((prev) =>
                          prev.filter((category) => category !== cat)
                        );
                      }}
                      className="fa-solid fa-xmark"
                    ></i>
                  </div>
                ))}
                {minPrice === miniPrice && maxPrice === maxiPrice ? (
                  ""
                ) : (
                  <div>
                    <span className="filter-small">
                      {minPrice}
                      {"-"}
                      {maxPrice}$
                      <i
                        onClick={() => {
                          setMinPrice(miniPrice);
                          setMaxPrice(maxiPrice);
                        }}
                        className="fa-solid fa-xmark"
                      ></i>
                    </span>
                  </div>
                )}
                {minRating && (
                  <div className="filter-small">
                    {"Rating > " + minRating}
                    <i
                      onClick={() => {
                        setMinRating(null);
                        setStarsKey(Math.random());
                      }}
                      className="fa-solid fa-xmark"
                    ></i>
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center gap-2">
                {/* <p className="total-products">6 products</p> */}
                {/* <div className="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-grid"></i>
                        <i class="fa-solid fa-pause"></i>
                        <i class="fa-solid fa-bars"></i>
                    </div> */}
              </div>
            </div>
          </div>
          {/* ------------ prod list */}
          {!isLoading ? (
            products.list.length === 0 ? (
              <NotFound msg="No Product Found" mt="15px" />
            ) : (
              <div
                className="products-list row mt-2 gap-2"
                style={{ width: "100%" }}
              >
                {products.list.map((prod) => (
                  <Product col="custom-col " product={prod} key={prod._id} />
                ))}
              </div>
            )
          ) : (
            <div
              className="spinner-border loading-store "
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div className="filter-sort-grid mt-2 d-flex align-items-center justify-content-center justify-content-sm-between ">
            <p className="d-none d-sm-block p-opacity">
              Showing 8 of {products?.total}
            </p>
            <div className="pages">
              {/* <Link className="me-2 ">{"<"}</Link> */}
              {PagesButtons.map((page) => (
                <Link
                  key={page}
                  className={`me-1 
                  ${page === products.activePage ? "active" : ""} `}
                  onClick={() =>
                    dispatch(
                      getAllProducts({
                        limit: 8,
                        page,
                        sortBy: "createdAt",
                        order: "asc",
                      })
                    )
                  }
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
