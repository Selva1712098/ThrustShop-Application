import React, { useEffect } from "react";

import Slider from "./Slider";
import Collection from "./Collection";
import TopPicks from "./TopPicks";
import Firsttab from "./Firsttab";
import Footer from "../Footer/Footer";
import TopNav from "../Topbar/TopNav";
import axios from "../../axios.js";
import "./Collection.css"



function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        const bikeData = response.data.cars;
        bikeData.forEach((car) => {
          //   console.log(.fabric);
        });

        const responsee = await axios.get("/images");
        const imagesData = responsee.data;
        imagesData.forEach((i) => {
          console.log(i.imageUrl);
        });

        // Match IDs and make the POST request
        const matchingIDs = bikeData
          .map((bike) => bike._id)
          .filter((id) => imagesData.find((image) => image._id === id));

        matchingIDs.forEach(async (id) => {
          const matchingImage = imagesData.find((image) => image._id === id);
          try {
            await axios.post("/imageUrl", {
              imageUrl: matchingImage.imageUrl,
              ids: [id],
            });
            console.log("Image URL posted for ID:", id);
          } catch (error) {
            console.log("Error posting image URL for ID:", id, error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);
  return (
    <div className="bground" style={{ width: '100%' }}>
      {/* <Topbar /> */}
      <TopNav />
     

      <Firsttab />
      <div style={{backgroundColor:'#f5f5f5',padding:'10px'}}>
        <h1 style={{color:'#ef6e0b',fontFamily:'Poppins',textAlign:'center',marginTop:'45px'}}>WHY THRUSTSHOP?</h1>
      <div className="benefits">
      
      <div className="info-card">
        
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGuj-qa7cNFfgiDh-5m5PcHNM7s9VA8eudxi9OluKBhWFfx5TMtUBZmnulmV6rWYkleichL-SesJzHNDbg2pa3ndLJNyFvW4Ei4S0-LD86GPNz_uZRlw3_0Ck4kEblbg_Nqw7DYhZlDGAuUGM7wLTJ6gHTv9ewLgwYbW2ULCEuoRb5HQcaw2YbltdV/s16000/motorcycle-ge8f10b7c5_1280.jpg" alt="12-Month Warranty" style={{ width: '100%', height: '180px', objectFit: 'cover', verticalAlign: 'middle', borderRadius:'28px 28px 0 0', boxSizing: 'border-box' }}   />
                <div style={{padding:'10px'}}>
                <h1 style={{fontSize:'18px'}}>Blockchain Verified Bikes</h1>
                <p style={{fontSize:'15px'}}>Ride into the future with blockchain-verified bikes, where every  accelerator stroke is securely tracked on the road to innovation</p>
      </div>
      </div>
      <div className="info-card">
        
      <img src="https://www.nationwide.com/staticassets/lc_motorcycle_maintenance_checklist-AdobeStock_196732360_tcm108-33964.jpg" alt="7-Day Return" style={{ width: '100%', height: '180px', objectFit: 'cover', verticalAlign: 'middle', borderRadius:'28px 28px 0 0', boxSizing: 'border-box' }}  />
                <div style={{padding:'10px'}}>
                <h1 style={{fontSize:'18px'}}>300+ Quality Checks</h1>
                <p style={{fontSize:'15px'}}>Experience unrivaled perfection with bikes that undergo over 300 quality checks, ensuring every ride is a flawless journey beyond compare</p>
      </div>
      </div>
      <div className="info-card">
        
      <img src="https://st4.depositphotos.com/1277251/20544/i/450/depositphotos_205449500-stock-photo-side-view-asian-motorcycle-taxi.jpg" alt="Easy Financing Options" style={{ width: '100%', height: '180px', objectFit: 'cover', verticalAlign: 'middle', borderRadius:'28px 28px 0 0', boxSizing: 'border-box' }}  />
                <div style={{padding:'10px'}}>
                <h1 style={{fontSize:'18px'}}>Easy Payment</h1>
                <p style={{fontSize:'15px'}}>Accelerate your dreams with easy payment motorbikes, where purchasing your two-wheeled companion is as effortless as the wind in your hair</p>
      </div>
      </div>
      </div>
      </div>
     
      <div className="toppicks">
        <TopPicks /> </div>
      <br />
      <br />
      <br />
      <div style={{ margin: "auto" }}>
        <Collection />
      </div>


      <Footer />
    </div>
  );
}

export default Home;
