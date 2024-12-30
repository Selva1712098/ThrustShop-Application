import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import { AiOutlineEnvironment, AiOutlineHeart } from "react-icons/ai";
import qr from "./qr.png";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import axios from "../../axios";
import QRCode from "qrcode.react";
import Bike from "./motorbike.png";
import TopNav from "../Topbar/TopNav";
// import GooglePayButton from "@google-pay/button-react";
import Bikedetails from "./Bikedetails";
// import Tooltip from "react-tooltip";

const Viewdetails = () => {
  const navigate = useNavigate();

  const [daata, setDaata] = useState([]);
  const [isAddedtocart, setAddtoCart] = useState({});
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [verifyStatus, setVerifyStatus] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [showQRCodeDetails, setShowQRCodeDetails] = useState(false);

  const [isWishListed, setWishList] = useState(false);
  const [isContactPopupOpen, setContactPopupOpen] = useState(false);

  const handleContactPopupOpen = () => {
    setContactPopupOpen(true);
  };

  const handleContactPopupClose = () => {
    setContactPopupOpen(false);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const addd = () => {
    console.log(daata);
  };
  const { _id } = useParams();
  const stringId = String(_id);

  console.log(_id, "asadaasdasd");
  const addtowish = async () => {
    try {
      console.log(stringId);
      const response = await axios.get(`/wishlist/${stringId}`);
      console.log(response.data.wishlist);
      setWishList(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    // Check if the cookie is present
    try {
      const tokenn = jwt_decode(cookies.user_token);

      if (tokenn.role === "Customer") {
        try {
          console.log(_id);
          const response = await axios.get(`/addtocart/${_id}`);
          console.log(response.data.cart);

          setAddtoCart(response.data.cart);
          navigate("/cart");
        } catch (error) {
          console.error(error);
        }
      }
    } catch {
      // Display SweetAlert2 popup and navigate to "/login" page after 4 seconds
      Swal.fire({
        title: "Please Login",
        text: "You need to login to buy ",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
        setVerifyStatus(response.data.user.verifyStatus);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleQRCodeClick = () => {
    setShowQRCodeDetails(true);
    const qrValue = `http://43.205.3.109:8080/trace/${_id}`; // Replace with your trace page URL
    window.open(qrValue, "_blank");
  };

  const handleCloseQRCodeDetails = () => {
    setShowQRCodeDetails(false);
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const generateQRCode = () => {
    if (daata.verifyStatus === "verified") {
      const qrValue = `http://43.205.3.109:8080/trace/${_id}`; // Replace with your trace page URL
      return (
        <QRCode
          value={qrValue}
          onClick={handleQRCodeClick}
          style={{ cursor: "pointer", backgroundColor: "black" }}
          fgColor="black"
        />
      );
    }
    return null;
  };

  // const qrCodeValue = "QR code value";
  // const verifyStatus = "verified";

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
      <TopNav />

      <div className="attai">
        {/* <div> */}
        <img
          className="monster"
          src={daata.imageUrl}
          // src={"https://source.unsplash.com/1600x900/?motorbike,"+car.brand}
          // src={daata.img}
          alt=""
          height="400"
          width="500"
        />
        {/* </div> */}
      
        <div className="detailsbox">
          <h4 className="tncs" style={{ marginLeft: "20px " }}>
            {daata.brand}
           <span style={{marginLeft:'10px'}}>
            {daata.model}</span>
          </h4>
          {/* <div className="linedark" style={{width:'200px',height:'1px',backgroundColor:'black'}}></div> */}
          <hr className="line" />

          <div className="factory" style={{ marginLeft: "20px " }}>
            <p>
              {daata.km} km
              <span style={{marginLeft:'10px'}}>{daata.fueltype}</span> 
              <span style={{marginLeft:'10px'}}> {daata.transmission}</span>
             
            </p>
          </div>
          <hr className="line" />

          <div className="idam">
            <div className="land">
              <AiOutlineEnvironment
                className="signified"
                style={{ marginLeft: "18px ",marginRight:'4px' }}
              />
              <p>{daata.address}</p>
            </div>
            <hr className="line1" />

            <p className="kaasu" style={{ textAlign:'left',marginLeft:'20px' }}>
              &#8377;<span style={{marginLeft:'10px'}}>{daata.price}</span>
            </p>
          </div>
          
             
          
         
        </div>
       
       
        <div className="qrcontainer" >
<p className="toomuch" style={{ backgroundColor: "#ef6b0b", color: "white",  }}>Scan the QR:</p>
<div

className="pathukaapu animate-gradient"

onClick={verifyStatus === "verified" ? () => console.log(qrCodeValue) : null}

>

{verifyStatus === "verified" ? generateQRCode() : "Not yet verified"}




</div>


</div>

      </div>
      <div className="diffBB">
            {!isWishListed ? (
              <button className="valthukal" onClick={addtowish}>
                <AiOutlineHeart />
                <span style={{marginLeft:'10px'}}>
                ADD TO WISHLIST</span>
              </button>
            ) : (
              <button
                className="valthukal"
                
                disabled
              >
               <span style={{marginLeft:'10px'}}>
                ADDED TO WISHLIST</span>
              </button>
            )}

            <button className="purchase" onClick={handleContactPopupOpen}>
              CONTACT OWNER
            </button>
            {isContactPopupOpen && (
              <div className="contactowner-popup">
                <div className="popupowner-content">
                  <h2
                    style={{
                      fontSize: "20px",
                      margin: "auto",
                     
                      color: "black",
                     
                    }}
                  >
                    {" "}
                    <i
                      style={{ color: "#ef6e0b" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>{" "}
                    OWNER DETAILS
                  </h2>

                  <hr
                    style={{
                      background: "#ef6e0b",
                      color: "#ef6e0b",
                      borderColor: "#ef6e0b",
                      height: "1px",
                    }}
                  />
                  <br />
                  <label style={{ color: "black" }}>
                    <i
                      style={{ color: "#ef6e0b" }}
                      class="fa fa-user"
                      aria-hidden="true"
                    ></i>{" "}
                    Owner Name : {daata.ownername}
                  </label>
                  <br />

                  <label style={{ color: "black"}}>
                    <i
                      style={{ color: "#ef6e0b" }}
                      class="fa fa-phone"
                      aria-hidden="true"
                    ></i>{" "}
                    Phone Number : {daata.ownernumber}
                  </label>
                  <br />
                  <br />
                  <button
                    className="ownerclosebut"
                    onClick={handleContactPopupClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
      <div className="grid1">
        <Bikedetails />
       <div className="card">
          <div class="card-info">
            <div class="card-avatar">
              <img src={Bike} width="200px" height="200px" />
            </div>
            <div class="card-title">More bikes</div>
            <div class="card-subtitle">view related bikes</div>
          </div>
          <div class="card-button">
            <button
              className="btn13"
              type="button"
              onClick={() =>
                navigate(`/market?bikeType=${encodeURIComponent(daata.brand)}`)
              }
            >
              Show More
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </button>{" "}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
