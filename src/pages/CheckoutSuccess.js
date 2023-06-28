import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { baseURL } from '../baseURL'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/slices/cartSlice'
import "../css/checkout-success.css"
import {BsBagCheckFill} from "react-icons/bs"
import CanvasConfetti from '../components/CanvasConfetti'


export default function CheckoutSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector((state) => state.shopCart);


  useEffect(()=>{
    const sessionId = localStorage.getItem('sessionId')
    console.log(sessionId)
    if(sessionId){
      axios.post(`${baseURL}api/orders/create-order`,{
        sessionId,
        cart,
        userId: localStorage.getItem('userId')
      }).then(()=>{
        localStorage.removeItem('sessionId')
        localStorage.removeItem('userId')
        localStorage.removeItem('cart')
        dispatch(clearCart())
        CanvasConfetti()
      }).catch(err=>console.log(err.message))
    }  
    else navigate('/')
    
  },[])
  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order !</h2>
        <p className='check-history'>Check your Profile Order history for the receipt.</p>
        <p className='description'>If you have any question please mail  
          <a href="mailto:order@exemple.com"> contact@support.com</a>
        </p>
        <Link to="/">
          <button className='cnt-shop'>Continue shopping</button>
        </Link>
      </div>
    </div>
  )
}
