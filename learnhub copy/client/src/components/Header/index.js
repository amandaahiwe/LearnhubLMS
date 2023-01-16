import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./header.css";
import { BiUserCircle } from "react-icons/bi";
import { BsCart, BsHeart } from "react-icons/bs";
import Cart from "../Cart";
import Wishlist from "../Wishlist";

export default function Header() {
  const { authData, store } = useAuth();

  const [cartVisible, setCartVisible] = useState(false);
  const [wishlistVisible, setWishlistVisible] = useState(false);

  const navigate = useNavigate();
  // console.log("as", authData);

  return (
    <header>
      <div className="max-width">
        <div className="row">
          <div>
            <h1 className="site__title">
              <span>Learn</span>
              <span>Hub.</span>
            </h1>
          </div>
          <nav>
            {/* {!authData ? ( */}
            <>
              <div>
                <Button
                  title="Login"
                  type="btn-transparent"
                  event={() => navigate("/login")}
                />
              </div>
              <div>
                <Button
                  title="Signup"
                  type="btn-purple"
                  event={() => navigate("/")}
                />
              </div>
            </>
            {/* //) : ( */}
            <div className="header__profile">
              <div
                onClick={() => setCartVisible(!cartVisible)}
                className="cart__icon"
              >
                <BsCart size={24} />
                <div className="badge">
                  <p>{store?.cart?.length || 0}</p>
                </div>
              </div>
              <div
                onClick={() => setWishlistVisible(!wishlistVisible)}
                className="cart__icon"
              >
                <BsHeart size={24} />
                {/* <div className="badge">
                    <p>{store?.wishList?.length || 0}</p>
                  </div> */}
              </div>
              <BiUserCircle size={24} />
              {cartVisible ? <Cart /> : null}
              {wishlistVisible ? <Wishlist /> : null}
            </div>
            {/* )} */}
          </nav>
        </div>
      </div>
    </header>
  );
}
