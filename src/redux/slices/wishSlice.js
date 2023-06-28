import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
    name: "wishList",
    initialState: {
        wishList: JSON.parse(localStorage.getItem("wishList")) || []
    },
    reducers:{
        addToWish: (state,action)=>{
            const targetProd = state.wishList.find(prod=>prod._id === action.payload._id)
            if(!targetProd){
                state.wishList.push(action.payload)
                localStorage.setItem("wishList", JSON.stringify(state.wishList))
            } else {
                state.wishList = state.wishList.filter(prod=>prod._id !== action.payload._id)
                localStorage.setItem("wishList", JSON.stringify(state.wishList))
            }
            
        },
        deleteFromWish: (state,action)=>{
            state.wishList = state.wishList.filter(prod=>prod._id !== action.payload._id)
            localStorage.setItem("wishList", JSON.stringify(state.wishList))
        },
        clearWishList:(state)=>{
            state.wishList= []
            localStorage.removeItem("wishList")
        }
    }
})

export const {addToWish, deleteFromWish, clearWishList} = wishSlice.actions
export default wishSlice.reducer