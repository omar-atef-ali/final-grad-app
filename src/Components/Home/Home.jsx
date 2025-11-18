
import React from 'react'
import style from "./Home.module.css"

export default function Home() {
  return <>

    <div className={style.homeBody}>
      <div className="container-fluid">
        <div className={style.home_bg}>
          <div className={`${style.info}`}>
            <h1 className='totalFont text-white mb-2'>DeepAI</h1>
            <p className={` totalFont text-white-50`}>The Future of Business Growth is AI-Powered</p>
            
          </div>
        </div>

        <h4 className={`${style.why_deep_h4} totalFont`}>Why is DeepAi  a great business intelligence tool for you?</h4>
        <div className={`${style.hrStyle}`}></div>
        <div className="container">
          <div className={`${style.parent_cards} col-12 col-md-4`}>
            <div className={`${style.card}`}>
              <p>AI Recommendations</p>
              
            </div>

             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>
             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>
             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>
             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>
             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>
             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>
             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>
             <div className={`${style.card}`}>
              <h1>sdada</h1>
            </div>

         

          </div>
        </div>

         <h4 className={`${style.why_deep_h4} totalFont`}>What Can Our System Do for You?</h4>

         <div className="container">
            <div className="parent_card2">
                  <div className={`${style.cardd}`}>
                      <h1>safas</h1>
                  </div>

                   <div className={`${style.cardd}`}>
                      <h1>safas</h1>
                  </div>
                   <div className={`${style.cardd}`}>
                      <h1>safas</h1>
                  </div>
            </div>
         </div>
      </div>

    </div>
  </>
}
