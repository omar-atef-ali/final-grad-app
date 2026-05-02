import React, { useState } from 'react'
import style from './Demo.module.css'
import { useNavigate } from 'react-router-dom';

export default function Demo() {
    const navigate = useNavigate()
    const Features = [
        "Dashboard",
        "AI Recommendations",
        "AI Chatbot",
        "Analytics agent"


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
                        {activeTab === 0 && (
                            <iframe
                                src="https://public.tableau.com/views/GradProject_4th_dash_new/Dashboard2?:embed=yes&:language=en-US&:showVizHome=no&:display_count=n&:toolbar=yes"
                                width="100%"
                                height="900px"
                                style={{ border: "none" }}
                                allowFullScreen
                                title="Namaa Dashboard"
                            />
                        )}

                        {activeTab === 1 && (
                            <div>AI Recommendations content here</div>
                        )}

                        {activeTab === 2 && (
                            <iframe
                                src="https://raccaqpkb2.us-east-1.awsapprunner.com/"
                                width="100%"
                                height="900px"
                                style={{ border: "none" }}
                                allowFullScreen
                                title="Namaa Dashboard"
                            />

                        )}

                        {/* {activeTab === 3 && (
                           
                            
                            window.open("https://smart-analytic-production.up.railway.app/", "_blank")
                           
                        )} */}
                        {activeTab === 3 && (
                            <div className={style.demo_card}>

                                <h2 className={style.demo_title}>
                                    Discover Our Smart Analytics Agent
                                </h2>

                                <p className={style.demo_text}>
                                    Experience how our system transforms raw data into actionable insights
                                    through powerful analytics and intuitive visualizations.
                                </p>

                                <button
                                    onClick={() =>
                                        window.open("https://smart-analytic-production.up.railway.app/", "_blank")
                                    }
                                    className={style.demo_btn}
                                >
                                    View Live Demo
                                </button>

                            </div>
                        )}
                    </div>
                </div>


                <div className={`${style.cta_section}`}>
                    <div className={`${style.cta_content}`}>
                        <h2 className={`${style.cta_title}`}>Ready to Use Your Own Data?</h2>
                        <p className={`${style.cta_description}`}>This demo shows what's possible with Namaa. Connect your actual business data to get personalized insights and recommendations.</p>
                        <div className={`${style.cta_buttons}`}>
                            <button onClick={() => navigate("/pricing")} className={`${style.btn_primary}`}>
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
