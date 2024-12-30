import React, { useState } from "react";
import "./Collection.css";
import { useNavigate } from "react-router-dom";
import redi from "./redi.png";
import bolts from "./bolts.png";
import quality from "./quality.png";
import badge from "./badge.png";
import high from "./high.png";
// import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
function Collection() {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [selectedBikeType, setSelectedBikeType] = useState(null);
  //const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const navigate = useNavigate();
  const handleHover = (index, bikeType) => {
    setFocusedIndex(index);
  };
  const handleImageClick = (bikeType) => {
    setSelectedBikeType(bikeType);
    navigate(`/market?bikeType=${encodeURIComponent(bikeType)}`);
  };

  const handleSellButtonClick = () => {
    navigate("/addproduct");
  };

  return (
    <div className="top-picks-section">
      <h2
        style={{ fontFamily: "Poppins", fontWeight: "bold", color: "#ef6e0b" }}
      >
        COLLECTIONS
      </h2>
      <div className="Collectionpicks">
        <div className="grid-container">
          <div
            className={`card-1 large-card ${
              focusedIndex === 0 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleImageClick("PULSAR")}
          >
            <img
              className="imglargecard"
              src="https://images.carandbike.com/bike-images/big/bajaj/pulsar-125/bajaj-pulsar-125.jpg?v=12"
              alt="SareeCol1"
            />
            <h3 className="Sarecol">PULSAR</h3>
          </div>
          <div
            className={`card-1 small-card ${
              focusedIndex === 1 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleImageClick("DUKE")}
          >
            <img
              className="imgsmallcard"
              src="https://wallpapersmug.com/download/1024x768/e3b4c8/ktm-bike.jpg"
              alt="SareeCol1"
            />
            <h3 className="Sarecol">DUKE</h3>
          </div>
        </div>
        <br />
        <div className="grid-container1">
          <div
            className={`card-1 small-card1 ${
              focusedIndex === 2 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleImageClick("NINJA")}
          >
            <img
              className="imgsmallcard"
              src="https://i.pinimg.com/originals/5f/27/c4/5f27c4765ac645879e435780daf035a4.jpg"
              alt="SareeCol1"
            />
            <h3 className="Sarecol">NINJA</h3>
          </div>
          <div
            className={`card-1 small-card2 ${
              focusedIndex === 3 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleImageClick("Royal Enfield")}
          >
            <img
              className="imgsmallcard"
              src="https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/News/RE-4.jpg&c=0"
              alt="SareeCol1"
            />
            <h3 className="Sarecol">Royal Enfield</h3>
          </div>
          <div
            className={`card-1 medium-card1 ${
              focusedIndex === 4 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(4)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleImageClick("Activa")}
          >
            <img
              className="imgsmallcard"
              src="https://i.pinimg.com/736x/ec/e6/b2/ece6b278f82f444cf80c573f1da3d5ab.jpg"
              alt="SareeCol1"
            />
            <h3 className="Sarecol">Activa</h3>
          </div>
        </div>
      </div>
      <br />
      <br />

      <button
        className="viewallbut"
        onClick={() => {
          navigate("/market");
          console.log("button clicked");
        }}
        style={{ fontFamily: "Poppins" }}
      >
        VIEW ALL
        {/* <p onClick={() => {navigate("/market");console.log('button clicked')}}>VIEW ALL</p>{" "} */}
        <svg
          stroke-width="4"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>

      <div className=" want-to-section">
        
          <img
            alt="sell_image"
            src={redi}
            width="700"
            height="600"
            decoding="async"
            data-nimg="1"
           
          />
       
        <div >
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "25px",
              fontWeight: "bolder",
              textAlign:'center',
              marginLeft:'8px'
            }}
            styleclass="8"
          >
            Want to sell your bike?
          </p>
          {/* <p class="9">Let us know about your bike</p> */}
            <div className="icon-section">
          <img
            alt="payment"
            src={quality}
            width="60"
            height="60"
            decoding="async"
            data-nimg="1"
            loading="lazy" 
          />
          <p
            style={{ fontFamily: "Poppins" }}
           
          >
            Verified 
            Bikes
          </p>

          <img
            alt="payment"
            src={bolts}
            width="60"
            height="60"
            decoding="async"
            data-nimg="1"
            loading="lazy"
          />
          <p style={{ fontFamily: "Poppins" }} class="style-19">
            Sell 
            Fast
          </p>

          <img
            alt="payment"
            src={high}
            width="60"
            height="60"
            decoding="async"
            data-nimg="1"
            loading="lazy"
           
          />
          <p style={{ fontFamily: "Poppins" }} >
           
            High
            Quality
          </p>
          </div>
          <button
            style={{ fontFamily: "Poppins", fontWeight: "bold" }}
            className="btn14"
            type="button"
            onClick={handleSellButtonClick}
          >
            Sell Bike
          </button>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Collection;
