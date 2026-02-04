import React from 'react'
import style from './Biling.module.css'
import { Link } from 'react-router-dom'
export default function Biling() {
    return (




        <main className={`${style.main_content}`}>
            <div className={`${style.profile_page}`}>

                <div className={`${style.profile_header}`} >
                    <div className={`${style.profile_header_left}`} >
                        <button className={`${style.back_btn}`} aria-label="Go back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19 12H5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className={`${style.profile_header_text}`} >
                            <h1 className={`${style.profile_title}`}>Profile Settings</h1>
                            <p className={`${style.profile_subtitle}`} >Manage your account and preferences</p>
                        </div>
                    </div>
                    <button className={`${style.sign_out_btn}`} >
                        {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V3.33333C14 2.97971 13.8595 2.64057 13.6095 2.39052C13.3594 2.14048 13.0203 2 12.6667 2H10" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14 8H6" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg> */}
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Sign Out</span>
                    </button>
                </div>


                <div className={`${style.content_wrapper}`} >

                    <aside className={`${style.sidebar}`}>

                        <div className={`${style.profile_card}`} >
                            <div className={`${style.avatar_wrapper}`} >
                                <div className={`${style.avatar}`} >
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 9C16.3431 9 15 10.3431 15 12C15 13.6569 16.3431 15 18 15C19.6569 15 21 13.6569 21 12C21 10.3431 19.6569 9 18 9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M24 24V22C24 20.3431 22.6569 19 21 19H15C13.3431 19 12 20.3431 12 22V24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <span className={`${style.camera_icon}`} >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="7" cy="7" r="7" fill="white" />
                                        <path d="M9.33 4.33H8.67L8 3H6L5.33 4.33H4.67C4.3 4.33 4 4.63 4 5V9C4 9.37 4.3 9.67 4.67 9.67H9.33C9.7 9.67 10 9.37 10 9V5C10 4.63 9.7 4.33 9.33 4.33ZM7 8.67C6.08 8.67 5.33 7.92 5.33 7C5.33 6.08 6.08 5.33 7 5.33C7.92 5.33 8.67 6.08 8.67 7C8.67 7.92 7.92 8.67 7 8.67Z" fill="#6B3FA0" />
                                    </svg>
                                </span>
                            </div>
                            <h3 className={`${style.profile_name}`}>Sara Hesham</h3>
                            <p className={`${style.profile_role}`}>CEO</p>
                            <p className={`${style.profile_company}`}>TechVenture Inc.</p>

                            <div className={`${style.profile_info}`} >
                                <div className={`${style.info_row}`} >
                                    <span className={`${style.info_label}`} >Plan</span>
                                    <span className={`${style.badge}`}>No Plan</span>
                                </div>
                                <div className={`${style.info_row}`} >
                                    <span className={`${style.info_label}`} >Status</span>
                                    <span className={`${style.badge} ${style.badge_warning}`} >Free</span>
                                </div>
                            </div>

                            <button className={`${style.btn_choose_plan}`}>Choose a Plan</button>
                        </div>


                        <div className={`${style.help_card}`}>
                            <h4 className={`${style.help_title}`} >Need Help?</h4>
                            <p className={`${style.help_text}`}>Contact our support team for assistance</p>
                            <button className={`${style.btn_contact}`}>
                                {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 10.6667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="8" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5" />
                                </svg> */}
                                <span>Contact Support</span>
                            </button>
                        </div>
                    </aside>


                    <div className={`${style.main_section}`}>

                        <div className={`${style.TabsContainer}`}>
                            <div className={`${style.Tabs}`}>
                                <button className={`${style.Tab}`}>
                                    Profile

                                </button>
                                <button className={`${style.Tab} ${style.sub}`}> Subscription</button>
                                <button className={`${style.Tab} ${style.Active}`}>Biling</button>
                                <button className={`${style.Tab}`}>Security</button>
                            </div>
                        </div>


                        <div className={`${style.subscription_content}`}>

                            <div className={`${style.no_subscription_card}`} >
                                <h2 className={`${style.no_subscription_title}`} >No Biling Information</h2>
                                <p className={`${style.no_subscription_text}`}>Subscribe to a plan to manage billing and payment methods</p>
                                <button className={`${style.btn_view_plans}`}>View Plans</button>
                            </div>


                            {/* <div className={`${style.pricing_cards}`}>

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
                             </div> */}

                            <div className={`${style.subscription_img_parent}`}>
                                <div className={`${style.img_part}`}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >




    )
}
