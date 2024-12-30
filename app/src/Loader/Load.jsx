import React from "react";
import "./Load.css";

function Load() {
  return (
    <div className="load">
      <div className="load-container">
        <div class="loading-bar">
          {/* <div className="loimg"></div> */}
          <img
            style={{ paddingRight: "60px" }}
            className="loimg"
            src="https://www.linkpicture.com/q/logo_329.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Load;
