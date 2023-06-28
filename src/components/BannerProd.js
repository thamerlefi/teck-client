import React, { useEffect, useState } from "react";
import "../css/bannerProd.css";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import {LinkContainer} from "react-router-bootstrap"

export default function BannerProd() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(
        baseURL +
          `api/products/?limit=${4}&page=${1}&sortBy=${"numOfReviews"},${"asc"}`
      )
      .then((res) => setProducts(res.data.pagination.list))
      .catch((err) => toast(err.response.data.message, { type: "error" }));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
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
                <h1 style={{color:"#324d67"}}>{prod.name}</h1>
                <p className="my-4 d-none d-md-block description">
                  {prod.description.slice(0, 350)}
                </p>
                <LinkContainer to={`/${prod._id}`} style={{ background: "#f02d34" }}>
                <button className="button text-center" >
                  Buy Now
                </button>
                </LinkContainer>
              </div>
              <div className="col-4 text-end" >
                <img
                  src={prod.image.secure_url}
                  alt=""
                  style={{ width: "100%",height:"80%" }}
                />
              </div>
            </div>
          ))}
          
        </Slider>
      </div>
      {/* <div className="part  col-12 col-md-6 d-flex flex-column justify-content-between gap-4 gap-md-0">
        <div className="row ">
            <div className="col-6">
                <img className="img-fluid rounded-3" src={require('../img/catbanner-01.jpg')} style={{width:"100%"}} alt="" />
            </div>
            <div className="col-6">
            <img className="img-fluid rounded-3" src={require('../img/catbanner-02.jpg')} style={{width:"100%"}} alt="" />
            </div>
        </div>
        <div className="row ">
        <div className="col-6">
                <img className="img-fluid rounded-3" src={require('../img/catbanner-03.jpg')} style={{width:"100%"}} alt="" />
            </div>
            <div className="col-6">
            <img className="img-fluid rounded-3"  src={require('../img/catbanner-04.jpg')} style={{width:"100%"}} alt="" />
            </div>
        </div>
      </div> */}
    </div>
  );
}
