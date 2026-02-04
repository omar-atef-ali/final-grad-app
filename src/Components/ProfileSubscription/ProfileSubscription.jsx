
import React from 'react'
import style from "./ProfileSubscription.module.css"

export default function ProfileSubscription() {
  return (






    <div className={`${style.subscription_content}`}>

      <div className={`${style.no_subscription_card}`} >
        <h2 className={`${style.no_subscription_title}`} >No Active Subscription</h2>
        <p className={`${style.no_subscription_text}`}>Choose a plan to unlock powerful AI features for your business</p>
        <button className={`${style.btn_view_plans}`}>View Plans</button>
      </div>


      <div className={`${style.pricing_cards}`}>

        <div className={`${style.pricing_card}`} >
          <div className={`${style.pricing_header}`} >
            <h3 className={`${style.plan_name}`}>BASIC</h3>
          </div>
          <div className={`${style.pricing_body}`}>
            <div className={`${style.plan_features}`}>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <button className={`${style.btn_choose}`}>Choose</button>
        </div>


        <div className={`${style.pricing_card} ${style.pricing_card_popular}`}>
          <div className={`${style.popular_badge}`}>Popular</div>
          <div className={`${style.pricing_header}`}>
            <h3 className={`${style.plan_name}`}>STANDARD</h3>
          </div>
          <div className={`${style.pricing_body}`}>
            <div className={`${style.illustration}`}>
              <div className={`${style.character}`}>

                <div className={`${style.character_placeholder}`}></div>
              </div>
              <div className={`${style.stars}`}>
                <svg className={`${style.star} ${style.star_1}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L12.09 6.26L17 7.27L13.5 10.97L14.18 16L10 13.77L5.82 16L6.5 10.97L3 7.27L7.91 6.26L10 2Z" fill="#FFD700" />
                </svg>
                <svg className={`${style.star} ${style.star_2}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2L9.67 5.01L13 5.63L10.5 8.27L11.03 11.73L8 10.01L4.97 11.73L5.5 8.27L3 5.63L6.33 5.01L8 2Z" fill="#FFD700" />
                </svg>
              </div>
            </div>
            <div className={`${style.plan_features}`}>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <button className={`${style.btn_choose} ${style.btn_choose_popular}`}>Choose</button>
        </div>


        <div className={`${style.pricing_card}`}>
          <div className={`${style.pricing_header}`}>
            <h3 className={`${style.plan_name}`}>PREMIUM</h3>
          </div>
          <div className={`${style.pricing_body}`} >
            <div className={`${style.plan_features}`}>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={`${style.feature}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <button className={`${style.btn_choose}`}>Choose</button>
        </div>
      </div>
    </div>





  )
}
