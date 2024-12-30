import React, { useState, useEffect } from "react";
import "./Verify.css";
import TopNav from "../Topbar/TopNav";
import axios from "../../axios";
import { useParams } from "react-router-dom";
// import catGif from '../../Images/cat.gif'

// import Sidebar from "../../Reusables/Sidebar/Sidebar";

const Verify = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState("");
  const [daata, setDaata] = useState([]);

  const handleOptionClick = (option, index) => {
    setSelectedOption({ option, index });
  };
  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
        setVerifyStatus(response.data.user.verifyStatus);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <TopNav />
      {/* {loading ? (
        <div className="loader">
          <img style={{ marginTop: "200px" }} src={""} alt="Loader" />
        </div>
      ) : (
        <> */}

      <div className="cardverify">
        <h2 style={{fontFamily:"Poppins"}}className="card-heading">Registered Bike Details</h2>
        <br />
        <br />
        <div className="card-options">
          <button style={{fontFamily:"Poppins",fontSize:"bolder"}}
            className={`option-button ${
              selectedOption && selectedOption.index === 0 ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("details", 0)}
          >
            Details
          </button>
          <button style={{fontFamily:"Poppins"}}
            className={`option-button ${
              selectedOption && selectedOption.index === 1 ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("certificates", 1)}
          >
            Proff
          </button>
          {/* <button
            className={`option-button ${
              selectedOption && selectedOption.index === 2 ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("description", 2)}
          >
            Description
          </button> */}
        </div>
        {selectedOption && (
          <div className="details-container">
            {selectedOption.option === "details" && (
              <div className="details show">
                <div className="det">
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Brand:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">{daata.brand}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Model:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value"> {daata.model}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Ownername:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">{daata.ownername}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Ownernumber:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">{daata.ownernumber}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Ownertype:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value"> {daata.owner}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">KM:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value"> {daata.km}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Fueltype:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value"> {daata.fueltype}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Transmission:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">{daata.transmission}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Insurancevalidity:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">
                      {" "}
                      {daata.insurancevalidity}
                    </span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">RegistrationNumber:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">
                      {daata.registrationnumber}
                    </span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Address:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value"> {daata.address}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Engine:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">{daata.engine}</span>
                  </div>
                  <div className="category">
                    <span style={{fontFamily:"Poppins"}}className="category-label">Price:</span>
                    <span style={{fontFamily:"Poppins"}}className="category-value">{daata.price}</span>
                  </div>
                </div>
              </div>
            )}
            {selectedOption.option === "certificates" && (
              <div className="certificatesshow">
                <div className="det">
                  <div className="category">
                    <span style={{fontFamily:"Poppins",fontWeight:"bolder"}}className="category-labell">
                      Bike Image:
                      {/* <button className="option1-button">View</button> */}
                      <img style={{width:"500px",marginRight:"140px"}}src={daata.imageUrl} alt="" />
                    </span>
                  </div>
                  {/* <div className="category">
                    <span className="category-labell">
                      Certificate 2:
                      <button className="option1-button">View</button>
                    </span>
                  </div>
                  <div className="category">
                    <span className="category-labell">
                      Certificate 3:
                      <button className="option1-button">View</button>
                    </span>
                  </div> */}
                </div>
              </div>
            )}

            {selectedOption.option === "description" && (
              <div className="description show">
                <div className="det">
                  <form>
                    <div className="form-group">
                      <label htmlFor="activeness">PickUp:</label>
                      <select id="activeness" name="activeness">
                        <option value="high">High</option>
                        <option value="moderate">Moderate</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="colour">Colour:</label>
                      <input type="text" id="colour" name="colour" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="whirls">Mileage in KMPL:</label>
                      <input type="text" id="whirls" name="whirls" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bodyWeight">Engine in CC:</label>
                      <input type="number" id="bodyWeight" name="bodyWeight" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="age">Years Used:</label>
                      <input type="number" id="age" name="age" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Transmission:</label>
                      <div className="radio-group">
                        <label>
                          <input type="radio" name="gender" value="male" />{" "}
                          Automatic
                        </label>
                        <label>
                          <input
                            style={{ marginLeft: "0px" }}
                            type="radio"
                            name="gender"
                            value="female"
                          />{" "}
                          Manual
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="diseaseTolerance">ABS:</label>
                      <div className="radio-group">
                        <label>
                          <input
                            style={{ backgroundColor: "white" }}
                            type="radio"
                            name="diseaseTolerance"
                            value="yes"
                          />{" "}
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="diseaseTolerance"
                            value="no"
                          />{" "}
                          No
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="breed">Breed:</label>
                      <input type="text" id="breed" name="breed" />
                    </div>
                    <br />
                    <div
                      style={{
                        marginLeft: "80px",
                      }}
                    >
                      <button className="option2-button" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* </> */}

      <br />
      <br />
    </div>
  );
};

export default Verify;