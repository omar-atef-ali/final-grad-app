
import React from 'react'
import style from "./Home.module.css"
import { Link } from 'react-router-dom'

export default function Home() {
  return <>
  
    <div className="container">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <h1 className="display-4 fw-bold mb-4">Welcome to Deeb AI</h1>
          <p className="lead text-secondary mb-5">Experience the power of AI-driven recommendations</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to={"/Login"} className={`btn btn-lg px-5 ${style.btndeeb}`}>
              Login
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  
  </>
}
