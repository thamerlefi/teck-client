import React from 'react'
import BannerProd from '../components/BannerProd'
// import ProductsList from '../components/ProductsList'
import LatestProd from '../components/LatestProd'
import "../css/home.css"
import FeateredProd from '../components/FeateredProd'
import PopularProd from '../components/PopularProd'
import BestSellers from '../components/BestSellers'
import Feateres from '../components/Feateres'
import HelmetTitle from '../components/HelmetTitle'

export default function Home() {
 
  return (
    <div className='home container-xxl  pt-'>
      <HelmetTitle title="Tech-Shop | Home" />
      <BannerProd />
      <Feateres />
      <LatestProd />
      <FeateredProd />
      <div className='banner my-5'>
        <img src="img/banner1.webp" style={{width:"100%"}} alt="" />
      </div>
      <PopularProd />
      <BestSellers />
    </div>
  )
}
