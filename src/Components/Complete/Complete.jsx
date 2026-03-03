import React from 'react'
import style from "./Complete.module.css"
export default function Complete() {
  return (
    <>

    <main className={`${style.main_content}`}>
        <div className={`${style.container}`}>
            <div className={`${style.progress_steps}`}>
                <div className={`${style.step} ${style.completed}`}>
                    <div className={`${style.step_icon}`}>
                        <svg viewBox="0 0 16 16" fill="none">
                            <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <span className={`${style.step_label}`}>Select Plan</span>
                </div>
                <div className={`${style.step_line} ${style.completed}`}></div>
                <div className={`${style.step} ${style.completed}`}>
                    <div className={`${style.step_icon}`}>
                        <svg viewBox="0 0 16 16" fill="none">
                            <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <span className={`${style.step_label}`}>Payment</span>
                </div>
                <div className={`${style.step_line} ${style.completed}`}></div>
                <div className={`${style.step} ${style.active}`}>
                    <div className={`${style.step_icon}`}>3</div>
                    <span className={`${style.step_label}`}>Complete</span>
                </div>
            </div>

            <div className={`${style.welcome_section}`}>
                <div className={`${style.welcome_icon}`}>
                    <svg viewBox="0 0 44.001 44.001" fill="none">
                        <path d="M17.871 29.0005C17.6924 28.3084 17.3316 27.6767 16.8262 27.1713C16.3207 26.6658 15.6891 26.3051 14.997 26.1265L2.72695 22.9625C2.51761 22.9031 2.33337 22.777 2.20218 22.6034C2.07098 22.4298 2 22.2181 2 22.0005C2 21.7829 2.07098 21.5712 2.20218 21.3976C2.33337 21.224 2.51761 21.0979 2.72695 21.0385L14.997 17.8725C15.6888 17.6941 16.3203 17.3336 16.8258 16.8286C17.3312 16.3235 17.6921 15.6923 17.871 15.0005L21.035 2.7305C21.0938 2.52034 21.2197 2.33518 21.3936 2.20329C21.5675 2.07139 21.7797 2 21.9979 2C22.2162 2 22.4284 2.07139 22.6023 2.20329C22.7762 2.33518 22.9021 2.52034 22.961 2.7305L26.1229 15.0005C26.3015 15.6926 26.6623 16.3243 27.1677 16.8297C27.6732 17.3352 28.3048 17.6959 28.997 17.8745L41.267 21.0365C41.478 21.0947 41.664 21.2205 41.7966 21.3947C41.9292 21.5688 42.001 21.7816 42.001 22.0005C42.001 22.2194 41.9292 22.4322 41.7966 22.6063C41.664 22.7805 41.478 22.9063 41.267 22.9645L28.997 26.1265C28.3048 26.3051 27.6732 26.6658 27.1677 27.1713C26.6623 27.6767 26.3015 28.3084 26.1229 29.0005L22.959 41.2705C22.9001 41.4807 22.7742 41.6658 22.6003 41.7977C22.4264 41.9296 22.2142 42.001 21.996 42.001C21.7777 42.001 21.5655 41.9296 21.3916 41.7977C21.2177 41.6658 21.0918 41.4807 21.0329 41.2705L17.871 29.0005Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1 className={`${style.welcome_title}`}>Welcome to Namaa!</h1>
                <p className={`${style.welcome_subtitle}`}>You're now part of us with</p>

                
                <div className={`${style.action_buttons}`}>
                    <button className={`${style.action_btn} ${style.primary}`}>
                        <svg viewBox="0 0 16 16" fill="none">
                            <path d="M2.66699 9.33377C2.54083 9.3342 2.41714 9.29882 2.31029 9.23175C2.20344 9.16468 2.11781 9.06867 2.06335 8.95487C2.0089 8.84107 1.98785 8.71416 2.00265 8.58887C2.01746 8.46359 2.06751 8.34507 2.14699 8.2471L8.74699 1.4471C8.7965 1.38996 8.86396 1.35134 8.93831 1.33759C9.01266 1.32384 9.08947 1.33578 9.15614 1.37144C9.22281 1.4071 9.27538 1.46437 9.30521 1.53384C9.33504 1.60331 9.34037 1.68087 9.32032 1.75377L8.04032 5.7671C8.00258 5.86812 7.9899 5.97678 8.00338 6.08377C8.01686 6.19076 8.05609 6.29289 8.11771 6.38139C8.17933 6.46988 8.2615 6.54211 8.35717 6.59187C8.45284 6.64164 8.55915 6.66745 8.66699 6.6671H13.3337C13.4598 6.66667 13.5835 6.70205 13.6904 6.76912C13.7972 6.83619 13.8828 6.9322 13.9373 7.046C13.9917 7.1598 14.0128 7.28671 13.998 7.412C13.9832 7.53728 13.9331 7.6558 13.8537 7.75377L7.25365 14.5538C7.20415 14.6109 7.13668 14.6495 7.06233 14.6633C6.98798 14.677 6.91117 14.6651 6.8445 14.6294C6.77783 14.5938 6.72526 14.5365 6.69543 14.467C6.6656 14.3976 6.66027 14.32 6.68032 14.2471L7.96032 10.2338C7.99806 10.1328 8.01074 10.0241 7.99726 9.9171C7.98378 9.81011 7.94455 9.70798 7.88293 9.61948C7.82131 9.53099 7.73914 9.45876 7.64347 9.40899C7.5478 9.35923 7.44149 9.33342 7.33365 9.33377H2.66699Z" fill="white"/>
                        </svg>
                        AI Recommendations
                        <i className={`fa-regular fa-circle-check ${style.action_btn_icon}`}></i>
                    </button>
                    <button className={`${style.action_btn} ${style.secondary}`}>
                        <svg viewBox="0 0 16 16" fill="none">
                            <path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.5 1.5V9.5C1.5 9.76522 1.60536 10.0196 1.79289 10.2071C1.98043 10.3946 2.23478 10.5 2.5 10.5H10.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Dashboard
                        <i className={`fa-regular fa-circle-check ${style.action_btn_icon}`}></i>
                    </button>
                </div>

              
                <div className={`${style.features}`}>
                    <div className={`${style.feature_item}`}>
                        <svg style={{color:"#00A63E"}} viewBox="0 0 16 16" fill="none">
                            <path d="M13.3337 8.66664C13.3337 12 11.0003 13.6666 8.22699 14.6333C8.08177 14.6825 7.92402 14.6802 7.78033 14.6266C5.00033 13.6666 2.66699 12 2.66699 8.66664V3.99997C2.66699 3.82316 2.73723 3.65359 2.86225 3.52857C2.98728 3.40355 3.15685 3.33331 3.33366 3.33331C4.66699 3.33331 6.33366 2.53331 7.49366 1.51997C7.6349 1.39931 7.81456 1.33301 8.00033 1.33301C8.18609 1.33301 8.36576 1.39931 8.50699 1.51997C9.67366 2.53997 11.3337 3.33331 12.667 3.33331C12.8438 3.33331 13.0134 3.40355 13.1384 3.52857C13.2634 3.65359 13.3337 3.82316 13.3337 3.99997V8.66664Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 8.00033L7.33333 9.33366L10 6.66699"  stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Secure Setup</span>
                    </div>
                    <div className={`${style.feature_item}`}>
                        <svg viewBox="0 0 16 16" fill="none">
                            <path d="M2.66699 9.33377C2.54083 9.3342 2.41714 9.29882 2.31029 9.23175C2.20344 9.16468 2.11781 9.06867 2.06335 8.95487C2.0089 8.84107 1.98785 8.71416 2.00265 8.58887C2.01746 8.46359 2.06751 8.34507 2.14699 8.2471L8.74699 1.4471C8.7965 1.38996 8.86396 1.35134 8.93831 1.33759C9.01266 1.32384 9.08947 1.33578 9.15614 1.37144C9.22281 1.4071 9.27538 1.46437 9.30521 1.53384C9.33504 1.60331 9.34037 1.68087 9.32032 1.75377L8.04032 5.7671C8.00258 5.86812 7.9899 5.97678 8.00338 6.08377C8.01686 6.19076 8.05609 6.29289 8.11771 6.38139C8.17933 6.46988 8.2615 6.54211 8.35717 6.59187C8.45284 6.64164 8.55915 6.66745 8.66699 6.6671H13.3337C13.4598 6.66667 13.5835 6.70205 13.6904 6.76912C13.7972 6.83619 13.8828 6.9322 13.9373 7.046C13.9917 7.1598 14.0128 7.28671 13.998 7.412C13.9832 7.53728 13.9331 7.6558 13.8537 7.75377L7.25365 14.5538C7.20415 14.6109 7.13668 14.6495 7.06233 14.6633C6.98798 14.677 6.91117 14.6651 6.8445 14.6294C6.77783 14.5938 6.72526 14.5365 6.69543 14.467C6.6656 14.3976 6.66027 14.32 6.68032 14.2471L7.96032 10.2338C7.99806 10.1328 8.01074 10.0241 7.99726 9.9171C7.98378 9.81011 7.94455 9.70798 7.88293 9.61948C7.82131 9.53099 7.73914 9.45876 7.64347 9.40899C7.5478 9.35923 7.44149 9.33342 7.33365 9.33377H2.66699Z" stroke="#3D1B6A"/>
                        </svg>
                        <span>Instant Access</span>
                    </div>
                    <div className={`${style.feature_item}`}>
                        <svg viewBox="0 0 16 16" fill="none">
                            <path d="M10.3178 8.59375L11.3278 14.2778C11.3391 14.3447 11.3298 14.4135 11.3009 14.4749C11.2721 14.5364 11.2252 14.5875 11.1665 14.6216C11.1077 14.6557 11.04 14.671 10.9724 14.6656C10.9047 14.6601 10.8403 14.6341 10.7878 14.5911L8.40117 12.7997C8.28595 12.7137 8.14599 12.6672 8.00217 12.6672C7.85835 12.6672 7.71838 12.7137 7.60317 12.7997L5.2125 14.5904C5.16005 14.6334 5.09574 14.6593 5.02816 14.6648C4.96059 14.6702 4.89295 14.655 4.83428 14.621C4.7756 14.587 4.72868 14.536 4.69978 14.4746C4.67088 14.4133 4.66136 14.3446 4.6725 14.2778L5.68183 8.59375" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 9.33301C10.2091 9.33301 12 7.54215 12 5.33301C12 3.12387 10.2091 1.33301 8 1.33301C5.79086 1.33301 4 3.12387 4 5.33301C4 7.54215 5.79086 9.33301 8 9.33301Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Premium Features</span>
                    </div>
                </div>
            </div>

            
            <div className={`${style.data_card}`}>
                <div className={`${style.card_header}`}>
                    <div className={`${style.card_icon}`}>
                        <svg viewBox="0 0 32 32" fill="none">
                            <path d="M16 10.667C22.6274 10.667 28 8.87613 28 6.66699C28 4.45785 22.6274 2.66699 16 2.66699C9.37258 2.66699 4 4.45785 4 6.66699C4 8.87613 9.37258 10.667 16 10.667Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 16C4 17.0609 5.26428 18.0783 7.51472 18.8284C9.76515 19.5786 12.8174 20 16 20C19.1826 20 22.2348 19.5786 24.4853 18.8284C26.7357 18.0783 28 17.0609 28 16" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 6.66699V25.3337C4 26.3945 5.26428 27.4119 7.51472 28.1621C9.76516 28.9122 12.8174 29.3337 16 29.3337C19.1826 29.3337 22.2348 28.9122 24.4853 28.1621C26.7357 27.4119 28 26.3945 28 25.3337V6.66699" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className={`${style.timer_badge}`}>
                        
                        <span><i className="fa-regular fa-clock"></i> 5-10 min</span>
                    </div>
                </div>
                <h2 className={`${style.card_title}`}>Connect Your Data</h2>
                <span className={`${style.card_badge}`}>Secure Connection</span>
                <p className={`${style.card_description}`}>Connect your existing database and start analysing your real business data immediately.</p>
                <ul className={`${style.card_features}`}>
                    <li>
                        <i style={{color:"#3D1B6A"}} className="fa-regular fa-circle-check"></i>
                        <span>Use your actual business data</span>
                    </li>
                    <li>
                        <i style={{color:"#3D1B6A"}} className="fa-regular fa-circle-check"></i>
                        <span>Step-by-step integration guide</span>
                    </li>
                    <li>
                       <i style={{color:"#3D1B6A"}} className="fa-regular fa-circle-check"></i>
                        <span>Secure encrypted connection</span>
                    </li>
                    <li>
                        {/* <svg viewBox="0 0 16 16" fill="none">
                            <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> */}
                        <i style={{color:"#3D1B6A"}} className="fa-regular fa-circle-check"></i>
                        <span>Real-time data synchronization</span>
                    </li>
                </ul>
            </div>

            
            <button className={`${style.setup_btn}`}>Complete your Setup</button>
            <p className={`${style.help_text}`}>Need help? <a href="#contact">Contact Us</a></p>
        </div>
    </main>


    </>
  )
}
