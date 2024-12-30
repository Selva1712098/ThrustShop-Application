import React, { useState, useEffect } from "react";
import "./Marketplace.css";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import TopNav from "../Topbar/TopNav";

const Marketplace = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([5000, 2000000]);
  const [selectedYear, setSelectedYear] = useState("");
  const [transmission, setTransmission] = useState([]);
  const [data, setData] = useState([]);
  const [iswishListed, setwishList] = useState({});
  const [searchInput, setSearchInput] = useState("");

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

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleTransmissionChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setTransmission([...transmission, value]);
    } else {
      setTransmission(transmission.filter((item) => item !== value));
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        setData(response.data.cars);
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

  return (
    <>
      <TopNav />

      <div className="container">
        <div className="range-container">
          <div className="range-wrapper">
            <h2 className="range-title">Price Range</h2>
            <p className="range-values">
              <span>{formatAmount(priceRange[0])}</span>
              <span>{formatAmount(priceRange[1])}</span>
            </p>

            <Range
              step={50000}
              min={5000}
              max={5000000}
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

            <p>
              <span className="dot">Min</span>
              <span className="value">Max</span>
            </p>

            <div className="search-container">
              <p className="search-title">Brands + Models</p>
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={handleSearchInputChange}
              />
              <AiOutlineSearch className="search-icon" />
              <p className="top-brands">Top Brands</p>
              <label className="brand-checkbox">
                <input type="checkbox" />
                <span className="brand-name">Maruti Suzuki</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input type="checkbox" />
                <span className="brand-name">Hyundai</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input type="checkbox" />
                <span className="brand-name">Renault</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input type="checkbox" />
                <span className="brand-name">Tata</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input type="checkbox" />
                <span className="brand-name">Ford</span>
                <span className="brand-count"></span>
              </label>
            </div>

            <div className="year-container">
              <p className="year-title">Year</p>

              <select
                className="year-dropdown"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="">All Years</option>
                <option value="2020">2020 & above</option>
                <option value="2018">2018 & above</option>
                <option value="2016">2016 & above</option>
                <option value="2014">2014 & above</option>
                <option value="2012">2012 & above</option>
              </select>

              <p className="type">Transmission</p>

              <div className="transmission-checkboxes">
                <label className="transmission-checkbox">
                  <input
                    type="checkbox"
                    name="transmission"
                    value="automatic"
                    checked={transmission.includes("automatic")}
                    onChange={handleTransmissionChange}
                  />
                  <span className="transmission-label">Automatic</span>
                </label>
              </div>
              <div className="transmission-checkboxes">
                <label className="transmission-checkbox">
                  <input
                    type="checkbox"
                    name="transmission"
                    value="manual"
                    checked={transmission.includes("manual")}
                    onChange={handleTransmissionChange}
                  />
                  <span className="transmission-label">Manual</span>
                </label>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="marketgrid">
            {Array.isArray(data) && data.length > 0 ? (
              data
                .filter((car) => {
                  const brandModel = `${car.brand} ${car.model}`.toLowerCase();
                  return (
                    brandModel.includes(searchInput.toLowerCase()) &&
                    car.price >= priceRange[0] &&
                    car.price <= priceRange[1] &&
                    (transmission.length === 0 ||
                      transmission.includes(car.transmission))
                  );
                })
                .map((car, index) => (
                  <div key={car._id} className="car-card">
                    <img
                      className="car-image"
                      onClick={() => descript(car._id)}
                      src="https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/bmw_i/2023/230201_BMW_Group_BMW_i4eDrive40.png"
                      alt="car"
                    />

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

                    <div>
                      <h3 className="car-titlele">
                        Car:{" "}
                        <span
                          className="placeholder"
                          style={{ textDecoration: "none" }}
                        >
                          {car.brand || "Brand Placeholder"}
                        </span>
                      </h3>
                      <p className="car-infole">
                        <span className="label">Model:</span>{" "}
                        {car.model || "Model Placeholder"}
                      </p>
                      <p className="car-pricele">
                        <span className="label">Price:</span> ₹
                        <span className="placeholder">
                          {car.price
                            ? car.price.toLocaleString("en-IN")
                            : "Price Placeholder"}
                        </span>
                      </p>

                      <div className="car-locationle">
                        <div className="location-icon" />
                        <span className="label">Location:</span>{" "}
                        {car.address || "Address Placeholder"}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>No Cars available.</p>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Marketplace;
