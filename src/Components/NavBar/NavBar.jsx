import React from "react";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <>
      <div className={`${style.demosection}`}>
        <nav className={`navbar navbar-expand-lg navbar-dark ${style.navbargradient}`}>
          <div className="container px-4">
            <a className={`navbar-brand ${style.logo} totalFont mx-1 `} href="#">
              
              DeebAI
            </a>

            

            <div className="collapse navbar-collapse  " id="navbarNav2">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-2">
                  <a className={`nav-link totalFont mx-2  ${style.mainbtns}`} href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link totalFont mx-2  ${style.mainbtns}`} href="#">
                    Demo
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link totalFont mx-2  ${style.mainbtns}`} href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link totalFont mx-2  ${style.mainbtns}`} href="#">
                    Pricing
                  </a>
                </li> 
                
                <li className="nav-item mx-2">
                  <a className={`nav-link totalFont mx-2  ${style.mainbtns}`} href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link totalFont mx-2  ${style.mainbtns}`} style={{marginRight : "25px"}} href="#">
                    About us
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`btn btn-outline-light ms-5 totalFont ${style.freebtn} `} href="#">
                    Free Trail
                  </a>
                </li>
                <li className="nav-item">
                  <a className={` ms-2 totalFont  ${style.borderbtn} ${style.loginbtn} `} href="#">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
