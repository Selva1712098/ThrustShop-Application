import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import "./TopNav.css";
import Wishlist from "../Wishlist/Wishlist";
import ts from "../../Images/tsk.png";
import CitySearch from "./CitySearch";
import Marketplace from "../Marketplace/MarketPlace";

const TopNav = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // Add this state
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   const handleBodyClick = (event) => {
  //     if (isMenuOpen && !event.target.closest('.nav-drawer, .hamburger-toggle-button')) {
  //       closeNavDrawer();
  //     }
  //   };

  //   document.body.addEventListener('click', handleBodyClick);

  //   return () => {
  //     document.body.removeEventListener('click', handleBodyClick);
  //   };
  // }, [isMenuOpen]);

  const closeNavDrawer = () => {
    setMenuOpen(false);
  };

  // const toggleTreeview = (treeviewContainer) => {
  //   treeviewContainer.classList.toggle('active');
  //   treeviewContainer.classList.toggle('disabled');
  // };
// console.log("selected location",selectedLocation)
useEffect(() => {

const storedLocation = localStorage.getItem("selectedLocation");

  if (storedLocation) {

    setSelectedLocation(JSON.parse(storedLocation));

  }

}, []);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setModalOpen(false); // Close the modal after selecting a location
    localStorage.setItem("selectedLocation", JSON.stringify(location));
  };
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

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

   return(
   <div>
      <nav className="nav-containerbar">
      <span className={`hamburger-toggle-button ${isMenuOpen ? "active" : "disabled"}`} onClick={handleMenuToggle}>
  <svg className="hamburger-menu-icon" viewBox="0 0 24 24">
    <path d="M2 6h20M2 12h20M2 18h20" stroke="#fff" stroke-width="2" strokeLinecap="round"
      strokeLinejoin="round" />                                     
  </svg>
</span>
    <div className="logo1">
      <Link to="/">
        <img
          className="logo11"
          src={ts}
          alt="Your Logo"
          onClick={() => navigate("/")}
         
        />
      </Link>
      {/* <div className="verbut">
        <button style={{ fontFamily: "Poppins" }}
          className="verifybtt"
          onClick={() => {
            window.open("http://43.205.3.109:8080/verification");
          }}
        >
          Verifier
        </button>
      </div> */}
    </div>
    {/* <div className="headsea">
      <input type="text" placeholder="Search" />
      <button>
        <FiSearch />
      </button>
    </div> */}
  {/* <div className="style-123">
<div className="style-456" onClick={handleModalOpen}>
  {selectedLocation ? (
    <>
      <p className="style-789">{truncateText(selectedLocation[0].formatted_address, 20)}</p>

    </>
  ) : (
    <p className="style-456" style={{marginLeft:'1px'}}>Select location</p>
  )}
  <svg
    className="style-000"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 34"
    data-testid="ExpandMoreIcon"
>
    <path
      d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
      className="style-1234"
    ></path>
  </svg>
</div>  
</div> */}


  
     
    <div className="right-icons">
      <div
        onClick={handleUserIconClick} // Update the click event handler
        style={{ marginRight: "35px", fontSize: "21px", cursor: "pointer" }}
      >
        <FiUser />
      </div>
      <div
        // onMouseEnter={openPopup}
        onClick={handleHeartIconClick}
        style={{ marginRight: "35px", fontSize: "21px", cursor: "pointer" }}
      >
        <FiHeart />
      </div>
      {/* <div
        onClick={() => navigate("/cart")}
        style={{ marginRight: "10px", fontSize: "21px", cursor: "pointer" }}
      >
        <FiShoppingCart />
      </div> */}
    </div>
    
    {isPopupOpen && (
      <div className="popup" onMouseLeave={closePopup}>
        <Wishlist />
      </div>
    )}
{isModalOpen && (
      <CitySearch onClose={handleModalClose} onSelectLocation={handleLocationSelect} />
    )}
           {/* <Marketplace selectedLocation={selectedLocation} /> Pass selectedLocation */}

  </nav>

  
<div className={`nav-drawer ${isMenuOpen ? "active" : " "}`} >
  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
<Link to="/">
        <img
          className="logo12"
          src={ts}
          height="80"
          width="250"
          alt="Your Logo"
          onClick={() => navigate("/")}
        />
      </Link>
  
  <span className="close-button" onClick={closeNavDrawer}>
    
    <svg className="close-button-icon" viewBox="0 0 24 24">
      <path d="M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" /> 
    </svg>
  </span>
  </div>
 <div className="right-icons">
    <ul>
     <li><div
        onClick={handleUserIconClick} // Update the click event handler
        style={{  fontSize: "21px",width:'100%', cursor: "pointer",fontFamily:"Poppins",display:'flex',alignItems:'center',gap:'7px' }}
      >Your account {" "}
        <FiUser />
      </div></li> 
   <li>   <div
        // onMouseEnter={openPopup}
        onClick={handleHeartIconClick}
        style={{ fontSize: "21px",width:'100%', cursor: "pointer",fontFamily:"Poppins",display:'flex',alignItems:'center',gap:'9px'  }}
      >
        Your Wishlist {" "}
        <FiHeart />
      </div></li>
      <br/>
      <li><div className="style-456" onClick={handleModalOpen}>
 
  <svg
    className="style-000"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 34"
    data-testid="ExpandMoreIcon"
>
    <path
      d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
      className="style-1234"
    ></path>
  </svg>
</div>  


</li>
      </ul>
      {/* <div
        onClick={() => navigate("/cart")}
        style={{ marginRight: "10px", fontSize: "21px", cursor: "pointer" }}
      >
        <FiShoppingCart />
      </div> */}
    </div>
    
    {isPopupOpen && (
      <div className="popup" onMouseLeave={closePopup}>
        <Wishlist />
      </div>
    )}
{isModalOpen && (
      <CitySearch onClose={handleModalClose} onSelectLocation={handleLocationSelect} />
    )}
   
 
  
</div>

  
  </div>
 
  
) 
};

export default TopNav;
