import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Verifier.css";

import TopNav from "../Topbar/TopNav";
import Footer from "../Footer/Footer";

const Verifier = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("TODO");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
   <div>
      <TopNav />

      <br />
      <br />

      <div className="tabs">
        <button
          className={activeTab === "TODO" ? "active" : ""}
          onClick={() => handleTabChange("TODO")}
        >
          Pending
        </button>
        <button
          className={activeTab === "Verified" ? "active" : ""}
          onClick={() => handleTabChange("Verified")}
        >
          Verified Product
        </button>
      </div>

      {activeTab === "TODO" && (
        <div className="carrr-carrrd" onClick={() => navigate("/verify")}>
          <img
            className="carrr-image"
            src="https://imgd.aeplcdn.com/310x174/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=75"
            alt="carrr"
          />
          <div className="carrr-details">
            <h3 className="carrr-title">Mahindra Thor</h3>
            <p className="carrr-info">Some information about the car</p>
            <p className="carrr-price">₹20,00,000</p>
            <div className="carrr-amount-line"></div>
            <br/>
            <div className="carrr-location">
              <button className="verifybuttton" onClick={() => navigate("/verify")}>
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Verified" && (
        <div className="verified-product">
          <h3>Verified Product</h3>
          {/* Add your content for verified products here */}
        </div>
      )}
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
};

export default Verifier;
