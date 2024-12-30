import React, { useState } from "react";
import "./Addproduct.css";

import TopNav from "../Topbar/TopNav";

import axios from "../../axios.js";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Addproduct() {
  const navigate = useNavigate();

  // const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [owner, setOwner] = useState("");
  const[ownernumber, setOwnernumber] = useState("");
  const [ownername, setOwnername] = useState("");
  const [km, setKM] = useState("");
  const [fueltype, setFueltype] = useState("");
  const [transmission, setTransmission] = useState("");
  //   const [manufactureryear, setManufactureryear] = useState("");
  const [insurancevalidity, setInsurancevalidity] = useState("");
  const [registrationnumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [verifyStatus, setVrifystatus] = useState("");
  const [images, setImages] = useState([]);
  const [engine, setEngine] = useState("");
  const [bikeImage,setBikeImage]= useState([]);
  const [ID,setId]= useState("")
  const [price, setPrice] = useState([]);

  

  // const handleSubmitAndNavigate = (e) => {
  //   e.preventDefault();
  //   console.log(formatPriceWithRupeeSymbol(price));
  // };

  
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleNavigate = () => {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/sellCars",
        {
          brand,
          model,
          owner,
          ownername,
          ownernumber,
          km,
          fueltype,
          transmission,
          insurancevalidity,
          registrationnumber,
          address,
          price,
          bikeImage
        },
        { withCredentials: true }
      );

      console.log(response.data);
setId(response.data._id)
     
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title:  '<span style="font-family: Poppins; color: #000;">Details Registered</span>',
        showCloseButton: true,
      });

      // navigate("/sidebar");
    } catch (error) {
      console.log(error); // Log the error message to the console
      Swal.fire({
        icon: "error",
        text: "Please check the details ",
      });
    }
  }
  

  const handleimageupload = async () => {
    try {
      const formData = new FormData();
      formData.append("_id", ID);
      formData.append("images", images[0]);
      console.log(formData);

      const responsee = await axios.post(`/uploadData/${ID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          req: "Access-Control-Allow-Origin",
        },
        withCredentials: true,
      });

      const responseee = await axios.get(`/imageStatus/${ID}`);
      console.log(responseee)

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
        title: '<span style="font-family: Poppins; color: #000;">Bike Registered</span>',
        showCloseButton: true,
      });

     // navigate("/sidebar");

    } catch (error) {
     
    }
  };

  const handleNextAndSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    handleNext();
  };
  const handleSubmitAndNavigate = (e) => {
    e.preventDefault();
    handleNavigate(e);
    handleimageupload();
  }

  const handleUploadAndSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    handleImagesChange(e);
  };
  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const renderStepOne = () => (
    <div className="addproddd">
      <div className="addproductsection">
        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Brand</h4>
          <input
            className="selliteminput"
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => {setBrand(e.target.value)}}
          />
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Model</h4>
          <input
            className="selliteminput"
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Owner Name</h4>
          <input
            className="selliteminput"
            type="text"
            id="name"
            value={ownername}
            onChange={(e) => setOwnername(e.target.value)}
          />
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Owner Number</h4>
          <input
            className="selliteminput"
            type="number"
            id="number"
            value={ownernumber}
            onChange={(e) => setOwnernumber(e.target.value)}
          />
        </div>

        <div className="form-step">
          <h4 style={{fontFamily:"Poppins"}}className="Sellitem-Placeholder1">Owner</h4>
          <select
            className="selliteminput1"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            <option  style={{fontFamily:"Poppins"}}value="">Select Owner</option>
            <option  style={{fontFamily:"Poppins"}}value="1st Owner">1st Owner</option>
            <option  style={{fontFamily:"Poppins"}}value="2nd Owner">2nd Owner</option>
            <option  style={{fontFamily:"Poppins"}}value="3rd Owner">3rd Owner</option>
          </select>
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder">KM Driven</h4>
          <input
            className="selliteminput"
            type="number"
            id="code"
            value={km}
            onChange={(e) => setKM(e.target.value)}
          />
        </div>

        <div className="form-step">
          <h4 style={{fontFamily:"Poppins"}}className="Sellitem-Placeholder1" >Fuel Type</h4>
          <select
            className="selliteminput1"
            id="owner"
            value={fueltype}
            onChange={(e) => setFueltype(e.target.value)}
          >
            <option  style={{fontFamily:"Poppins"}}value="">Select</option>
            <option  style={{fontFamily:"Poppins"}}value="Petrol">Petrol</option>
            <option  style={{fontFamily:"Poppins"}}value="Diesel">Diesel</option>
            <option vvalue="EV">EV</option>
          </select>
        </div>

        <div className="form-step">
          <h4 style={{fontFamily:"Poppins"}} className="Sellitem-Placeholder1">Transmission</h4>
          <select
            className="selliteminput1"
            id="owner"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option style={{fontFamily:"Poppins"}}value="">Select</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Insurance Validity</h4>
          <input
            className="selliteminput"
            type="date"
            id="location"
            value={insurancevalidity}
            onChange={(e) => setInsurancevalidity(e.target.value)}
          />
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Registration Number</h4>
          <input
            className="selliteminput"
            type="text"
            id="location"
            value={registrationnumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Address</h4>
          <input
            className="selliteminput"
            type="text"
            id="location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder">Engine</h4>
          <input
            className="selliteminput"
            type="text"
            id="engine"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
          />
        </div>

        <div className="form-step">
          <h4 className="Sellitem-Placeholder"> Price</h4>
          <input
            className="selliteminput"
            type="number"
            id="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="selsum">
        <button
          type="button"
          className="Nxtbutton"
          onClick={handleNextAndSubmit}
        >
          <span style={{fontFamily:"Poppins",fontWeight:"bolder"}}>Next</span>
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M149.308584 494.630501c0-11.2973 9.168824-20.466124 20.466124-20.466124l604.773963 0-188.083679-188.083679c-7.992021-7.992021-7.992021-20.947078 0-28.939099 3.990894-4.001127 9.240455-5.996574 14.46955-5.996574 5.239328 0 10.478655 1.995447 14.479783 5.996574l223.00912 223.00912c3.837398 3.837398 5.996574 9.046027 5.996574 14.46955 0 5.433756-2.159176 10.632151-5.996574 14.46955l-223.019353 223.029586c-7.992021 7.992021-20.957311 7.992021-28.949332 0-7.992021-8.002254-7.992021-20.957311 0-28.949332l188.073446-188.073446-604.753497 0C158.477408 515.096625 149.308584 505.938034 149.308584 494.630501z"></path>
          </svg>
        </button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="addproddduct">
      <div className="addproductsectionssss">
        <div className="form-step">
          <h4 className="Sellitem-Placeholder"> Bike Image</h4>
          <input
            className="selliteminput"
            type="file"
            id="images"
            multiple
            onChange={handleImagesChange}
          />
        </div>

        {/* <div className="form-step">
          <h4 className="Sellitem-Placeholder"> Proof</h4>
          <input
            className="selliteminput"
            type="file"
            id="images"
            value={images}
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
        </div> */}
        <div className="button-ccoontainer">
          {/* <button
            type="button"
            className="Prebutton"
            // onClick={() => setStep(step - 1)}
          >
            <svg
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
            >
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            <span>Previous</span>
          </button> */}
          <br/>
         
          <div className="subbbbu">
            <button style={{fontFamily:"Poppins"}}
              className="SubButton"
              type="submit"
              onClick={handleSubmitAndNavigate}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "auto" }}>
      <TopNav />
      <br />
      <br />
      <div className="prohe">
        <h3 style={{color:"#ef6e0b",fontFamily:"Poppins"}}>Enter the Details of your Bike</h3>
      </div>
      <br />
      <form className="sell-item-form" style={{ backgroundColor: "white" }}>
        {step === 1 && renderStepOne()}
        {/* {step === 2 && renderStepTwo()} */}
        {step === 2 && <div style={{ minHeight: "200px", overflowY: "hidden" }}>{renderStepTwo()}</div>}

      </form>
      <br />
      <br />
    </div>
  );
}
export default Addproduct;
