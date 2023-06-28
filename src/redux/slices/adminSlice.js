import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../baseURL";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    users: [],
    message: ""
}

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async(_,{rejectWithValue})=>{
    try {
        const res = await axios.get(baseURL + 'api/admin/users', {headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        return res.data.users
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending,(state)=>{
            return {...state, isLoading: true, isSuccess: false, isError: false, message:''}
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            return {...state,isLoading: false, isSuccess: true, isError: false, users: action.payload}
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            return {...state,isLoading: false, isSuccess: false, isError: true, message: action.payload}
        })
    }
})

export default adminSlice.reducer