import React, { useState } from 'react'
import style from './Demo.module.css'
export default function Demo() {
    const Features = [
        "Dashboard",
        "AI Recommendations",
        "AI Chatbot",
        
        
    ]
    const [activeTab, setActiveTab] = useState(0);

    return (

        <>

            <div className={`${style.main_container}`}>

                <div className={`${style.hero_section}`}>
                    <div className={`${style.hero_content}`}>
                        <div className={`${style.badge}`}>Interactive Demo with Sample Data</div>
                        <h1 className={`${style.hero_title}`}>Experience Namaa in Action</h1>
                        <p className={`${style.hero_description}`}>Explore real features with sample business data. See how AI-powered insights can transform your decision-making.</p>
                    </div>
                </div>


                <div className={`${style.tabs_section}`}>
                    <div className={style.tabsContainer}>
                        <div className={style.Tabs}>
                            {Features.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`${style.Tab} ${activeTab === index ? style.Active : ""}`}
                                    style={{ border: "none" }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className={`${style.dashboard_container}`}>
                        <p className={`${style.dashboard_link}`}>Dashboard Link</p>
                    </div>
                </div>


                <div className={`${style.cta_section}`}>
                    <div className={`${style.cta_content}`}>
                        <h2 className={`${style.cta_title}`}>Ready to Use Your Own Data?</h2>
                        <p className={`${style.cta_description}`}>This demo shows what's possible with Namaa. Connect your actual business data to get personalized insights and recommendations.</p>
                        <div className={`${style.cta_buttons}`}>
                            <button className={`${style.btn_primary}`}>
                                View Pricing Plans
                                <i className={`fa-solid fa-arrow-right ${style.arrow_right}`}></i>
                            </button>
                            <button className={`${style.btn_secondary}`}>Explore Features</button>
                        </div>
                    </div>
                </div>


            </div>
        </>


    )
}
