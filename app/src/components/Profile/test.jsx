import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./TopNav.css";
import Wishlist from "../Wishlist/Wishlist";

const TopNav = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    setIsUserLoggedIn(!!userCookie);
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUserIconClick = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleHeartIconClick = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      openPopup();
    } else {
      alert("Please log in to add to wishlist.");
    }
  };

  return (
    <nav className="nav-containerbar">
      <div className="logo1">
        <Link to="/">
          <img
            className="logo11"
            src="https://www.linkpicture.com/q/cars-valley-removebg-preview.png"
            alt="Your Logo"
            onClick={() => navigate("/")}
          />
        </Link>
      </div>
      <div className="headsea">
        <input type="text" placeholder="Search" />
        <button>
          <FiSearch />
        </button>
      </div>
      <div className="right-icons">
        <div
          onClick={handleUserIconClick} // Update the click event handler
          style={{ marginRight: "35px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiUser />
        </div>
        <div
          onMouseEnter={openPopup}
          onClick={handleHeartIconClick}
          style={{ marginRight: "35px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiHeart />
        </div>
        <div
          onClick={() => navigate("/cart")}
          style={{ marginRight: "10px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiShoppingCart />
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup" onMouseLeave={closePopup}>
          <Wishlist />
        </div>
      )}
    </nav>
  );
};

export default TopNav;
