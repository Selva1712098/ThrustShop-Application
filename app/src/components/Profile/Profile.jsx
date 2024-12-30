import React, { useState, useEffect } from "react";
import { FaEdit, FaPhone, FaEnvelope } from "react-icons/fa";
import "./Profile.css";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import print from "../../Images/print.jpg";


function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const [decodedToken, setDecodedToken] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    // Check if the "user_token" cookie exists
    if (cookies.user_token) {
      // Decode the token and store it in the state
      const decoded = jwtDecode(cookies.user_token);
      setDecodedToken(decoded);
    }
  }, [cookies]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Perform save logic or API request here
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const logout = () => {
    removeCookie("user_token");
    navigate("/", { replace: true });
  };

  return (
    <div className="Profilediv">
      <h1 style={{ textAlign: "center", marginBottom: "-20px", fontFamily: "Poppins", fontSize: "20px", fontWeight: "bolder" }}>User Profile</h1>
      <div className="Profilediv1">
        <div className="LeftSection">
          <div className="CenterContent">
            <div className="profile-img">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                  alt=""
                />
              )}
              <div
                className="file btn btn-lg btn-primary"
                style={{
                  marginLeft: "0px",
                  width: "130px",
                  height: "25px",
                  color: "white",
                  fontFamily: "Poppins",
                }}
              >
                Change Photo
                <input type="file" name="file" onChange={handleImageChange} />
              </div>
              <br />
            </div>
            <div className="name-field">
              <h4 style={{ fontFamily: "Poppins" }} className="profile-name">
                {decodedToken?.name}
              </h4>
              <h4 style={{ fontFamily: "Poppins" }} className="profile-role">
                {decodedToken?.role}
              </h4>
            </div>
          </div>
        </div>
        <div className="RightSection">
          <div className="profile-f1">
            <h4 style={{ fontFamily: "Poppins" }}>
              <i style={{color:"#ef6e0b"}} className="fa fa-info-circle" aria-hidden="true" /> Information
            </h4>
          </div>
          <hr className="line" />
          <div className="info-container">
            <div className="info-item">
              <h5 style={{ marginLeft: "-75px", fontFamily: "Poppins",}}>Email</h5>
              {isEditMode ? (
                <input style
                  type="text"
                  className="email-input"
                  value={email}
                  onChange={handleEmailChange}
                />
              ) : (
                <div className="envelope-icon-container">
                  <FaEnvelope style={{ marginRight: "14px",position:"relative", left:"14px",top:"-3px",color:"#ef6e0b" }} className="envelope-icon" />
                  <span style={{ position:"relative",left:"14px", top:"-5px",fontFamily:"Poppins" }} className="envelope">
                    {decodedToken?.email}
                  </span>
                </div>
              )}
            </div>
            <div className="info-item">
              <h5 style={{ marginLeft: "-15px", fontFamily: "Poppins" }}>Mobile Number</h5>
              {isEditMode ? (
                <input
                  type="text"
                  className="mobile-input"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
              ) : (
                <div className="phone-icon-container">
                  <FaPhone style={{ marginRight: "8px",color:"#ef6e0b" }} className="phone-icon" />
                  <span style={{ marginRight: "10px",fontFamily:"Poppins"}} className="phone-number">
                    {decodedToken?.phoneNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="edit-bbutton">
            {isEditMode ? (
              <button style={{ fontFamily: "Poppins" }} className="save-button" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <FaEdit className="edit-icon" onClick={handleEditClick} />
            )}
          </div>
          <div className="logoutt-button-container">
            <button style={{ fontFamily: "Poppins" }} className="logoutt-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
