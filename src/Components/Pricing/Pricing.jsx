import React from "react";
import style from "./pricing.module.css";

export default function Pricing() {
    return (
        <>
            <div className={`${style.pricing_page} container-fluid`}>
                <div className={style.pricing_bg}>
                    <div className={`${style.info}`}>
                        <h1
                            className={`${style.header} totalFont text-white mb-2 text-center`}
                        >
                            Pricing
                        </h1>
                        <p className={` totalFont text-white-50 text-center w-75 `}>
                            Choose the perfect plan tailored to your needs,Unlock the best value for your business simple
                            plans, powerful features, and the freedom to upgrade anytime
                        </p>
                    </div>
                </div>

                <div className="container">
                    <div className={`${style.parent_card3} col-12 col-md-6`}>
                        <div className={`${style.customCard3}`}>
                            <h1>sdada</h1>
                        </div>

                        <div className={`${style.customCard3}`}>
                            <h1>sdada</h1>
                        </div>

                        <div className={`${style.parent_card4} col-12`}>
                            <div className={`${style.customCard4}`}>
                                <h1>sdada</h1>
                            </div>



                        </div>




                    </div>

                </div>
                <h4
                    className={`${style.why_deep_h4} ${style.why_deep_h4_2} totalFont text-center`}
                >
                    Your additions
                </h4>
                <div className="container mt-5 mb-5">
                    <h3
                        className={`${style.header} totalFont text-white mb-2 text-center`}
                    >
                        What Our Customers Say
                    </h3>
                    <div className={`${style.parent_cards2} col-12 col-md-4`}>

                        <div className={`${style.customCard2}`}>
                            <h1>sdada</h1>

                        </div>

                        <div className={`${style.customCard2}`}>
                            <h1>sdada</h1>
                        </div>
                        <div className={`${style.customCard2}`}>
                            <h1>sdada</h1>
                        </div>



                    </div>
                </div>
                <div className="container">
                        <div className={`${style.info}`}>
                            <h3
                                className={`${style.header} totalFont text-white mb-2 text-center`}
                            >
                                Ready to Get Started?
                            </h3>
                            <p className={` totalFont text-white-50 text-center w-75 `}>
                                Join thousands of teams already using DeepAi to streamline
                                their operations and boost productivity.
                            </p>
                            <button className={`${style.headerBtn} btn_deeb totalFont`}>
                                Start Free Trial
                            </button>
                        </div>
                </div>


            </div>
        </>
    );
}
