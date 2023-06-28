import axios from "axios";
import { baseURL } from "../../baseURL";
import { toast } from "react-toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// initial state
const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isLoggedIn: false,
    message: "",
    user: null,
    token: localStorage.getItem('token') || null
}

// login async handler
export const login = createAsyncThunk('auth/login', async(user, {rejectWithValue})=>{
    try {
        const res = await axios.post(baseURL +'api/user/login', user)
        localStorage.setItem('token', res.data.token)
        return res.data
    } catch (error) {
        toast(error.response.data.message,{type: "error"})
        return rejectWithValue(error.response.data.message)
    }
})

// register async handler
export const register = createAsyncThunk('auth/register', async(user, {rejectWithValue})=>{
    try {
        const res = await axios.post(baseURL + 'api/user/register', user)
        localStorage.setItem('token', res.data.token)
        toast(`welcome ${res.data.user.lastName} in our website`,  {type: "success"})
        return res.data
    } catch (error) {
        toast(error.response.data.message,{type: "error"})
        return rejectWithValue(error.response.data.message)
    }
})

// get user async handler
export const getUser = createAsyncThunk('auth/getUser', async(_,{rejectWithValue})=>{
    try {
        const res = await axios.get(baseURL + 'api/user/profile', {headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        return res.data
    } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data.message)
    }
})

// update user async handler
export const updateUser = createAsyncThunk('auth/updateUser', async(user, {rejectWithValue})=>{
    try {
        const res = await axios.put(baseURL + 'api/user/update',user, {headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        toast(res.data.message,  {type: "success"})
        return res.data
    } catch (error) {
        toast(error.response.data.message,{type: "error"})
        return rejectWithValue(error.response.data.message)
    }
})



// auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        //---------------- logout reducer
        logout: (state) => {
            localStorage.removeItem('token')
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isLoggedIn = false
            state.token = null
            state.user = null
            state.message = ''
        },
        pending: (state) => {
            return {...state, isLoading: true,isSuccess: false,isError: false,message: ""}
        },
        rejected: (state,action) => {
            return {...state, isLoading: false,isSuccess: false,isError: true,message: action.payload || ''}
        },
        fulfilled: (state,action) => {
            return {...state, isLoading: false,isSuccess: true,isError: false,
                message: action.payload || state.message }
        }
    },
    //---------------------- extra reducers
    extraReducers: (builder) => {
        //------------------- login cases
        builder
        .addCase(login.pending, (state) => { // login pending
            return {...state, isLoading: true, isSuccess: false, isError: false, message:''}
        })
        builder
        .addCase(login.fulfilled, (state, action) => { // login success
            return {...state, 
                isSuccess:true, 
                isLoading: false,
                isError: false,
                isLoggedIn: true,
                message:'',
                user: action.payload.user,
                token: action.payload.token}
        })
        .addCase(login.rejected,(state,action)=>{ // login failed
            return {...state, 
                isError: true, 
                isLoading:false, 
                isSuccess: false, 
                message: action.payload}
        })

        builder
        .addCase(register.pending, (state)=>{
            return {...state, isLoading: true, isSuccess: false, isError: false, message:''}
        })
        .addCase(register.fulfilled, (state,action)=>{
            return {...state, 
                isSuccess:true, 
                isLoading: false,
                isError: false,
                isLoggedIn: true,
                message:'',
                user: action.payload.user,
                token: action.payload.token}
        })
        .addCase(register.rejected, (state,action)=>{
            return {...state, 
                isError: true, 
                isLoading:false, 
                isSuccess: false, 
                message: action.payload}
        })
        //----------------------------- get user cases
        builder
        .addCase(getUser.pending, (state)=>{  // get User pending
            return {...state, isLoading: true, isSuccess: false, isError: false, message:''}
        })
        .addCase(getUser.fulfilled, (state,action) =>{ // get user success
            return {...state, 
                isSuccess:true, 
                isLoading: false,
                isError: false,
                isLoggedIn: true,
                message:'',
                user: action.payload}
        })
        .addCase(getUser.rejected, (state,action)=>{ // get user fail
            return {...state, 
                isError: true, 
                isLoading:false, 
                isSuccess: false, 
                message: action.payload}
        })
        //----------------------------------- update user cases
        builder.addCase(updateUser.pending, (state)=>{
            return {...state, isLoading: true, isSuccess: false, isError: false, message:'' }
        })
        builder.addCase(updateUser.fulfilled, (state,action)=>{
            return {...state, 
                    isSuccess:true, 
                    isLoading: false,
                    isError: false,
                    isLoggedIn: true,
                    message:action.payload.message,
                    user: action.payload.user}
        })
        builder.addCase(updateUser.rejected, (state,action)=>{
            return {...state, 
                    isError: true, 
                    isLoading:false, 
                    isSuccess: false, 
                    message: action.payload}
        })
    }
})

// export actions and reducer
export const {logout, reset,pending,rejected,fulfilled} = authSlice.actions
export default authSlice.reducer;
