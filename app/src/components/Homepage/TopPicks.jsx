import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./TopPicks.css";
import axios from "../../axios.js";

const TopPicks = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [daata, setDaata] = useState([]);
  
  const scrollRight = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft + containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const descript = (id) => {
    navigate(`/description/${id}`);
  };

  const scrollLeft = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft - containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await axios.get("/allCars");
        const allCars = responsee.data.cars;
        const filteredCars = allCars.filter((car) => car.imageUrl !== "");

        setDaata(filteredCars);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="top-picks-h2">TOP PICKS</h2>
      <div className="top-picks-section2">
        <div className="top-picks-wrapper" ref={containerRef}>

          <div style={{ fontFamily: "Poppins" }} className="top-picks-container">
            {Array.isArray(daata) && daata.length > 0 ? (
              daata.map((image, index) => (
                <div style={{ fontFamily: "Poppins" }} className="card" key={image._id} alt={`Saree ${index + 1}`} onClick={() => descript(image._id)}>
                  <img src={image.imageUrl} alt="Bike" />
                  
                  <h3>{image.brand} {image.model}</h3>
                  <p>₹{image.price}</p>
                  <button style={{ fontFamily: "Poppins" }} className="piclbut">Add to cart</button>
                </div>
                
                
              ))
            ) : (
              <p>Not Available</p>
            )}
          </div>
        </div>
        
      </div>
      <div className="carousel-arrows">
          <span className="arrow-left" onClick={scrollLeft}>
            
          </span>
          <span className="arrow-right" onClick={scrollRight}>
           
          </span>
        </div>
     </div>
  );
};

export default TopPicks;
