import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProduct, updateOneProduct } from "../redux/slices/productSlice";
import Spinner from "./Spinner";

export default function UpdateProduct() {
  const { product } = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOneProduct(id));
  }, []);
  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setStock(product.stock);
  }, [product]);

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
  const updatedProduct = { name, price, category, description, stock, image };
  const updateHandler = () => {
    dispatch(updateOneProduct({ id, updatedProduct }));
  };

  return (
    <div className=" row cus-section">
      <div className="col-12 col-md-8 order-2 order-md-1">
        <div className="input-group mt-1">
        <span className="input-group-text">Name</span>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          className="form-control "
          placeholder="name of product"
        />
        </div>
        <div className="input-group mt-1">
        <span className="input-group-text">Price</span>
        <input
          value={price}
          onChange={(e) => {
            setPrice(+e.target.value);
          }}
          type="number"
          className="form-control"
          placeholder="price ?"
        />
        <span className="input-group-text">$</span>
        </div>
        <div className="input-group mt-1">
        <span className="input-group-text">Description</span>
          <select
            value={category}
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
      
        <div className="input-group mt-1">
          {/* <span className="input-group-text">Description</span> */}
          <textarea
            value={description}
            className="form-control "
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <input
          type="file"
          value={""}
          onChange={uploadImgHandler}
          accept="image/"
          className="form-control mt-1"
        />
        <div className="input-group mt-1">
        <span className="input-group-text">in Stock</span>
        <input
          value={stock}
          onChange={(e) => {
            setStock(+e.target.value);
          }}
          type="number"
          className="form-control "
          placeholder="count in stock"
        />
        </div>
        <button onClick={updateHandler} className="button  mt-2">
          {isLoading ? <Spinner size="sm"/> : "update"}
        </button>
      </div>
      <div className="col-12 mb-2 col-md-4 order-1 text-center order-md-2">
        {product.image && (
          <img src={!image ? product.image.secure_url : image} style={{width:"100%"}} alt="" />
        )}
      </div>
    </div>
  );
}
