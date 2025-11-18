import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={`mt-auto ${style.footer}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>About Us</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ac ante mollis quam tristique convallis.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-decoration-none text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Follow Us</h5>
              <ul className="list-inline social-icons">
                <li className="list-inline-item">
                  <a href="#" className="text-white">
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white">
                    <i className="bi bi-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white">
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="row">
            <div className="col-md-12 text-center">
              <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
