import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pending } from '../redux/slices/authSlice'
import axios from 'axios'
import { baseURL } from '../baseURL'
import { loadStripe } from '@stripe/stripe-js';
// import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';

export default function ShippingAdress() {
    const dispatch = useDispatch()
    const { cart,total } = useSelector((state) => state.shopCart);
    const { user, isLoading } = useSelector((state) => state.auth);
    // const [adress,setAdress] = useState('')
    // const [country,setCountry] = useState('')
    // const [phone,setPhone] = useState(null)

    const stripePromise = loadStripe('pk_test_51NFN2rHkqYgtAIxARK8suX4CgoCsBlX6MGnOqoRFbRmcbD2QAfqU9UfF8mYH7M3NzUD5KXIOoeXadzmn0VuSYuXS00AJ5X7Ikd');
    

    const checkoutHandler = async(e)=>{
        e.preventDefault()
        try {
          dispatch(pending())

          const {data} = await axios.post(`${baseURL}api/orders/create-checkout`,{
            cart,
            total,
            userId: user.id,
            // shippingAdress: {adress,country,phone}
          },{headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        const sessionId = data.sessionId
        const stripe = await stripePromise;
        localStorage.setItem('sessionId', sessionId)
        localStorage.setItem('userId', user.id)
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.error(result.error);
        }
        console.log(result)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className='row mt-2'>
    </div>
  )
}


