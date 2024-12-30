import React from "react";
import { Routes, Route } from "react-router-dom";
// import Topbar from "./components/Topbar/Topbar";
import Login from "./components/Login/Login";
import Load from "./Loader/Load";
import Register from "./components/Login/Register";
import Sellitem from "./components/Sellitem/Sellitem";
import Sidebar from "./components/Sidebar/Sidebar";
import Marketplace from "./components/Marketplace/MarketPlace";
// import Toppick from "./components/Toppicks/Toppick";
import Home from "./components/Homepage/Home";
import Firsttab from "./components/Homepage/Firsttab";
import Viewdetails from "./components/Details/ViewDetails";
import Verify from "./components/Verifier/Verify";
import Verifier from "./components/Verifier/Verifier";
// import TopNav from "./components/Topbar/TopNav";
import Topbar from "./components/Topbar/Topbar";
import Nav from "./components/Topbar/Nav";
// import Cart from "./components/Cart/Shopcart";
import Profile from "./components/Profile/Profile";
import Wishlist from "./components/Wishlist/Wishlist";
import Addproduct from "./components/Sellitem/Addproduct";
import Payment from "./components/Payment/Payment";
import Sellproduct from "./components/Sellitem/Po";
import Location from "./components/Map/Location";
// import SampleFile from "./Loader/SampleFile";
 import Login1 from "./components/Login/Login1";
 import Test from "./components/Test/Test";
// import Verifier from "./components/Verifier/Verifier";



// import { useNavigate, useLocation } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/load" element={<Load />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sellitem" element={<Sellitem />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/market/biketype" element={<Marketplace />} />
        <Route path="/login1" element={<Login1/>}/>

        <Route path="/firsttab" element={<Firsttab />} />
        <Route path="/description/:_id" element={<Viewdetails />} />
        <Route path="/verify/:_id" element={<Verify />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/topnav" element={<Topbar />} />
        <Route path="/head" element={<Nav />} />
        <Route path="/test" element={<Test/>} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/sellproduct" element={<Sellproduct />} />
        {/* <Route path="/Verifier" element={<Verifier />} /> */}
        <Route path="/map" element={<Location />} />
      </Routes>
    </div>
  );
}

export default App;
