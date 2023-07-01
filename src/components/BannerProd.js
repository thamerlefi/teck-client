import React, { useEffect, useState } from "react";
import "../css/bannerProd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";

export default function BannerProd() {
  const [products, setProducts] = useState([]);

  // get 4 lowest selling products for publicize them
  useEffect(() => {
    axios
      .get(
        baseURL +
          `api/products/?limit=${4}&page=${1}&sortBy=${"selling"},${"desc"}`
      )
      .then((res) => setProducts(res.data.pagination.list))
      .catch((err) => toast(err.response.data.message, { type: "error" }));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };

  return (
    <div className="banner-prod row py-2">
      <div className="part mb-4 mb-md-0 ">
        <Slider {...settings}>
          {products.map((prod) => (
            <div className={`prod-slick`} key={prod._id}>
              <div className="p-5 col-8">
                <h1 style={{ color: "#324d67" }}>{prod.name}</h1>
                <p className="my-4 d-none d-md-block description">
                  {prod.description.slice(0, 350)}
                </p>
                <LinkContainer
                  to={`/${prod._id}`}
                  style={{ background: "#f02d34" }}
                >
                  <button className="button text-center">Buy Now</button>
                </LinkContainer>
              </div>
              <div className="col-4 text-end">
                <img
                  src={prod.image.secure_url}
                  alt=""
                  style={{ width: "100%", height: "80%" }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
