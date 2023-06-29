import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Product from './Product';
import axios from 'axios';
import { baseURL } from '../baseURL';
import { toast } from 'react-toastify';


export default function PopularProd() {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    axios.get(baseURL+ `api/products/?limit=${8}&page=${1}&sortBy=${"numOfReviews"},${"asc"}`)
    .then(res=> setProducts(res.data.pagination.list))
    .catch(err => toast(err.response.data.message,{type: "error"}))
  },[])

    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
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
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    }
  return (
    <div className='section-prod mt-5'>
      <div>
        <div className='line'></div>
        <h4 className='text-center'>Our Popular Products</h4>
      </div>
      <div className='list m-auto  container row mt-5'>
      <Slider {...settings} >
        {
            products.map(prod =>(
               <div key={prod._id} className='px-2'>
                   <Product col={"aa"} product={prod}/>
               </div>
                
            ))
        }
        </Slider>
      </div>
    </div>
  )
}
// -------------- slider next and prev buttons
function SlickNext(props){
  const {onClick} = props

  return <div className='cntrl-btn' onClick={onClick}>
    <button className='next'>
      <i className='fa fa-long-arrow-alt-right'></i>
    </button>
  </div>
}
function SlickPrev(props){
  const {onClick} = props

  return <div className='cntrl-btn' onClick={onClick}>
    <button className='prev'>
      <i className='fa fa-long-arrow-alt-left'></i>
    </button>
  </div>
}
