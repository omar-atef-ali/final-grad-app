
import React from 'react'
import style from "./SucessfulPaymet.module.css"
import { useNavigate } from "react-router-dom"

export default function SucessfulPaymet() {

  const navigate = useNavigate()

  return <>

    <main className={style.mainContent}>
      <div className={style.containerMain}>
        {/* <!-- Progress Stepper --> */}
        <div className={`${style.progress_steps}`}>
          <div className={`${style.step} ${style.completed}`}>
            <div className={`${style.step_icon}`}>
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className={`${style.step_label}`}>Select Plan</span>
          </div>
          <div className={`${style.step_line} ${style.completed}`}></div>
          <div className={`${style.step} ${style.completed}`}>
            <div className={`${style.stepperItem} ${style.stepperActive}`}>
              <div className={style.stepperCircle}>2</div>
              <span className={style.step_label}>Payment</span>
            </div>
          </div>
          <div className={`${style.step_line} ${style.completed}`}></div>
          <div className={style.stepperItem}>
            <div className={style.stepperCircle}>3</div>
            <span className={style.step_label}>Complete</span>
          </div>
        </div>

        {/* <!-- Success Icon --> */}
        <div className={style.successIconWrapper}>
          <div className={style.successIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 24L22 28L30 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* <!-- Success Message --> */}
        <div className={style.successMessage}>
          <h1 className={style.successTitle}>Payment Successful</h1>
          <p className={style.successSubtitle}>Your subscription has been activated.</p>
        </div>

        {/* <!-- Subscription Details Card --> */}
        <div className={style.subscriptionCard}>
          <div className={style.cardHeaderCustom}>
            <h2 className={style.cardTitleCustom}>Subscription Details</h2>
            <div className={style.divider}></div>
          </div>
          <div className={style.cardBodyCustom}>
            <div className={style.detailRow}>
              <span className={style.detailLabel}>Plan Type</span>
              <span className={style.detailValue}>Package</span>
            </div>
            <div className={style.detailRow}>
              <span className={style.detailLabel}>Subscription Date</span>
              <span className={style.detailValue}>February 26, 2026</span>
            </div>
            <div className={style.detailRow}>
              <span className={style.detailLabel}>Next Billing Date</span>
              <span className={style.detailValue}>August 26, 2026</span>
            </div>
            <div className={style.detailRow}>
              <span className={style.detailLabel}>Transaction Reference ID</span>
              <span className={style.detailValue}>932155068010100-1</span>
            </div>
            <div className={style.divider}></div>
            <div className={style.detailRowTotal}>
              <span className={style.totalLabel}>Amount Paid</span>
              <span className={style.totalValue}>EGP 11500.00</span>
            </div>
          </div>
        </div>

        {/* <!-- Action Buttons --> */}
        <div className={style.actionButtons}>
          <button onClick={() => navigate("/complete-data")} className={style.btnUpload}>Upload your Data</button>
          <button className={style.btnDownload}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#3D1B6A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.66667 6.66667L8 10L11.3333 6.66667" stroke="#3D1B6A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 10V2" stroke="#3D1B6A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Receipt
          </button>
        </div>


      </div>
    </main>

  </>
}
