import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <section className="contact-area foot" id="contact">
        <div className="containerfoot">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="contact-content text-center">
                <div className="contact-social">
                  <ul>
                    <li>
                      <a className="hover-target" href="/">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a className="hover-target" href="/">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="foottt">
        <p>Copyright &copy; 2023 / All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Footer;
