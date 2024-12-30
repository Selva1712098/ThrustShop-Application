import React, { useState, useEffect } from "react";
import "./Sidebar.scss";

import { useNavigate } from "react-router";

import TopNav from "../Topbar/TopNav";
// import Footer from "../Footer/Footer";
import jwtDecode from "jwt-decode";
import axios from "../../axios.js";
import { useCookies } from "react-cookie";
// import "bourbon/bourbon";

function Sidebar() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const token = jwtDecode(cookies.user_token);
  const [daata, setDaata] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Product");
  const navigate = useNavigate();
  //  const descript = (id) => {
  //    navigate(`/sellerdescription/${id}`);
  //  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        console.log(response.data.cars);
        setDaata(response.data.cars);
        response.data.cars.forEach((car) => {
          console.log(car.name);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedMenu === "Collection") {
      fetchData();
    }
  }, [selectedMenu]);

  const logout = () => {
    removeCookie("user_token");

    navigate("/", { replace: true });
  };

  return (
    <div>
      <TopNav />
      <div className="kannadi">
        <div
          className="sidebar-container"
          style={{
            width: "21%",
            height: "50vh",
          }}
        >
          <div className="app">
            <aside className="sidebar">
              {/* <header></header> */}
              <nav className="sidebar-nav">
                <h4 className="Dashhead">Dashboard</h4>
                <br />
                <br />
                <ul style={{position:"relative", bottom:"30px"}}>
                  {/* <li> */}
                    {/* <a href="#" onClick={() => handleMenuClick("Orders")}> */}
                      {/* <span style={{ fontSize: '18px', }}>Orders</span> */}
                    {/* </a> */}
                  {/* </li> */}
                  <li>
  <a href="#" onClick={() => handleMenuClick("Product")}>
  <span
  className="helfiger"
  style={{
    fontSize: '18px',
    fontFamily: "Poppins",
    cursor: "pointer",
    color: "white", // Initial text color (change this to your desired initial color)
  }}
  onMouseEnter={(e) => (e.target.style.color = "#ef6e0b")}
  onMouseLeave={(e) => (e.target.style.color = "white")}
>

 Sell Bike
</span>

  </a>
</li>

                  {/* <li>
                    <a href="#" onClick={() => handleMenuClick("Categories")}>
                      <span>Categories</span>
                    </a>
                  </li> */}
                  <li>
                    <a href="#" onClick={() => handleMenuClick("Collection")}>
                    <span
  className="helfiger"
  style={{
    fontSize: '18px',
    fontFamily: "Poppins",
    cursor: "pointer",
    color: "white", // Initial text color (change this to your desired initial color)
  }}
  onMouseEnter={(e) => (e.target.style.color = "#ef6e0b")}
  onMouseLeave={(e) => (e.target.style.color = "white")}
>
  Collection
</span>
                    </a>
                  </li>
                  

                  <li >
                    <a href="#" onClick={logout}>
                      <span style={{ color: "red", fontSize: '18px',fontFamily:"Poppins"}}>Logout</span>
                    </a>
                  </li> 
                </ul>
              </nav>
            </aside>
          </div>
        </div>
        <div
          style={{
            width: "84%",
            height: "90vh",
            backgroundColor: "RGB(243, 244, 245)",
            marginTop: "20px",

            // position: "fixed",
          }}
        >
          <div className="dashorder">
            {/* <header></header> */}
            {/* {selectedMenu === "Orders" && (
              <div>
                <p className="innerhead">Orders</p>
                <p className="innerorder">You haven't received any orders.</p>
              </div>
            )} */}
            {selectedMenu === "Product" && (
              <div>
                <p className="innerhead">Products</p>
                <p className="innerorder">
                  Add the product that you would like to sell.
                </p>
                <button
                  className="addpro"
                  onClick={() => navigate("/addproduct")}
                >
                  Add Product
                </button>
              </div>
            )}
            {selectedMenu === "Categories" && (
              <div>
                <p className="innerhead">Categories</p>
                <p className="innerorder">
                  Create Categories to group your product.
                </p>
                <button className="addpro">Add Categories</button>
              </div>
            )}
            {selectedMenu === "Collection" && (
              <div className="carcardcar">
                <div className="card-card">
                  {Array.isArray(daata) && daata.length > 0 ? (
                    daata.map((car) => (
                      <div
                        key={car._id}
                        className="carr-card"
                        // onClick={() => descript(pet._id)}
                      >
                        <div>
                          <img className="car-image" 
                          src={car.imageUrl}
                          // src={"https://source.unsplash.com/1600x900/?motorbike,"+car.brand}
                          alt="Bike" />
                          
                          {/* <img className="car-image" 
                          src="https://www.bajajauto.com/bikes/pulsar/pulsar-150"
                          // src={"https://source.unsplash.com/1600x900/?motorbike,"+car.brand}
                          alt="Bike" /> */}
                          

                          <p className="car-title">{car.brand}</p>
                          <p className="car-info">
                            {car.model},{car.fueltype}
                          </p>
                          <p className="car-location">{car.address}</p>
                          <p className="car-price"> ₹{car.price}</p>
                          <br />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="leo">No Bikes available.</p>
                  )}
                   
                </div>
              </div>
            )}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
