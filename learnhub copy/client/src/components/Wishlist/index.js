import React from "react";
import "./wishlist.css";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";
import { BsFillHeartFill } from "react-icons/bs";

export default function Wishlist() {
  const { store, dispatch } = useAuth();

  return (
    <div className="cart">
      {store?.wishList?.length === 0 ? (
        <div className="coursecardsm">
          <p>No items available </p>
        </div>
      ) : null}
      {store?.wishList?.map((item) => {
        return (
          <div key={item._id} className="coursecardsm">
            <div className="coursecardsm__content">
              <div className="coursecardsm__thumbnail">
                <img src={item?.courseImage[0]} alt="courses" />
              </div>
              <div className="coursecardsm__content__details">
                <h2>{item?.title}</h2>
                <p>${item?.price}</p>
              </div>
            </div>
            <div className="coursecardsm__content__btn">
              <Button
                event={() =>
                  dispatch({ type: "deleteWishlistItem", payload: item._id })
                }
                title={<BsFillHeartFill size={18} />}
                type="btn-transparent"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
