import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer class="mt-auto">
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-3">
              <h5>About Us</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ac ante mollis quam tristique convallis.
              </p>
            </div>
            <div class="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul class="list-unstyled">
                <li>
                  <a href="#" class="text-decoration-none text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" class="text-decoration-none text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" class="text-decoration-none text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4 mb-3">
              <h5>Follow Us</h5>
              <ul class="list-inline social-icons">
                <li class="list-inline-item">
                  <a href="#" class="text-white">
                    <i class="bi bi-facebook"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#" class="text-white">
                    <i class="bi bi-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#" class="text-white">
                    <i class="bi bi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr class="mb-4" />
          <div class="row">
            <div class="col-md-12 text-center">
              <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
