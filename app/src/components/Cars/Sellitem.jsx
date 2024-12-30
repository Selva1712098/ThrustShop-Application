import React, { useState } from "react";
import "./Sellitem.css";
import Nav from "../Topbar/TopNav";

const Sellitem = () => {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [owner, setOwner] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderStepOne = () => (
    <div className="form-step">
      <h4 className="Sellitem-Placeholder">Brand</h4>
      <input
        className="selliteminput"
        type="text"
        id="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <button
        type="button"
        className="Nxtbutton"
        onClick={handleNext}
        style={{ marginTop: "3px" }}
      >
        <span>Next</span>
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
  );

  const renderStepTwo = () => (
    <div className="form-step">
      <h4 className="Sellitem-Placeholder">Model</h4>
      <input
        className="selliteminput"
        type="text"
        id="model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <button type="button" className="Prebutton" onClick={handlePrevious}>
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
      </button>
      <button type="button" className="Nxtbutton" onClick={handleNext}>
        <span>Next</span>
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
  );

  const renderStepThree = () => (
    <div className="form-step">
      <h4 className="Sellitem-Placeholder">Manufacture/Owner</h4>
      <input
        className="selliteminput"
        type="text"
        id="owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <button type="button" className="Prebutton" onClick={handlePrevious}>
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
      </button>
      <button type="button" className="Nxtbutton" onClick={handleNext}>
        <span>Next</span>
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
  );

  const renderStepFour = () => (
    <div className="form-step">
      <h4 className="Sellitem-Placeholder">Unique Code</h4>
      <input
        className="selliteminput"
        type="text"
        id="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="button" className="Prebutton" onClick={handlePrevious}>
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
      </button>
      <button type="button" className="Nxtbutton" onClick={handleNext}>
        <span>Next</span>
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
  );

  const renderStepFive = () => (
    <div className="form-step">
      <h4 className="Sellitem-Placeholder">Location</h4>
      <input
        className="selliteminput"
        type="text"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="button" className="Prebutton" onClick={handlePrevious}>
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
      </button>
      <button type="button" className="Nxtbutton" onClick={handleNext}>
        <span>Next</span>
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
  );

  const renderStepSix = () => (
    <div className="form-step">
      <h4 className="Sellitem-Placeholder">Image</h4>
      <input
        className="selliteminput"
        type="file"
        id="images"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
      />
      <button type="button" className="Prebutton" onClick={handlePrevious}>
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
      </button>
      <button type="submit" className="sellsubmit">
        Submit
      </button>
    </div>
  );

  return (
    <div>
      {/* <br />
      <br />
      <br />
      <br /> */}
      <Nav />

      <div
        className="Backimg"
        style={
          {
            // backgroundImage: "url('https://wallpapercave.com/wp/wp3593200.jpg')",
          }
        }
      >
        <div className="sellcardiv">
          <h4 className="sd1">Enter Item Details</h4>

          <form className="sell-item-form" onSubmit={handleSubmit}>
            {step === 1 && renderStepOne()}
            {step === 2 && renderStepTwo()}
            {step === 3 && renderStepThree()}
            {step === 4 && renderStepFour()}
            {step === 5 && renderStepFive()}
            {step === 6 && renderStepSix()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sellitem;
