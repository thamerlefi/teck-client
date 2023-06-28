import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fulfilled,
  getAllProducts,
  pending,
  rejected,
} from "../redux/slices/productSlice";
import axios from "axios";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteProd } from "../redux/slices/cartSlice";
import { deleteFromWish } from "../redux/slices/wishSlice";
import HelmetTitle from "../components/HelmetTitle";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.shopCart);
  const { wishList } = useSelector((state) => state.wishList);

  //------------- modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //------------ form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  //----------- sortBy state
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    dispatch(
      getAllProducts({ limit: 5, page: 1, sortBy, order, categories: [] })
    );
  }, [sortBy, order]);

  // generate buttons pages
  let PagesButtons = [];
  for (let i = 1; i <= products.products.pages; i++) {
    PagesButtons.push(i);
  }

  // upload image handler
  const uploadImgHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => setImage(reader.result);
    } else {
      setImage("");
    }
  };
  const product = { name, price, description, image, category, stock };

  // add product function
  const addProductHandler = async () => {
    try {
      dispatch(pending());
      const res = await axios.post(baseURL + "api/products/new", product, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      });
      dispatch(fulfilled());
      toast(res.data.message, { type: "success" });
      setShow(false);
      dispatch(getAllProducts({ limit: 5, page: 1, sortBy, order }));
    } catch (error) {
      dispatch(rejected());
      toast(error.response.data.message, { type: "error" });
    }
  };
  // ----------------------------------
  function isSort(sort, ord) {
    if (sortBy === sort && order === ord) return "";
    else return "text-secondary";
  }

  // delete product function
  const deleteProductHandler = async (id) => {
    try {
      dispatch(pending());
      const res = await axios.delete(baseURL + `api/products/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      });
      const prodInCart = cart.find((prod) => prod._id === id);
      if (prodInCart) dispatch(deleteProd(prodInCart));
      const prodInWish = wishList.find((prod) => prod._id === id);
      if (prodInWish) dispatch(deleteFromWish(prodInCart));
      toast(res.data.message, { type: "success" });
      dispatch(getAllProducts({ limit: 5, page: 1, sortBy, order }));
      return res.data;
    } catch (error) {
      dispatch(rejected());
      toast(error.response.data.message, { type: "error" });
    }
  };
  //---------------------------------------------- J-S-X --------------------------//
  return (
    // ------------------ add new product button
    <div className="mt-3 ">
      <HelmetTitle title="Dashboard | Products" />
      <div className=" mb-3">
        <button className="newProd" onClick={handleShow}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="">
        {/* ------------------------- products list */}
        <div className="prod-list mt-2">
          <table className="table table-striped custom-table  ">
            <thead className="bg-light">
              <tr>
                <th scope="col-3" className="position-relative">
                  <span
                    className="cur-point"
                    onClick={() => {
                      setSortBy("name");
                      order === "asc" ? setOrder("desc") : setOrder("asc");
                    }}
                  >
                    Product
                    <i
                      className={
                        "fa-solid fa-arrow-up ms-1 " + isSort("name", "asc")
                      }
                    ></i>
                    <i
                      className={
                        "fa-solid fa-arrow-down " + isSort("name", "desc")
                      }
                    ></i>
                    {products.isLoading ? (
                      <div className="position-absolute" style={{top:"8px", left:"120px"}}>
                        <Spinner size="sm" />
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                </th>
                <th scope="col-3">
                  <span
                    className="cur-point"
                    onClick={() => {
                      setSortBy("price");
                      order === "asc" ? setOrder("desc") : setOrder("asc");
                    }}
                  >
                    Price
                    <i
                      className={
                        "fa-solid  fa-arrow-up ms-1 " + isSort("price", "asc")
                      }
                    ></i>
                    <i
                      className={
                        "fa-solid fa-arrow-down " + isSort("price", "desc")
                      }
                    ></i>
                  </span>
                </th>
                <th scope="col-3">
                  <span
                    className="cur-point"
                    onClick={() => {
                      setSortBy("stock");
                      order === "asc" ? setOrder("desc") : setOrder("asc");
                    }}
                  >
                    In Stock
                    <i
                      className={
                        "fa-solid  fa-arrow-up ms-1 " + isSort("stock", "asc")
                      }
                    ></i>
                    <i
                      className={
                        "fa-solid fa-arrow-down " + isSort("stock", "desc")
                      }
                    ></i>
                  </span>
                </th>
                <th scope="col-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.products.list.map((prod) => (
                <tr key={prod._id}>
                  <td>
                    <div className="d-flex align-items-center ">
                      <img
                        src={prod.image.secure_url}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">
                          {`${prod.name.slice(0, 20)}${
                            prod.name.length > 20 ? "..." : ""
                          }`}
                        </p>
                        <p className="text-muted mb-0">{prod.category}</p>
                      </div>
                    </div>
                  </td>
                  <td>{prod.price} $</td>
                  <td>{prod.stock} </td>
                  <td>
                    <Link
                      onClick={() => deleteProductHandler(prod._id)}
                      className="text-secondary me-4"
                    >
                      <i className="fa-solid fa-trash "></i>
                    </Link>
                    <Link
                      to={`/admin/products/update/${prod._id}`}
                      className="text-secondary"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="section mt-2 d-flex align-items-center justify-content-end pages">
          {PagesButtons.map((page) => (
            <Link
              key={page}
              className={`
                  ${page === products.products.activePage ? "active" : ""} `}
              onClick={() =>
                dispatch(getAllProducts({ limit: 5, page, sortBy, order }))
              }
            >
              {page}
            </Link>
          ))}
        </div>

        {/* ------------------add product MODAL */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="form-control mt-1"
              placeholder="name of product"
            />
            <input
              onChange={(e) => {
                setPrice(+e.target.value);
              }}
              type="number"
              className="form-control mt-1"
              placeholder="price ?"
            />
            <div className="mt-1">
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="form-select"
              >
                <option value="">Choose category</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
                <option value="Camera">Camera</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              type="text"
              className="form-control mt-1"
              placeholder="descrition"
            />
            <input
              type="file"
              accept="image/"
              onChange={uploadImgHandler}
              className="form-control mt-1"
            />
            <input
              onChange={(e) => {
                setStock(+e.target.value);
              }}
              type="number"
              className="form-control mt-1"
              placeholder="count in stock"
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="button" onClick={addProductHandler}>
              {products.isLoading ? <Spinner size="sm" /> : "add"}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
