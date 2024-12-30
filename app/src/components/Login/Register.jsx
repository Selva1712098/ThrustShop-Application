import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import "../../Repeated/font.css";
import "../../Repeated/font2.css";
import Swal from "sweetalert2";
import axios from "../../axios";
import ts from "../../Images/tsk.png";

const Register = () => {
  const history = useNavigate();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 
  // const [loading, setLoading] = useState("")
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/register`, {
        name,
        email,
        password,
        phoneNumber,
       
      });
      console.log("hiighji");
      console.log(response.data);

      if (response.data.message === "success") {
        Toast.fire({
          title: "User Registered",
          icon: "success",
          confirmButtonText: "OK",
          cancelButtonText: "Close",
          showCancelButton: true,
          showCloseButton: true,
          didOpen: () => {
            // Set font family for the toast
            const toastPopup = document.querySelector('.swal2-popup');
            if (toastPopup) {
              toastPopup.style.fontFamily = 'Poppins';
            }
      
            // Set font family for the content within the toast
            const toastContent = document.querySelector('.swal2-content');
            if (toastContent) {
              toastContent.style.fontFamily = 'Poppins';
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
      

      // setname("");
      // setEmail("");
      // setPassword("");
      // setPhoneNumber("");
      // setRole("");
    } catch (error) {
      Swal.fire({
        text: "Please add the details correctly",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: 'orange',
        customClass: {
          popup: 'swal-popup', // Apply the custom style to the entire Swal popup
          text: 'swal-text', // Apply the custom style to the Swal text
          cancelButton: 'swal-button--cancel', // Apply the custom style to the close button (cancel button)
        },
      });
      console.log(error);
    }
  };

  const verifyclick = () => {
    window.open("http://43.205.3.109:8080/verification", "_blank");
  };

  return (
    <div className="backcar1">
      <div >
        <br />
        <br />
        <div className="verbut">
          <button style={{fontFamily:"Poppins"}}className="verifybtt" onClick={verifyclick}>
            Verifier
          </button>
        </div>
        <br />
        <div className="boxcont1">
          <br />
          <div className="closeicon" onClick={() => navigate("/")}>
            &times;
          </div>
          <img
            className="logo"
            src={ts}
            alt=""
            style={{ marginLeft: "40px" }}
          />
          <form
            className="login-form"
            action="POST"
            style={{ marginBottom: "20px" }}
          >
            <label
              className="Email-btn"
              htmlFor="name"
              style={{ fontFamily: "Poppins",color:"black",fontSize:"15px" }}
            >
              Name
            </label>
            <input
              required
              className="wn"
              type="text"
              placeholder="Your name"
              id="name"
              name="name"
              style={{ fontFamily: "Helvetica Now" }}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            <label
              className="Email-btn"
              htmlFor="phone"
              style={{  fontFamily: "Poppins",color:"black",fontSize:"15px"}}
            >
              Phone Number
            </label>
            <input
              required
              className="wn"
              type="tel"
              placeholder="Your phone number"
              id="phone"
              name="phone"
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              style={{ fontFamily: "Helvetica Now" }}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <label
              className="Email-btn"
              htmlFor="email"
              style={{ fontFamily: "Poppins",color:"black",fontSize:"15px" }}
            >
              Email
            </label>
            <input
              required
              className="wn"
              type="email"
              placeholder="Your email"
              id="email"
              name="email"
              style={{ fontFamily: "Helvetica Now" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label
              className="Email-btn"
              htmlFor="password"
              style={{ fontFamily: "Poppins",color:"black",fontSize:"15px" }}
            >
              Password
            </label>
            <input
              required
              className="wn"
              type="password"
              placeholder="*********"
              id="password"
              name="password"
              style={{ fontFamily: "Helvetica Now" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            
            <br />

            <button 
              className="btt"
              type="submit"
              style={{  fontFamily: "Poppins",color:"black",fontSize:"15px" }}
              onClick={register}
            >
              Register
            </button>

            <br />
            <div className="login-link" style={{fontFamily:"Poppins"}}>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer",fontFamily:"Poppins",color:"#ef6e0b",fontWeight:"bolder" }}
              >
                Login
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
      {/* <div className="copy" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Cars Valley
      </div> */}
    </div>
  );
};

export default Register;
