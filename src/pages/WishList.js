import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import HelmetTitle from "../components/HelmetTitle";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";

export default function WishList() {
  const { wishList } = useSelector((state) => state.wishList);
  const { isLoading } = useSelector((state) => state.auth);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    isLoading ?
    <div
      className="spinner-border loading-store "
      style={{ width: "4rem", height: "4rem", marginTop: "300px" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>:
    <>
      {wishList.length === 0 ? (
        <NotFound msg="Your WishList is Empty" />
      ) : (
        <div className="row container m-auto gap-2">
          <HelmetTitle title="Tech-Shop | WishList" />
          {wishList.map((wish) => (
            <Product
              key={wish._id}
              col={"custom-col"}
              inWish={true}
              product={wish}
            />
          ))}
        </div>
      )}
    </>
  );
}
