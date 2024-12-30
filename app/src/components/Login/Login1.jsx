import React from 'react'
import './Login1.css'

import ts from "../../Images/tsk.png";

function Login1() {
  return (
    <div className='back_car'>
        <div className='box_content'>
        <img
          className="logo bg-[url(./shut.png)] bg-cover pb-[180px]"
          src={ts}
          alt=""
          style={{ marginLeft: "40px" }}
        />
        <form className="login-form flex flex-col justify-center max-w-full ml-10" action="POST">
          <label className="Email-btn  text-[#4d4c4c] text-[small]" htmlFor="email">
            Email
          </label>
          <input
            required
            className="wn max-w-[80%]"
            placeholder="Your email"
           
          />
          <br />

          <label className="Email-btn" htmlFor="password">
            Password
          </label>
          <input
            required
            className="wn"
            type="password"
            placeholder="*********"
            id="password"
            name="password"
           
          />
          <br />
          <button className="btt text-[white] bg-[#ef6e0b] font-[Bold] transition-all duration-[0.5s] w-6/12 ml-[72px] m-auto px-[30px] py-[12.5px] rounded-[100px] border-0 hover:bg-[#ef6e0b] hover:scale-110 active:bg-[#ef6e0b] active:transition-all active:duration-[0.25s] active:shadow-none active:scale-[0.98]" type="submit" >
            Log In
          </button>
          <br />
          <div className="login-link">
            Don't have an account?{" "}
            <button
             
              className="font-Poppins cursor-pointer text-orange-600 font-bold"
            >
              Register
            </button>
          </div>
          <br />
        </form>
        </div>
    </div>
  )
}

export default Login1