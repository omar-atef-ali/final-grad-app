import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={`mt-auto ${style.footer}`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <a className={`totalFont ${style.footerLogo}`}
               href="#">
                DeebAI
              </a>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <h5 className="totalFont">Explore</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className={`totalFont  ${style.footerLinks}`}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className={`totalFont ${style.footerLinks}`}>
                    Demos
                  </a>
                </li>
                <li>
                  <a href="#" className={`totalFont ${style.footerLinks}`}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#"className={`totalFont ${style.footerLinks}`}>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#"className={`totalFont ${style.footerLinks}`}>
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <h5 className="totalFont">Support</h5>
               <ul className="list-unstyled">
                <li>
                  <a href="#"className={`totalFont ${style.footerLinks}`}>
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#"className={`totalFont ${style.footerLinks}`}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#"className={`totalFont ${style.footerLinks}`}>
                    Refund Policy
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <hr className="mb-4" />
        </div>
        <div className="footer-copyright text-center py-3">
          © 2025 Copyright:
          <span> DeebAI</span>
        </div>
      </footer>
    </>
  );
}
