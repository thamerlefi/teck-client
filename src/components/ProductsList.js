import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'

export default function ProductsList() {


  const dispatch = useDispatch()
  useEffect(()=>{
    const limit = 10, page=1
    dispatch(getAllProducts({limit,page}))
  },[])

  const {products} = useSelector(state=>state.products)
  

  return (
    <div className='mt-3 row gap-2 container-xxl'>
      {products.list.map(product => <Product key={product._id} product={product} />)}
    </div>
  )
}
