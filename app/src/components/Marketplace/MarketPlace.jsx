import React, { useState, useEffect } from "react";
import "./Marketplace.css";
import { Range } from "react-range";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../axios";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineEnvironment, 
  AiOutlineClose
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";
import TopNav from "../Topbar/TopNav";
import check from "./chechi.png"
import loaderGif from "../../Images/loader.gif"; // Import the loader GIF or use an existing one in your project


const Marketplace = ({ selectedLocation }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page


  const selectedBikeType = new URLSearchParams(location.search).get('bikeType');
  const [priceRange, setPriceRange] = useState([10000, 700000]);
  // const storedLocation = JSON.parse(localStorage.getItem("selectedLocation"));
  // const city = storedLocation[0].formatted_address;
  // console.log('city',city); 
  const [transmission, setTransmission] = useState([]);
  const [data, setData] = useState([]);
  const [iswishListed, setwishList] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedtransmission, setSelectedTransmission] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // const filteredDataBike = bikes.filter(bike => bike.bikeType === selectedBikeType);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleFavoriteClick = async (carId) => {
    try {
      console.log(carId);
      const response = await axios.get(`/wishlist/${carId}`);
      console.log(response.data.wishlist);

      const updatedWishList = {
        ...iswishListed,
        [carId]: true,
      };
      setwishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFuelTypeChange = (event) => {
    const { checked, value } = event.target;
    let updatedFuelTypes = [...selectedFuelTypes];

    if (checked) {
      updatedFuelTypes.push(value);
    } else {
      updatedFuelTypes = updatedFuelTypes.filter((item) => item !== value);
    }

    setSelectedFuelTypes(updatedFuelTypes);
  };

  const handleFavoriteRemove = async (carId) => {
    try {
      console.log(carId);
      const response = await axios.get(`/removewishlist/${carId}`);
      console.log(response.data.wishlist);

      const updatedWishList = {
        ...iswishListed,
        [carId]: false,
      };
      setwishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } catch (error) {
      console.error(error);
    }
  };

  const descript = (id) => {
    navigate(`/description/${id}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleBrandChange = (event) => {
    const { checked, value } = event.target;
    let updatedBrands = [...selectedBrands];

    if (checked) {
      updatedBrands.push(value);
    } else {
      updatedBrands = updatedBrands.filter((item) => item !== value);
    }

    setSelectedBrands(updatedBrands);
  };

  const handleTransmissionChange = (event) => {
    const { checked, value } = event.target;
    let updatedTransmission = [...transmission];

    if (checked) {
      updatedTransmission.push(value);
    } else {
      updatedTransmission = updatedTransmission.filter(
        (item) => item !== value
      );
    }

    setSelectedTransmission(updatedTransmission);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };
  // const setdata=(datas)=>{
  //   console.log(datas)
  //   setData(datas);

  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get("/allCars");
          setData(response.data.cars);
          console.log(response.data.cars);
          setwishList(Array(response.data.cars.length).fill(false));
          setLoading(false); // Set loading to false after fetching data
        }, 1500);
        const response = await axios.get("/allCars");
        setData(response.data.cars);
        console.log(response.data.cars)
        setwishList(Array(response.data.cars.length).fill(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setwishList(JSON.parse(storedWishList));
    }
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredCars = data;
      // filteredCars = filteredCars.filter((car) => {
      //   const carCity = car.address.toLowerCase();
      //   const pattern = new RegExp(`\\b${carCity}\\b`, 'i');
      //   let cityfound=pattern.test(city)
      //  return cityfound

      // });
      // Filter by selected brands
      if (selectedBrands.length > 0) {
        filteredCars = filteredCars.filter((car) =>
          selectedBrands.includes(car.brand)
        );
      }

      // Filter by search input
      if (searchInput !== "") {
        const searchTerm = searchInput.toLowerCase();
        filteredCars = filteredCars.filter(
          (car) =>
            car.brand.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm)
        );
      }

      // Filter by selected fuel types
      if (selectedFuelTypes.length > 0) {
        console.log(selectedFuelTypes)
        filteredCars = filteredCars.filter((car) =>
          selectedFuelTypes.includes(car.fueltype)
        );
      }

      // Filter by selected transmission types
      if (selectedtransmission.length > 0) {
        console.log(selectedtransmission)
        filteredCars = filteredCars.filter((car) =>
          selectedtransmission.includes(car.transmission)
        );
      }

      // Filter by price range
      filteredCars = filteredCars.filter(
        (car) => car.price >= priceRange[0] && car.price <= priceRange[1]
      );

      if (selectedBikeType) {
        console.log('selectedBikeType', selectedBikeType);
        filteredCars = filteredCars.filter((car) => car.brand === selectedBikeType);
        console.log('filteredCars', filteredCars)
      }
      // if (selectedLocation) {
      //   filteredCars = filteredCars.filter((car) =>
      //     car.address === selectedLocation[0].formatted_address
      //   );
      // }
      // Filter by selected bike type (city name)
      // const storedLocation = JSON.parse(localStorage.getItem("storedLocation"));
      // const city = storedLocation[4].long_name; // Extract the city name from the address components
      // filteredCars = filteredCars.filter((car) => {
      //   const carCity = car.address_components.find((component) =>
      //     component.types.includes("locality")
      //   );
      //   return carCity && carCity.long_name === city;
      // });

      setFilteredData(filteredCars);
    };

    filterData();
  }, [
    data,
    selectedBrands,
    searchInput,
    selectedFuelTypes,
    selectedtransmission,
    priceRange,
  ]);

  const [isRangeWrapperVisible, setIsRangeWrapperVisible] = useState(false);
  
  const toggleRangeWrapper = () => {
    setIsRangeWrapperVisible(!isRangeWrapperVisible);
    
  };
  return (
    <div>
      {loading ? ( // Display loader GIF while loading is true
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <img src={loaderGif} alt="Loading..." />
        </div>
      ) : (<div>     <TopNav />
        <br />
        <br />

        
        <div className="container">
        <button className="filterbox" onClick={toggleRangeWrapper}>
        Filter
      </button>
         <div className={`range-container ${isRangeWrapperVisible ? "active" : ""}`}>
         
            <div className={`range-wrapper `}>
            <div className="closebtn" onClick={()=>setIsRangeWrapperVisible(false)}>
             < AiOutlineClose/>
            </div>
              <h2 style={{ color: "#ef6e0b" }} className="range-title">Price Range</h2>
             
              <p className="range-values">
                <span>{formatAmount(priceRange[0])}</span>
                <span>{formatAmount(priceRange[1])}</span>
              </p>

              <Range
                step={50000}
                min={0}
                max={700000}
                values={priceRange}
                onChange={handlePriceRangeChange}
                renderTrack={({ props, children }) => (
                  <div {...props} className="range-track">
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    className={`range-thumb ${isDragged ? "dragged" : ""}`}
                  />
                )}
              />

              <div style={{width:'100%',display:'flex',justifyContent:'space-between',paddingTop:'10px',fontWeight:'semibold'}}>
                <span >Min</span>
                <span >Max</span>
              </div>

              <div className="search-container">
                <p style={{ color: "#ef6e0b" }} className="search-title">Brands + Models</p>
                <input style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                  className="search-input"
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearchInputChange}
                />
                <AiOutlineSearch className="search-icon" />
                <p style={{ color: "#ef6e0b" }} className="top-brands">Top Brands</p>
                <label className="brand-checkbox">
                  <input
                    type="checkbox"
                    value="Royal Enfield"
                    onChange={handleBrandChange}
                  />
                  <span className="brand-name">Royal Enfield</span>
                  <span className="brand-count"></span>
                </label>
                <label className="brand-checkbox">
                  <input
                    type="checkbox"
                    value="Yamaha"
                    onChange={handleBrandChange}
                  />
                  <span className="brand-name">Yamaha</span>
                  <span className="brand-count"></span>
                </label>
                <label className="brand-checkbox">
                  <input
                    type="checkbox"
                    value="Honda"
                    onChange={handleBrandChange}
                  />
                  <span className="brand-name">Honda</span>
                  <span className="brand-count"></span>
                </label>
                <label className="brand-checkbox">
                  <input
                    type="checkbox"
                    value="KTM"
                    onChange={handleBrandChange}
                  />
                  <span className="brand-name">KTM</span>
                  <span className="brand-count"></span>
                </label>
                <label className="brand-checkbox">
                  <input
                    type="checkbox"
                    value="Ducati"
                    onChange={handleBrandChange}
                  />
                  <span className="brand-name">Ducati</span>
                  <span className="brand-count"></span>
                </label>
              </div>



              <p className="top-brands" style={{ fontFamily: "Poppins", color: "#ef6e0b" }}>Fuel Type</p>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Petrol"
                  onChange={handleFuelTypeChange}
                />
                <span style={{ fontFamily: "Poppins" }} className="brand-name">Petrol</span>
                <span className="brand-count"></span>
              </label>

              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="EV"
                  onChange={handleFuelTypeChange}
                />
                <span style={{ fontFamily: "Poppins" }} className="brand-name">EV</span>
                <span className="brand-count"></span>
              </label>

              <p className="top-brands" style={{ fontFamily: "Poppins", color: "#ef6e0b" }}>Transmisssion</p>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Automatic"
                  onChange={handleTransmissionChange}
                />
                <span style={{ fontFamily: "Poppins" }} className="brand-name">Automatic</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Manual"
                  onChange={handleTransmissionChange}
                />
                <span style={{ fontFamily: "Poppins" }} className="brand-name">Manual</span>
                <span className="brand-count"></span>
              </label>
           
            
          </div>
          </div>
          <div className="marketgrid">
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((car, index) => (
                    <div key={car._id} className="car-card">
                      <div style={{ marginRight: "70px" }} className="markcarimg">
                        <img
                          className="car-image"
                          onClick={() => descript(car._id)}
                          src={car.imageUrl}
                          alt="car"
                        />

                        {car.verifyStatus === "verified" && (
                          <img src={check} className="check-icon" alt="Check" />
                        )}
                      </div>

                      <div className="favorite-icon">
                        {iswishListed[car._id] ? (
                          <FaHeart
                            className="heart-icon"
                            onClick={() => handleFavoriteRemove(car._id)}
                          />
                        ) : (
                          <AiOutlineHeart
                            className="heart-icon"
                            onClick={() => handleFavoriteClick(car._id)}
                          />
                        )}
                      </div>

                      <div style={{ marginTop: "-10px" }}>
                        <h3 className="car-titlele">
                          {" "}
                          <span
                            className="placeholder"
                            style={{ textDecoration: "none" }}
                            
                          >{car.brand || "Brand Placeholder"}
                            
                          </span>
                        </h3>
                        <p className="car-infole" >
                          <span className="label">Model:</span>{" "}
                          {car.model || "Model Placeholder"}
                        </p>
                        <p className="car-pricele" >
                          <span className="label ">Price:</span> ₹
                          <span className="placeholder">
                            {car.price
                              ? Number(car.price).toLocaleString("en-IN")
                              : "Price Placeholder"}
                          </span>
                        </p>

                        <div className="car-locationle" >
                          <div className="location-icon" />
                          <span className="label">Location:</span>{" "}
                          {car.address || "Address Placeholder"}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p style={{ fontFamily: "Poppins" }} className="notavalaible">No Bikes available.</p>
              )}
            </div>
        </div>
            {/* <div className="marketgrid">
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((car, index) => (
                    <div key={car._id} className="car-card">
                      <div style={{ marginRight: "70px" }} className="markcarimg">
                        <img
                          className="car-image"
                          onClick={() => descript(car._id)}
                          src={car.imageUrl}
                          alt="car"
                        />

                        {car.verifyStatus === "verified" && (
                          <img src={check} className="check-icon" alt="Check" />
                        )}
                      </div>

                      <div className="favorite-icon">
                        {iswishListed[car._id] ? (
                          <FaHeart
                            className="heart-icon"
                            onClick={() => handleFavoriteRemove(car._id)}
                          />
                        ) : (
                          <AiOutlineHeart
                            className="heart-icon"
                            onClick={() => handleFavoriteClick(car._id)}
                          />
                        )}
                      </div>

                      <div style={{ marginTop: "-10px" }}>
                        <h3 className="car-titlele">
                          {" "}
                          <span
                            className="placeholder"
                            style={{ textDecoration: "none" }}
                            
                          >{car.brand || "Brand Placeholder"}
                            
                          </span>
                        </h3>
                        <p className="car-infole" >
                          <span className="label">Model:</span>{" "}
                          {car.model || "Model Placeholder"}
                        </p>
                        <p className="car-pricele" >
                          <span className="label ">Price:</span> ₹
                          <span className="placeholder">
                            {car.price
                              ? Number(car.price).toLocaleString("en-IN")
                              : "Price Placeholder"}
                          </span>
                        </p>

                        <div className="car-locationle" >
                          <div className="location-icon" />
                          <span className="label">Location:</span>{" "}
                          {car.address || "Address Placeholder"}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p style={{ fontFamily: "Poppins" }} className="notavalaible">No Bikes available.</p>
              )}
            </div> */}
            <div className="pagination">
              <button
              style={{ fontFamily: "Poppins",
              backgroundColor: "#ef6e0b",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              marginRight:'24px',
              cursor: "pointer",
              transition: "background-color 0.3s ease",}}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              <span style={{fontFamily:'Poppins',color:"#ef6e0b"}}>{currentPage}</span>
              
              <button
  style={{
    fontFamily: "Poppins",
    backgroundColor: "#ef6e0b",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: '24px',
    transition: "background-color 0.3s ease",
    
  }}
  
  onClick={() => setCurrentPage(currentPage + 1)}
  disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
>
  Next
</button>


            </div>

      </div>
      )
      }
    </div>
  );
};

export default Marketplace;
