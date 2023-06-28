import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "shopCart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        total:0
    },
    reducers: {
        addProduct: (state,action)=>{
            const targetProd = state.cart.find(prod=>prod._id === action.payload._id)
            if(targetProd){
                 state.cart.map(prod=>{
                     if(prod._id === targetProd._id) {
                        if (targetProd.stock===0) {
                            toast(`Sorry, this product is out of stock !!` ,{type: "error"})
                        }
                     else {
                         prod.count += 1 
                         prod.subTotal = prod.price * prod.count
                     }
                    }    
                })
            } else {
                if (action.payload.stock===0) {
                    toast(`Sorry, this product is out of stock !!` ,{type: "error"})
                } else {
                    const newProd = {...action.payload,count: 1, subTotal: action.payload.price}
                    state.cart.push(newProd)
                }
            }
            state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        incCount: (state,action)=>{
            state.cart.map(prod=>{
                if(prod._id === action.payload._id) {
                    if(prod.count < prod.stock ){
                        prod.count += 1 
                        prod.subTotal = prod.price * prod.count
                    } else  toast(`sorry, we only have ${prod.stock} pieces left` ,{type: "error"})
               }    
           })
           state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
           localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        decCount: (state,action)=>{
            state.cart.map(prod=>{
                if(prod._id === action.payload._id && prod.count > 1) {
                   prod.count -= 1 
                   prod.subTotal = prod.price * prod.count
               } else if(prod._id === action.payload._id && prod.count === 1){
                state.cart = state.cart.filter(prod=>prod._id !== action.payload._id)
                state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
                localStorage.setItem("cart", JSON.stringify(state.cart))
               }
           })
           state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
           localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        updateQuantity: (state, action) =>{
            state.cart.map(prod=>{
                if(prod._id === action.payload._id && action.payload.quantity > 0) {
                   prod.count = action.payload.quantity 
                   prod.subTotal = prod.price * prod.count
               } else if(prod._id === action.payload._id && action.payload.quantity === 0){
                state.cart = state.cart.filter(prod=>prod._id !== action.payload._id)
                state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
                localStorage.setItem("cart", JSON.stringify(state.cart))
               }
           })
           state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
           localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        deleteProd: (state,action)=>{
            state.cart = state.cart.filter(prod=>prod._id !== action.payload._id)
            state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        getTotal: (state)=>{
            state.total = state.cart.reduce((acc,item)=> acc + item.subTotal, 0 )
        },
        clearCart: (state)=>{
            state.cart = []
            state.total= 0
            localStorage.removeItem('cart')
        }
    }
})

export const {addProduct, incCount, decCount, deleteProd, clearCart, updateQuantity,getTotal} = cartSlice.actions
export default cartSlice.reducer