import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Product from "../components/Product";
import axios from 'axios';
import { baseURL } from '../baseURL';
import { toast } from 'react-toastify';

export default function LatestProd() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
      axios.get(baseURL+ `api/products/?limit=${8}&page=${1}&sortBy=${"createdAt"},${"asc"}`)
      .then(res=> setProducts(res.data.pagination.list))
      .catch(err => toast(err.response.data.message,{type: "error"}))
    },[])
  return (
        // ----------------------- latest prod
    <div className='section-prod mt-5'>
      <div>
        <div className='line'></div>
        <h4 className='text-center'> Latest Products</h4>
      </div>
      <div className='list m-auto gap-2 container row mt-5'>
        {
            products.map(prod =>(
                
                    <Product key={prod._id} col={"custom-col"} product={prod}/>
                
            ))
        }
      </div>
    </div>
  )
}
// api/products/?limit=${limit}&page=${page}&sortBy=${sortBy},${order}