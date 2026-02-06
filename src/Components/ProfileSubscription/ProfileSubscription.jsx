
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

      <div className={`${style.subscription_img_parent}`}>
        <div className={`${style.img_part}`}>

        </div>
      </div>
    </div>





  )
}
