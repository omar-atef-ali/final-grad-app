import React, { useContext, useEffect, useState } from 'react'
import style from './DashboardSub.module.css'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import api from "../../api";
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import { CartContext } from '../../context/CartContext'
import { color } from 'echarts';

export default function () {

    const navigate = useNavigate()
    const { userToken } = useContext(userContext)
    const { cartvalue, getCart } = useContext(CartContext)

    const [autoRenewMap, setAutoRenewMap] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isopen1, setisopen1] = useState(false)
    const [isopen2, setisopen2] = useState(false)

    const [supscriptionPlans, setsupscriptionPlans] = useState(null)

    const [iscanceled, setiscanceled] = useState(false)

    const [availablePlans, setavailablePlans] = useState(null);


    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will cancel your subscription!",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("Subscription cancelled successfully")
                setiscanceled(true)


            }
        })
    }

    const handleUpgrade = () => {
        Swal.fire({
            title: "Upgrade Plan?",
            text: "You will be charged for upgrade",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, Upgrade"
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("You are being redirected to complete your upgrade.");
                setTimeout(() => {
                    navigate("/demo")
                }, 1500);
            }
        })
    }

    const handleDowngrade = () => {
        Swal.fire({
            title: "Downgrade Plan?",
            text: "You will be Downgrade",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, Downgrade"
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("You are being redirected to complete your Downgrade.");
                setTimeout(() => {
                    navigate("/demo")
                }, 1500);
            }
        })
    }
    // const handleToggle = async (id) => {
    //     const newValue = !autoRenewMap[id];

    //     const result = await Swal.fire({
    //         title: newValue ? "Enable Auto Renewal?" : "Disable Auto Renewal?",
    //         icon: "info",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes",
    //         cancelButtonText: "No",
    //         buttonsStyling: false,
    //     });


    //     if (!result.isConfirmed) return;

    //     try {

    //         setAutoRenewMap((prev) => ({
    //             ...prev,
    //             [id]: newValue
    //         }));


    //         await api.put(
    //             `/ClientSubscriptions/toggle-auto-renewal`,
    //             {
    //                 id,
    //                 autoRenewal: newValue
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${userToken}`,
    //                 },
    //             }
    //         );

    //         toast.success("Updated successfully");

    //     } catch (error) {

    //         setAutoRenewMap((prev) => ({
    //             ...prev,
    //             [id]: !newValue
    //         }));

    //         toast.error("Update failed");
    //     }
    // };

    const handleToggle = async ({ subscriptionId, serviceId = null }) => {
        const key = serviceId ? `${subscriptionId}-${serviceId}` : subscriptionId;
        const newValue = !autoRenewMap[key];

        const result = await Swal.fire({
            title: newValue ? "Enable Auto Renewal?" : "Disable Auto Renewal?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            buttonsStyling: false,
        });

        if (!result.isConfirmed) return;

        try {

            setAutoRenewMap(prev => ({
                ...prev,
                [key]: newValue
            }));

            let url = "";

            if (serviceId) {

                url = `/ClientSubscriptions/customized-plan-auto-renewal-toggle/${subscriptionId}/${serviceId}`;
            } else {

                url = `/ClientSubscriptions/standard-package-auto-renewal-toggle/${subscriptionId}`;
            }

            await api.put(url, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            toast.success("Updated successfully");

        } catch (error) {

            setAutoRenewMap(prev => ({
                ...prev,
                [key]: !newValue
            }));

            toast.error("Update failed");
        }
    };
    async function getPlans() {
        try {
            let { data } = await api.get(`/ClientSubscriptions/my-plan`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            console.log(data);
            setsupscriptionPlans(data);

            const initialAutoRenewMap = {};

            if (data.planType === 1) {
                initialAutoRenewMap[data.subscriptionId] = data.autoRenewal;
            } else {
                data.includedFeatures?.forEach((feature) => {
                    const key = `${data.subscriptionId}-${feature.serviceId}`;
                    initialAutoRenewMap[key] = feature.autoRenewal;
                });
            }

            setAutoRenewMap(initialAutoRenewMap);

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.errors?.[1] || "Something went wrong",
                {
                    position: "top-center",
                    duration: 4000,
                    style: {
                        background:
                            "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "16px 20px",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        borderRadius: "5px",
                        width: "300px",
                        height: "100%",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    },
                    iconTheme: {
                        primary: "#FF4D4F",
                        secondary: "#ffffff",
                    },
                },
            );
        }
    }

    async function getAvailablePlans() {
        try {
            let { data } = await api.get(`/ClientSubscriptions/available-services-for-customized-plan`);
            console.log(data);
            setavailablePlans(data);
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.errors?.[1] || "Something went wrong",
                {
                    position: "top-center",
                    duration: 4000,
                    style: {
                        background:
                            "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "16px 20px",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        borderRadius: "5px",
                        width: "300px",
                        height: "100%",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    },
                    iconTheme: {
                        primary: "#FF4D4F",
                        secondary: "#ffffff",
                    },
                },
            );
        }
    }


    async function addToCart(id) {
        try {
            let response = await api.post(`/Cart`, {
                serviceId: id
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
            console.log(response)
            toast.success("Added to cart successfully");
            getCart();

        }
        catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.errors[1] ||
                "Something went wrong",
                {
                    position: "top-center",
                    duration: 4000,
                    style: {
                        background:
                            "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "16px 20px",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        borderRadius: "5px",
                        width: "300px",
                        height: "100%",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    },
                    iconTheme: {
                        primary: "#FF4D4F",
                        secondary: "#ffffff",
                    },
                },
            );

        }
    }

    useEffect(() => {
        getPlans()
        getAvailablePlans()
    }, [])
    return (


        <>


            <div className={`${style.content_wrapper}`}>
                <div className={`${style.page_title}`}>
                    <h1>Subscription</h1>
                    <p>Manage your plan and service subscriptions</p>
                </div>

                {supscriptionPlans?.planType === 1 ? <>
                    <div className={`${style.subscription_card}`}>
                        <h2>Current Subscription</h2>
                        {supscriptionPlans && (
                            <div key={supscriptionPlans.subscriptionId} className={`${style.subscription_card_parent}`}>
                                <div className={`${style.plan_header}`}>
                                    <div>
                                        <h3>{supscriptionPlans.packageName}</h3>
                                        <p className={`${style.price}`}>EGP {supscriptionPlans.packagePrice}</p>
                                    </div>
                                    <span className={`${style.status_badge}`}>{supscriptionPlans.packageStatus}</span>
                                </div>
                                <div className={`${style.line}`}>

                                </div>

                                <div className={`${style.included_features}`}>
                                    <h4>Included Features</h4>
                                    <div className={`${style.features_grid}`}>

                                        {supscriptionPlans.includedFeatures.map((feature) => (
                                            <div className={style.feature_item} key={feature.serviceId}>
                                                <i className={`fa-regular fa-circle-check ${style.i_check}`}></i>
                                                <span>{feature.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={`${style.auto_renewal}`}>
                                    <div className={`${style.renewal_info}`}>
                                        <h4>Auto-renewal</h4>
                                        <p>
                                            Automatically renew subscription at{" "}
                                            {new Date(supscriptionPlans.nextRenewalDate).toLocaleDateString("en-GB")}
                                        </p>
                                    </div>
                                    <label className={`${style.toggle_switch}`}>

                                        <input
                                            type="checkbox"
                                            checked={!!autoRenewMap[supscriptionPlans.subscriptionId]}
                                            onChange={() => handleToggle({
                                                subscriptionId: supscriptionPlans.subscriptionId
                                            })}
                                        />
                                        <span className={`${style.slider}`}></span>
                                    </label>
                                </div>

                                {
                                    iscanceled ? <>
                                        <button className={`${style.terminate_btn}`} type='button'>terminate</button>
                                        <button className={`${style.terminate_btn}`} type='button'>revoke</button>
                                    </> : <button onClick={handleCancel} className={`${style.cancel_btn}`}>Cancel Subscription</button>

                                }


                            </div>
                        )}
                    </div>
                </> : <>
                    <div className={`${style.subscription_card}`}>
                        <h2>Current Subscription</h2>
                        <div className={`${style.subscription_card_parent}`}>

                            {supscriptionPlans?.includedFeatures.map((individualFeature) => (
                                <div key={individualFeature.serviceId} className={`${style.sub_parent}`}>
                                    <div className={`${style.plan_header}`}>
                                        <div>
                                            <h3>{individualFeature.name}</h3>

                                            <p className={`${style.price}`}>EGP {individualFeature.price}</p>
                                        </div>
                                        <span className={`${style.status_badge}`}>Active</span>
                                    </div>

                                    <div className={`${style.subscription_card_info}`}>
                                        <div className={`${style.auto_renewal2}`}>
                                            <div className={`${style.renewal_info}`}>
                                                <h4>Auto-renewal</h4>
                                                <p>
                                                    Automatically renew subscription at{" "}
                                                    {new Date(individualFeature.nextRenewalDate).toLocaleDateString("en-GB")}
                                                </p>
                                            </div>
                                            <label className={`${style.toggle_switch}`}>

                                                <input
                                                    type="checkbox"
                                                    checked={!!autoRenewMap[`${supscriptionPlans.subscriptionId}-${individualFeature.serviceId}`]}
                                                    onChange={() => handleToggle({
                                                        subscriptionId: supscriptionPlans.subscriptionId,
                                                        serviceId: individualFeature.serviceId
                                                    })}
                                                />
                                                <span className={`${style.slider}`}></span>
                                            </label>
                                        </div>

                                        <button onClick={handleCancel} className={`${style.cancel_btn2}`}>Cancel Subscription</button>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>

                </>}





                {
                    supscriptionPlans?.planType === 1 ? <div className={`${style.available_plans}`}>
                        <h2>Available Plans</h2>
                        <div className={`${style.plans_grid}`}>

                            <div className={`${style.plan_card}`}>
                                <h3>Starter</h3>
                                <div className={`${style.plan_price}`}>EGP 1,450</div>
                                <ul className={`${style.plan_features}`}>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                </ul>
                                <button onClick={handleDowngrade} className={`${style.plan_btn} ${style.primary}`} >Downgrade</button>
                            </div>


                            <div className={`${style.plan_card} ${style.current}`}>
                                <div className={`${style.popular_badge}`}>

                                    <i class="fa-solid fa-bolt"></i> Most Popular
                                </div>
                                <h3>Pro</h3>
                                <div className={`${style.plan_price}`}>EGP 3,950</div>
                                <ul className={`${style.plan_features}`}>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                </ul>
                                <button className={`${style.plan_btn} ${style.primary}`}>Current Plan</button>
                            </div>


                            <div className={`${style.plan_card}`}>
                                <h3>Enterprise</h3>
                                <div className={`${style.plan_price}`}>EGP 9,950</div>
                                <ul className={`${style.plan_features}`}>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                    <li>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                    </li>
                                </ul>
                                <button onClick={handleUpgrade} className={`${style.plan_btn} ${style.primary}`}>Upgrade</button>
                            </div>

                        </div>
                    </div> : ""

                }

                <div className={`${style.feature_upgrades}`}>
                    <h2>Feature-Level Add-ons</h2>

                    <div className={`${style.feature_upgrades_parent}`}>
                        <div className={`${style.upgrade_item}`}>
                            <div className={`${style.upgrade_info}`}>
                                <div className={`${style.upgrade_icon}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3>Chatbot</h3>
                                    <p>2,100 / 5,000 tokens</p>
                                </div>
                            </div>
                            <div className={`${style.upgrade_action}`}>

                                {
                                    isopen1 ? <button onClick={() => setisopen1(false)} className={`${style.cancel_upgrade_btn}`}>- Cancel</button> : <button onClick={() => setisopen1(prev => !prev)} className={`${style.cancel_upgrade_btn}`}>+ Add on</button>
                                }
                            </div>
                        </div>

                        <div className={`${style.progress_bar}`}>
                            <div className={`${style.progress_fill} ${style.chatbot_progress}`}></div>
                        </div>


                        <div className={`${style.dropdown} ${isopen1 ? style.open : ""}`}>
                            <div className={`${style.upgrade_item}`}>
                                <div className={`${style.upgrade_info}`}>

                                    <div>
                                        <h3><i className="fa-regular fa-clock"></i> Commitment Duration</h3>
                                        <select className={`${style.token_select}`}>
                                            <option>3 months</option>
                                            <option>2 months</option>
                                            <option>1 month</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h3> <i className="fa-solid fa-bolt"></i>Token Allocation</h3>
                                        <select className={`${style.token_select}`}>
                                            <option>100k tokens</option>
                                            <option>200k tokens</option>
                                            <option>500k tokens</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`${style.upgrade_price}`}>
                                    <span>EGP 1,400</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${style.feature_upgrades_parent}`}>
                        <div className={`${style.upgrade_item}`}>
                            <div className={`${style.upgrade_info}`}>
                                <div className={`${style.upgrade_icon} ${style.ai}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 7V11" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 9H18" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 17V19" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 18H3" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3>AI Recommendations</h3>
                                    <p>3,200 / 10,000 tokens</p>
                                </div>
                            </div>
                            <div className={`${style.upgrade_action}`}>
                                {
                                    isopen2 ? <button onClick={() => setisopen2(false)} className={`${style.cancel_upgrade_btn}`}>- Cancel</button> : <button onClick={() => setisopen2(prev => !prev)} className={`${style.cancel_upgrade_btn}`}>+ Add on</button>
                                }
                            </div>
                        </div>

                        <div className={`${style.progress_bar}`} >
                            <div className={`${style.progress_fill} ${style.ai_progress}`}></div>
                        </div>



                        <div className={`${style.dropdown} ${isopen2 ? style.open : ""}`}>
                            <div className={`${style.upgrade_item}`}>
                                <div className={`${style.upgrade_info}`}>

                                    <div>
                                        <h3> <i className="fa-regular fa-clock"></i>Token Allocation</h3>
                                        <select className={`${style.token_select}`}>
                                            <option>100k tokens</option>
                                            <option>200k tokens</option>
                                            <option>500k tokens</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`${style.upgrade_price}`}>
                                    <span>EGP 1,400</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`${style.upgrade_total}`}>
                        <div className={`${style.total_info}`}>
                            <p>Total for token upgrades</p>
                            <h3>EGP 1,400</h3>
                        </div>
                        <button onClick={handleUpgrade} className={`${style.upgrade_submit_btn}`}>Add on</button>
                    </div>
                </div>

                {availablePlans?.length > 0 ?
                    <div className={`${style.New_Features}`}>
                        <h2 className='m-1'>Add New Features</h2>
                        <p style={{ color: "#eb6d4dff", fontSize: "14px" }}>Allow selecting duration and tokens, with the sale being set and controlled when adding the feature to the card</p>

                        <div className={`${style.New_Features_parent}`}>
                            {availablePlans?.map((plan) => (
                                <div key={plan.serviceId} className={`${style.new_feature}`}>
                                    <div className={`${style.new_feature_info}`}>
                                        <div className={`${style.upgrade_icon}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3>{plan.name}</h3>
                                            <p>{plan.subTitle}</p>
                                        </div>
                                    </div>
                                    <div className={`${style.new_feature_info2}`}>
                                        <div className={`d-flex`}>
                                            <h3>{plan.servicePrices?.[0]?.price}</h3><p>/ {plan.servicePrices?.[0]?.durationInDays}</p>
                                        </div>
                                        <div>
                                            {(() => {
                                                const isAdded = cartvalue?.some(item => 
                                                    (typeof item === 'object' && String(item.serviceId) === String(plan.serviceId)) || 
                                                    (typeof item !== 'object' && String(item) === String(plan.serviceId))
                                                );
                                                return (
                                                    <button 
                                                        onClick={() => !isAdded && addToCart(plan.serviceId)} 
                                                        className={`${style.new_feature_info2_btn}`}
                                                        style={{ opacity: isAdded ? 0.5 : 1, cursor: isAdded ? 'default' : 'pointer', border: isAdded ? '1px solid #ccc' : '' }}
                                                        disabled={isAdded}
                                                    >
                                                        <span className={`${style.new_feature_info2_btn_text}`}>
                                                            {isAdded ? "Added" : "+ Add"}
                                                        </span>
                                                    </button>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>))}


                        </div>


                    </div> : ""}
            </div>

        </>




    )
}
