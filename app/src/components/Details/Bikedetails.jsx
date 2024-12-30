import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../axios'
import './Bikedetails.css'
function Bikedetails() {
    const [daata, setDaata] = useState([]);
    const [verifyStatus, setVerifyStatus] = useState("");

    const { _id } = useParams();
    const stringId = String(_id);

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

  return (
    
    <div >  
      
    <div className="bikeeyy">
    <h2 style={{fontFamily:"Poppins"}}>Bike Description</h2>
    <div style={{display: 'flex', flexWrap: 'wrap', position: 'relative', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
        
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Model:</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.model}</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>                    Registration number:
</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.registrationnumber}</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Fuel type</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.fueltype}</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Km driven</div>
            <div style={{textTransform: 'none', color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.km}</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Transmission</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.transmission}</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>No. of Owner</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.owner}</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Insurance validity</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.insurancevalidity}</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Insurance type</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Comprehensive</div>
        </div>
        <div style={{borderBottom: '1px solid rgb(242, 243, 245)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>RTO</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>TN49</div>
        </div>
        <div style={{borderBottom: '0px none rgb(0, 0, 0)', padding: '12px 0px', width: '33.3%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', font: '16px / 16px "Times New Roman"', margin: '0px', verticalAlign: 'baseline'}}>
            <div style={{color: 'rgb(136, 136, 136)', fontFamily: 'futura-medium', fontSize: '14px', lineHeight: '20px', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(136, 136, 136)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>Car location</div>
            <div style={{color: 'rgb(46, 5, 78)', fontFamily: 'futura-medium', fontSize: '16px', lineHeight: '22px', textTransform: 'capitalize', width: '90%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', border: '0px none rgb(46, 5, 78)', margin: '0px', padding: '0px', verticalAlign: 'baseline'}}>{daata.address}</div>
        </div>
    </div>
</div>
</div>

  )
}

export default Bikedetails