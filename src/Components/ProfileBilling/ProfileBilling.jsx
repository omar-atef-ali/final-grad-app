
import React from 'react'
import style from './ProfileBilling.module.css'

export default function ProfileBilling() {
  return(

    <div className={`${style.Biling_content}`}>

      <div className={`${style.no_Biling_card}`} >
        <h2 className={`${style.no_Biling_title}`} >No Biling Information</h2>
        <p className={`${style.no_Biling_text}`}>Subscribe to a plan to manage billing and payment methods</p>
        <button className={`${style.btn_view_plans}`}>View Plans</button>
      </div>



      <div className={`${style.Biling_img_parent}`}>
        <div className={`${style.img_part}`}>

        </div>
      </div>
    </div>

  )



    

}
