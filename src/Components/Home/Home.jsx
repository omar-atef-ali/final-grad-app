
import React from 'react'
import style from "./Home.module.css"

export default function Home() {
  return <>

    <div className={style.homeBody}>
      <div className="container-fluid">
        <div className={style.home_bg}>
          <div className={`${style.info}`}>
            <h1 className='totalFont text-white mb-4'>DeepAI</h1>
            <p className='totalFont text-white'>The Future of Business Growth is AI-Powered</p>
          </div>
        </div>

        <h4 className={`${style.why_deep_h4} totalFont`}>Why is DeepAi  a great business intelligence tool for you?</h4>
        <div className="container">
          <div className={`${style.parent_cards} col-12 col-md-4`}>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>

            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customCard}`}>
              <h1>sdada</h1>
            </div>



          </div>
        </div>

        <h4 className={`${style.why_deep_h4} totalFont`}>What Can Our System Do for You?</h4>

        <div className="container">
          <div className={`${style.parent_card2}`}>
            <div className={`${style.customCard2}`}>
              <h1>safas</h1>
            </div>

            <div className={`${style.customCard2}`}>
              <h1>safas</h1>
            </div>
            <div className={`${style.customCard2}`}>
              <h1>safas</h1>
            </div>
          </div>
        </div>

        <h4 className={`${style.why_deep_h4} totalFont`}>Designed to Target Every Role</h4>


        <div className="container">
          <div className={`${style.parent_card3} col-12 col-md-6`}>
            <div className={`${style.customCard3}`}>
              <h1>sdada</h1>
            </div>

            <div className={`${style.customCard3}`}>
              <h1>sdada</h1>
            </div>




          </div>
          <div className={`${style.parent_card4} col-12`}>
            <div className={`${style.customCard4}`}>
              <h1>sdada</h1>
            </div>



          </div>
        </div>

      </div>

    </div>
  </>
}
