import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className={`${style.demosection}`}>
        <nav className={`navbar navbar-expand-lg navbar-dark ${style.navbargradient}`}>
          <div className="container px-4">
            <Link className={`navbar-brand ${style.logo} totalFont mx-1 `} to={'#'}>
              
              DeebAI
            </Link>

            

            <div className="collapse navbar-collapse  " id="navbarNav2">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-2">
                  <Link className={`nav-link totalFont mx-2  ${style.mainbtns}`} to={'/home'}>
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={`nav-link totalFont mx-2  ${style.mainbtns}`} to={'/#'}>
                    Demo
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={`nav-link totalFont mx-2  ${style.mainbtns}`} to={'#'}>
                    Features
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={`nav-link totalFont mx-2  ${style.mainbtns}`} to={'#'}>
                    Pricing
                  </Link>
                </li> 
                
                <li className="nav-item mx-2">
                  <Link className={`nav-link totalFont mx-2  ${style.mainbtns}`} to={'#'}>
                    Contact
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className={`nav-link totalFont mx-2  ${style.mainbtns}`} style={{marginRight : "25px"}} to={'#'}>
                    About us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`btn btn-outline-light ms-5 totalFont ${style.freebtn} `} to={'#'}>
                    Free Trail
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={` ms-2 totalFont  ${style.borderbtn} ${style.loginbtn} `} to={'#'}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
