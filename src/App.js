import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { getUser } from "./redux/slices/authSlice";
import { Container } from "react-bootstrap";
import Admin from "./pages/Admin";
import UsersList from "./components/UsersList";
import ResetPass from "./pages/ResetPass";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProducts from "./pages/AdminProducts";
import AdminDashboard from "./components/AdminDashboard";
import UpdateProduct from "./components/UpdateProduct";
import GoogleMapLocation from "./pages/GoogleMap";
import ProductDetails from "./pages/ProductDetails";
import { getTotal } from "./redux/slices/cartSlice";
// import ShippingAdress from './components/ShippingAdress';
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AdminOrdersList from "./components/AdminOrdersList";
import AdminOrder from "./components/AdminOrder";
import UserDash from "./pages/UserDash";
import OrderHistory from "./pages/OrderHistory";
import UserOneOrder from "./pages/UserOneOrder";
import OurStore from "./pages/OurStore";
import Footer from "./components/Footer";
import WishList from "./pages/WishList";
import { clearCateg } from "./redux/slices/productSlice";
import About from "./pages/About";
// import { getAllProducts } from './redux/slices/productSlice';

function App() {
  const {isLoading, isLoggedIn, user} = useSelector(state => state.auth)
  const [isAuth, setIsAuth] = useState(true)
  const [isAdmin, setIsAdmin] = useState(true)
  window.addEventListener("scroll", () => {
    const toTop = document.querySelector(".too-top");
    toTop.classList.toggle("d-block", window.scrollY > 60);
  });
  const dispatch = useDispatch();
  const location = useLocation()
  useEffect(()=>{
    if (isLoggedIn || isLoading) setIsAuth(true)
    else if(!isLoggedIn && !isLoading) setIsAuth(false)
    if (user?.isAdmin || isLoading) setIsAdmin(true)
    else if(!user?.isAdmin && !isLoading) setIsAdmin(false)
  },[isLoggedIn,isLoading ,user])
  useEffect(() => {
    dispatch(getUser());
    dispatch(getTotal());
  }, []);
  useEffect(()=>{
    if (location.pathname !== '/store') {
      dispatch(clearCateg());
    }
  },[location])
  return (
    <div className="App position-relative">
      <ToastContainer position="bottom-center" autoClose={5000} />
      <NavBar />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<OurStore />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wish-list" element={<WishList />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment-success" element={<CheckoutSuccess />} />
          <Route path="/location" element={<GoogleMapLocation />} />
          {isAuth && 
          <Route path="/user" element={<UserDash />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id" element={<UserOneOrder />} />
          </Route>}
          { isAdmin &&
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<UsersList />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/update/:id" element={<UpdateProduct />} />
            <Route path="orders" element={<AdminOrdersList />} />
            <Route path="orders/:orderId" element={<AdminOrder />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>}
          <Route path="*" element={<NotFound msg="404 Not Found"/>} />
        </Routes>
      </div>
      <div
        className="too-top "
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <i className="fa-solid me-1 fa-arrow-up ms-1"></i>
      </div>
      <Footer />
    </div>
  );
}

export default App;
