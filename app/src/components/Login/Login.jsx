import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../../Repeated/font.css";
import "../../Repeated/font2.css";
import Swal from "sweetalert2";
import axios from "../../axios";
import TopNav from "../Topbar/TopNav";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ts from "../../Images/tsk.png";



const Login = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const login = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios.post(
          "/login",
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          const rolee = response.data.role;
          console.log(response.data);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: '<span style="font-family: Poppins; color: #000;">Signed in successfully</span>',
            showCloseButton: true,
          });



          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            text: "Invalid credentials",
            customClass: {
              confirmButton: "swal-button--confirm", // Apply the custom style to the OK button
            },
          });
        }
      } catch (error) {
        console.log(error); // Log the error message to the console
        Swal.fire({
          icon: "error",
          text: "An error occurred, please try again",
          customClass: {
            confirmButton: "swal-button--confirm", // Apply the custom style to the OK button
          },
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter name and password",
        customClass: {
          confirmButton: "swal-button--confirm", // Apply the custom style to the OK button
        },
      });
    }

    // Reset the form
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {/* <TopNav /> */}
      <div className="backcar">
        <br />
        <div className="verbut">
          <button style={{ fontFamily: "Poppins" }}
            className="verifybtt"
            onClick={() => {
              window.open("http://43.205.3.109:8080/verification");
            }}
          >
            Verifier
          </button>
        </div>
        <br />
        <br />

        <div className="boxcont">
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
          <form className="login-form" action="POST">
            <label
              className="Email-btn"
              htmlFor="email"
              style={{ fontFamily: "Poppins", color: "black", fontSize: "15px" }}
            // style={{ marginTop: "5px" }}
            >
              Email
            </label>
            <input
              required
              className="wn" style={{ fontFamily: "Poppins" }}
              // type="email"
              placeholder="Your email"
              // id="email"
              // name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <label
              className="Email-btn"
              htmlFor="password"
              style={{ fontFamily: "Poppins", color: "black", fontSize: "15px" }}
            >
              Password
            </label>

            <input
              required
              className="wn"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="*********"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPasswordVisible ? (
              <AiFillEyeInvisible
                className="viewpassword"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <AiFillEye
                className="viewpassword"
                onClick={togglePasswordVisibility}
              />
            )}
            <br />
            <button className="btt" type="submit" onClick={login}>
              {/* <button
              className="btt"
              type="submit"
              onClick={() => navigate("/sidebar")}
            > */}
              Log In
            </button>
            <br />
            <div style={{ fontFamily: "Poppins" }} className="login-link">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer", fontFamily: "Poppins", color: "#ef6e0b", fontWeight: "bolder" }}
              >
                Register
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
