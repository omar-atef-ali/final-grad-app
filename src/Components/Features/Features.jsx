import React from "react";
import style from "./Features.module.css";

export default function Features() {
  return (
    <>
      <div className={`${style.features_page} container-fluid`}>
        <div className={style.features_bg}>
          <div className={`${style.info}`}>
            <h1
              className={`${style.header} totalFont text-white mb-2 text-center`}
            >
              Powerful Features
              <br />
              for Modern Analytics
            </h1>
            <p className={` totalFont text-white-50 text-center w-75 `}>
              Deep Ai provides you with a holistic set of features that will
              help you run your operations and optimize marketing efforts
            </p>
            <button className={`${style.headerBtn} btn_deeb totalFont`}>
              Start Free Trial
            </button>
          </div>
        </div>
        <h4
          className={`${style.why_deep_h4} ${style.why_deep_h4_2} totalFont text-center`}
        >
          Why is DeepAi a great business intelligence tool for you?
        </h4>
        <div className={`${style.hrStyle}`}></div>

        <div className="container">
          <div className={`${style.parent_cards} col-12 col-md-6`}>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>

            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
          </div>
          <p className={`totalFont ${style.CommingSoon}`}>comming soon</p>
          <div className={`${style.parent_cards} col-12 col-md-6`}>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>

            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={`${style.parent_card2}`}>
            <div className={`${style.customCard2}`}>
              <h3 className="totalFont">Get Started For Free</h3>
              <p className="totalFont">Enjoy a realistic trial that mirrors the full subscription experience, Step into the real experience before subscribing</p>
              <button className="totalFont">get started<div className={`${style.hrFreeStyle}`}></div></button>
              
            </div>

            
          </div>
          
        </div>
      </div>
    </>
  );
}
