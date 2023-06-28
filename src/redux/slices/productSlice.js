import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { toast } from "react-toastify";

const initialState = {
  products: {
    list: [],
    pages: 1,
    activePage: 1,
  },
  currCateg: "",
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  prodSearch: "",
  product: {},
  miniPrice: 0,
  maxiPrice:0
};

// ------- get all products
export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (data, { rejectWithValue }) => {
    const {
      limit,
      page,
      sortBy,
      order,
      minPrice,
      maxPrice,
      minRating,
      search,
      categories,
    } = data;
    let category;
    if (categories) category = categories.join(",");
    const link = `api/products/?limit=${limit}&page=${page}&sortBy=${sortBy},${order}\
    ${minPrice ? "&minPrice=" + minPrice : ""}${
      maxPrice ? "&maxPrice=" + maxPrice : ""
    }\
    ${minRating ? "&minRating=" + minRating : ""}${
      category ? "&categories=" + category : ""
    }${search ? "&search=" + search : ""}`;
    try {
      const res = await axios.get(baseURL + link);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ------- get one product
export const getOneProduct = createAsyncThunk(
  "product/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}api/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//---------- update product
export const updateOneProduct = createAsyncThunk(
  "product/updateOne",
  async (updated, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${baseURL}api/products/${updated.id}`,
        updated.updatedProduct,
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      );
      toast(res.data.message, { type: "success" });
      return res.data;
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    pending: (state) => {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: "",
      };
    },
    rejected: (state) => {
      return { ...state, isLoading: false, isSuccess: false, isError: true };
    },
    fulfilled: (state) => {
      return { ...state, isLoading: false, isSuccess: true, isError: false };
    },
    getProdSearch: (state, action) => {
      return { ...state, prodSearch: action.payload };
    },
    clearProdSearch: (state) => {
      return { ...state, prodSearch: "" };
    },
    editCateg: (state,action)=>{
      return {...state, currCateg: action.payload}
    },
    clearCateg: (state)=>{
      return {...state, currCateg: ""}
    }
  },
  extraReducers: (builder) => {
    builder //-----------------get all products cases
      .addCase(getAllProducts.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isSuccess: false,
          isError: false,
          message: "",
        };
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          isError: false,
          products: action.payload.pagination,
          categories: action.payload.categories,
          miniPrice: action.payload.minPrice,
          maxiPrice: action.payload.maxPrice,
        };
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          isError: true,
          message: action.payload,
        };
      })
      //------------------------ get one product cases
      .addCase(getOneProduct.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isSuccess: false,
          isError: false,
          message: "",
        };
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          isError: false,
          product: action.payload,
        };
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          isError: true,
          message: action.payload,
        };
      })
      //--------------------------- update one product cases
      .addCase(updateOneProduct.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isSuccess: false,
          isError: false,
          message: "",
        };
      })
      .addCase(updateOneProduct.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          isError: false,
          message: action.payload.message,
        };
      })
      .addCase(updateOneProduct.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          isError: true,
          message: action.payload,
        };
      });
  },
});

export const { pending, fulfilled, rejected, getProdSearch, clearProdSearch,editCateg,clearCateg } =
  productSlice.actions;
export default productSlice.reducer;
