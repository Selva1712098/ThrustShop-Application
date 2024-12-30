import React, { useState, useEffect } from "react";
import "./Firsttab.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

function Firsttab() {
  const [carData, setCarData] = useState([]); // State variable to store the car data fetched from the API
  // const [searchQuery, setSearchQuery] = useState("");
  console.log("search", searchQuery); // State variable to store the user's search query
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(-1);
  // const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        setCarData(response.data.cars);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/carBrand/${brand}`);
  //       setData(response.data.cars);
  //       console.log(response.data.cars);
  //       setwishList(Array(response.data.cars.length).fill(false));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
    // setSelectedCar(null);
    setSelectedIdx(-1);
  };

  const filteredCarData = carData.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleCarSelection = (car) => {
  //   const carName = `${car.brand}`;
  //   navigate(`/market/${encodeURIComponent(carName)}`);
  // };

  // const handleCarSelection = (car) => {
  //   console.log("Selected car:", car);
  //   setSearchQuery(`${car.brand} - ${car.model}`);
  //   setSelectedIdx(-1);
  //   navigate(`/market/${encodeURIComponent(car.brand)}`);
  // };

  const handleCarSelection = (car) => {
    const carName = `${car.brand} - ${car.model}`;
    setSearchQuery(carName);
    setSelectedIdx(-1);
    setSelectedCar(carName); // Update selected car state
    navigate(`/market?bikeType=${encodeURIComponent(car.brand)}`);
  };

  const handleKeyDown = (event) => {
    if (filteredCarData.length === 0) return;

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx > 0 ? prevIdx - 1 : filteredCarData.length - 1
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx < filteredCarData.length - 1 ? prevIdx + 1 : 0
        );
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIdx !== -1) {
          handleCarSelection(filteredCarData[selectedIdx]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="Backgroundcarimage">
        <div className="bikesearch">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            maxLength="1000"
            autoComplete="off"
            placeholder="Search for your favourite bikes"
          />
         
          
        </div>
        {searchQuery && (
            <ul className="suggestions-list">
              {filteredCarData.length > 0 ? (
                filteredCarData.map((car, idx) => (
                  <li
                    key={car.id}
                    onClick={() => handleCarSelection(car)}
                    className={idx === selectedIdx ? "selected" : ""}
                  >
                    {car.brand} - {car.model}
                  </li>
                 
                ))
              ) : (
                <p>No bikes available.</p>
              )}
            </ul>
          )}
        <div className="bike-cat">
          <img
            src="data:image/png;base64,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"
           width="75"
            height="40"
          />
          <img
            src=" https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Hero_MotoCorp_Logo.svg/2560px-Hero_MotoCorp_Logo.svg.png"
           width="75"
            height="40"
          />
          <img
            src="https://1000logos.net/wp-content/uploads/2018/03/Honda-Logo-1981.png"
           width="75"
            height="40"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/KTM-Logo.svg/2560px-KTM-Logo.svg.png"
           width="75"
            height="40"
          />
          <img
            src="https://www.revoltmotors.com/images/logo-black-large.png  "
           width="75"
            height="40"
          />
          <img
            src="data:image/png;base64,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"
           width="75"
            height="40"
          />
          <img
            src=" https://1000marcas.net/wp-content/uploads/2020/10/TVS-Motor-logo.jpg"
           width="75"
            height="40"
          />
          <img
            src=" https://1000logos.net/wp-content/uploads/2021/04/Jawa-logo.png"
           width="75"
            height="40"
          />

          <button className="view-button1" type="button" onClick={()=>navigate('/market')} >
              VIEW ALL BIKES
          </button>
        </div>
      </div>
    </div>
  );
}

export default Firsttab;
