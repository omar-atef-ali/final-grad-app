import React, { useContext, useEffect, useState } from 'react'
import style from './DashboardSub.module.css'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import api from "../../api";
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext'

export default function () {

    const navigate = useNavigate()
    const { userToken } = useContext(userContext)

    const [autoRenewMap, setAutoRenewMap] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isopen1, setisopen1] = useState(false)
    const [isopen2, setisopen2] = useState(false)

    const [supscriptionPlans, setsupscriptionPlans] = useState(null)
    const [iscanceled, setiscanceled] = useState(false)


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
            toast.error(error.response?.data?.errors?.[0] || "Something went wrong");
        }
    }

    useEffect(() => {
        getPlans()
    }, [])
    return (


        <>

            <div className={`${style.allparent}`}>
                <div className={`${style.dashboard}`}>

                    {!isSidebarOpen && (
                        <button
                            className={`${style.burger_menu}`}
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    )}

                    <aside className={`${style.sidebar} ${isSidebarOpen ? style.open : ""}`} id="sidebar">

                        <button
                            className={`${style.close_btn}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className={`${style.logo_section}`}>
                            <div className={`${style.logo_icon}`}></div>
                            <div className={`${style.logo_text}`}>
                                <h1>Namaa</h1>
                                <p>AI Platform</p>
                            </div>
                        </div>

                        <nav className={`${style.nav_menu}`}>
                            <a className={`${style.nav_item}`} href="/">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 6L8 2L14 6V13.3333C14 13.687 13.8595 14.0261 13.6095 14.2761C13.3594 14.5262 13.0203 14.6667 12.6667 14.6667H3.33333C2.97971 14.6667 2.64057 14.5262 2.39052 14.2761C2.14048 14.0261 2 13.687 2 13.3333V6Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 14.6667V8H10V14.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Home</span>
                            </a>

                            <a href="#" className={`${style.nav_item}`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12 13.3333V6.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 13.3333V2.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 13.3333V9.33333" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Analytics</span>
                            </a>

                            <a href="#" className={`${style.nav_item}`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.3333 2V4.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.6667 3.33333H12" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.66667 11.3333V12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.33333 12H2" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>AI Recommendations</span>
                            </a>

                            <a href="#" className={`${style.nav_item}`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.66667 6.66667L8 10L11.3333 6.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 10V2" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Data Sources</span>
                            </a>

                            <a href="#" className={`${style.nav_item}`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M13.3333 8.66667V12C13.3333 12.3536 13.1929 12.6928 12.9428 12.9428C12.6928 13.1929 12.3536 13.3333 12 13.3333H4C3.64638 13.3333 3.30724 13.1929 3.05719 12.9428C2.80714 12.6928 2.66667 12.3536 2.66667 12V8.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.6667 4.66667V8C14.6667 8.17681 14.5964 8.34638 14.4714 8.47141C14.3464 8.59643 14.1768 8.66667 14 8.66667H2C1.82319 8.66667 1.65362 8.59643 1.5286 8.47141C1.40357 8.34638 1.33333 8.17681 1.33333 8V4.66667C1.33333 4.48986 1.40357 4.32029 1.5286 4.19526C1.65362 4.07024 1.82319 4 2 4H14C14.1768 4 14.3464 4.07024 14.4714 4.19526C14.5964 4.32029 14.6667 4.48986 14.6667 4.66667Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.66667 4V2.66667C6.66667 2.31304 6.80714 1.97391 7.05719 1.72386C7.30724 1.47381 7.64638 1.33333 8 1.33333C8.35362 1.33333 8.69276 1.47381 8.94281 1.72386C9.19286 1.97391 9.33333 2.31304 9.33333 2.66667V4" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>API Access</span>
                            </a>

                            <a href="#" className={`${style.nav_item} ${style.active}`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M10.6667 2H13.3333V4.66667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.66667 7.33333V4.66667C2.66667 4.31304 2.80714 3.97391 3.05719 3.72386C3.30724 3.47381 3.64638 3.33333 4 3.33333H5.33333" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.3333 7.33333V11.3333C13.3333 11.687 13.1929 12.0261 12.9428 12.2761C12.6928 12.5262 12.3536 12.6667 12 12.6667H4C3.64638 12.6667 3.30724 12.5262 3.05719 12.2761C2.80714 12.0261 2.66667 11.687 2.66667 11.3333V10" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.6667 8C11.0203 8 11.3594 7.85952 11.6095 7.60948C11.8595 7.35943 12 7.02029 12 6.66667C12 6.31304 11.8595 5.97391 11.6095 5.72386C11.3594 5.47381 11.0203 5.33333 10.6667 5.33333H5.33333C4.97971 5.33333 4.64057 5.47381 4.39052 5.72386C4.14048 5.97391 4 6.31304 4 6.66667C4 7.02029 4.14048 7.35943 4.39052 7.60948C4.64057 7.85952 4.97971 8 5.33333 8H10.6667Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Subscription</span>
                            </a>

                            <a href="#" className={`${style.nav_item}`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2 5.33333H14" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Billing</span>
                            </a>

                            <a href="#" className={`${style.nav_item}`}>

                                <i className={`fa-solid fa-gear ${style.i_gear}`}></i>
                                <span>Settings</span>
                            </a>
                        </nav>

                        <div className={`${style.user_profile}`}>
                            <div className={`${style.user_avatar}`}>SH</div>
                            <div className={`${style.user_info}`}>
                                <h3>Sarah Hesham</h3>
                                <p>Premium</p>
                            </div>
                        </div>
                    </aside>


                    <main className={`${style.main_content}`}>
                        <div className={`${style.header}`}>
                            <div className={`${style.breadcrumb}`}>
                                <span>Namaa</span>
                                <span className={`${style.separator}`}>›</span>
                                <span className={`${style.separator_sub}`}>Subscription</span>
                            </div>
                            <div className={`${style.header_actions}`}>
                                <div className={`${style.notification_badge}`}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="#6A7282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42112 18.2537 9.16813 18.1079C8.91514 17.9622 8.70484 17.7526 8.55835 17.5" stroke="#6A7282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className={`${style.badge}`}>2</span>
                                </div>
                                <div className={`${style.user_avatar_header}`}>SH</div>
                            </div>
                        </div>

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
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
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
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
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
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className={`${style.plan_features_p}`}>2 Data Sources</span>
                                                </li>
                                                <li>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
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
                                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                                                    <h3><i class="fa-regular fa-clock"></i> Commitment Duration</h3>
                                                    <select className={`${style.token_select}`}>
                                                        <option>3 months</option>
                                                        <option>2 months</option>
                                                        <option>1 month</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <h3> <i class="fa-solid fa-bolt"></i>Token Allocation</h3>
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
                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M20 7V11" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M22 9H18" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M4 17V19" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M5 18H3" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                                                    <h3> <i class="fa-regular fa-clock"></i>Token Allocation</h3>
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

                            {supscriptionPlans?.planType === 2 ? <div className={`${style.New_Features}`}>
                                <h2>Add New Features</h2>

                                <div className={`${style.New_Features_parent}`}>
                                    <div className={`${style.new_feature}`}>
                                        <div className={`${style.new_feature_info}`}>
                                            <div className={`${style.upgrade_icon}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3>Dashboard</h3>
                                                <p>Analytics dashboards and Reporting</p>
                                            </div>
                                        </div>
                                        <div className={`${style.new_feature_info2}`}>
                                            <div>
                                                <h3>EGP 1.520</h3>
                                                <p>8,000 tokens/mo</p>
                                            </div>
                                            <div>
                                                <button className={`${style.new_feature_info2_btn}`}>+ Add</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${style.new_feature}`}>
                                        <div className={`${style.new_feature_info}`}>
                                            <div className={`${style.upgrade_icon}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3>Dashboard</h3>
                                                <p>Analytics dashboards and Reporting</p>
                                            </div>
                                        </div>
                                        <div className={`${style.new_feature_info2}`}>
                                            <div>
                                                <h3>EGP 1.520</h3>
                                                <p>8,000 tokens/mo</p>
                                            </div>
                                            <div>
                                                <button className={`${style.new_feature_info2_btn}`}>+ Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${style.new_feature}`}>
                                        <div className={`${style.new_feature_info}`}>
                                            <div className={`${style.upgrade_icon}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3>Dashboard</h3>
                                                <p>Analytics dashboards and Reporting</p>
                                            </div>
                                        </div>
                                        <div className={`${style.new_feature_info2}`}>
                                            <div>
                                                <h3>EGP 1.520</h3>
                                                <p>8,000 tokens/mo</p>
                                            </div>
                                            <div>
                                                <button className={`${style.new_feature_info2_btn}`}>+ Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div> : ""}
                        </div>
                    </main>
                </div>
            </div>
        </>




    )
}
