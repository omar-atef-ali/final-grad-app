import React, { useState } from "react";
import style from "./ForgetPassword.module.css";
import { Link } from "react-router-dom";
import sideImage from "../../assets/images/ChatGPT Image Oct 6, 2025, 05_20_40 PM.png";

export default function ForgetPassword() {

  return (
    <>
      <div className="container-fluid p-0 vh-100 ">
        <div className="row g-0 h-100">
          <div className="col-md-6 d-none d-md-block h-100 ">
            <img
              src={sideImage}
              alt="side illustration"
              className="w-100 h-100 object-fit-cover"
            />
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center bg-body h-100">
            <div className="w-75">
              <div className="mb-4">
                <Link
                  to="/login"
                  className="d-inline-flex align-items-center  text-decoration-none mb-4 small"
                  style={{ color: "var(--accent)" }}
                >
                  <i className="fa-solid fa-arrow-left mx-1" style={{fontSize : "10px" , marginTop: "3px"}}></i> Back to Login
                </Link>
                <h2
                  className="h2 fw-bold mb-2"
                  style={{ color: "var(--secondary)" }}
                >
                  Reset Your Password
                </h2>
                <p className="text-secondary">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>
              <form>
                <div className="mb-3">
                  <label
                    className="form-label fw-medium"
                    style={{ color: "var(--secondary)" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@Example.com"
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn-deeb w-100">
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
