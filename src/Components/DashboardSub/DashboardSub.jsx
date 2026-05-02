import React, { useContext, useEffect, useState } from 'react'
import style from './DashboardSub.module.css'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import api from "../../api";
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import { CartContext } from '../../context/CartContext'

export default function DashboardSubscription() {

    const navigate = useNavigate()
    const { userToken } = useContext(userContext)
    const { cartvalue, getCart } = useContext(CartContext)

    const [autoRenewMap, setAutoRenewMap] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isopen1, setisopen1] = useState(false)
    const [isopen2, setisopen2] = useState(false)

    const [supscriptionPlans, setsupscriptionPlans] = useState(null)

    const [availablePlans, setavailablePlans] = useState(null);
    const [availablePlan, setavailablePlan] = useState([])
    const [activePlanIndex, setActivePlanIndex] = useState(1)
    const [planDir, setPlanDir] = useState('next')

    const getPlanAnimClass = (position, dir) => {
        if (position === 0) return dir === 'next' ? style.card_left_next : style.card_left_prev
        if (position === 1) return dir === 'next' ? style.card_center_next : style.card_center_prev
        if (position === 2) return dir === 'next' ? style.card_right_next : style.card_right_prev
    }


    // const availablePlan = [
    //     {
    //         name: "Starter",
    //         price: "EGP 1,450",
    //         type: "downgrade",
    //         features: ["2 Data Sources", "Basic Analytics", "Email Support"]
    //     },
    //     {
    //         name: "Pro",
    //         price: "EGP 3,950",
    //         type: "current",
    //         popular: true,
    //         features: ["5 Data Sources", "AI Recommendations", "Custom Dashboards", "Priority Support"]
    //     },
    //     {
    //         name: "Enterprise",
    //         price: "EGP 9,950",
    //         type: "upgrade",
    //         features: ["Unlimited Sources", "Full AI Suite", "Custom Dashboards", "Dedicated Support", "API Access"]
    //     },
    //     {
    //         name: "Starter",
    //         price: "EGP 1,450",
    //         type: "downgrade",
    //         features: ["2 Data Sources", "Basic Analytics", "Email Support"]
    //     },
    //     {
    //         name: "Pro",
    //         price: "EGP 3,950",
    //         type: "current",
    //         popular: true,
    //         features: ["5 Data Sources", "AI Recommendations", "Custom Dashboards", "Priority Support"]
    //     },
    // ]

    const visiblePlanIndices = availablePlan?.length ? [
        (activePlanIndex - 1 + availablePlan?.length) % availablePlan?.length,
        activePlanIndex,
        (activePlanIndex + 1) % availablePlan?.length
    ] : [];

    const handleCancel = async ({ subscriptionId, subscriptionItemId = null }) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will cancel your subscription!",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, cancel it!"
        });

        if (!result.isConfirmed) return;

        try {
            let url = "";

            if (subscriptionItemId) {
                url = `/ClientSubscriptions/cancel-customized-plan-item/${subscriptionId}/${subscriptionItemId}`;
            } else {
                url = `/ClientSubscriptions/cancel-standard-package/${subscriptionId}`;
            }

            const response = await api.put(url, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            console.log(response)
            getPlans()
            toast.success("Subscription cancelled successfully");

        } catch (error) {
            toast.error(
                error.response?.data?.errors[1] ||
                "canceld failed",
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

    const handleRovke = async ({ subscriptionId, subscriptionItemId = null }) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will Revoke your subscription!",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, Revoke it!"
        });

        if (!result.isConfirmed) return

        try {
            let url = ""

            if (subscriptionItemId) {
                url = `/ClientSubscriptions/reactivate-customized-plan-item/${subscriptionId}/${subscriptionItemId}`
            } else {
                url = `/ClientSubscriptions/reactivate-standard-package/${subscriptionId}`
            }

            const response = await api.put(url, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            console.log(response)
            getPlans()
            toast.success("Subscription Revoke successfully");
        }
        catch (error) {
            toast.error(
                error.response?.data?.errors[1] ||
                "revoking failed",
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

    const handlePlanFlow = async (plan) => {

        const modeResult = await Swal.fire({
            title: "When do you want to apply this change?",
            icon: "question",
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Now",
            denyButtonText: "Later",
            cancelButtonText: "Cancel",
            buttonsStyling: false,
            customClass: {
                confirmButton: style.swal_confirm,
                denyButton: style.swal_deny,
                cancelButton: style.swal_cancel,
            }
        });

        if (modeResult.isDismissed) return;

        const mode = modeResult.isConfirmed ? "now" : "schedule";

        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: `You will change your plan ${mode === "now" ? "immediately" : "later"}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, continue",
            buttonsStyling: false,
            customClass: {
                confirmButton: style.swal_confirm,
                cancelButton: style.swal_cancel,
            }
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const subscriptionId = supscriptionPlans.subscriptionId;
            const packageId = plan.id;

            let response;

            if (mode === "now") {

                response = await api.post(
                    `/Orders/package-change/${subscriptionId}/${packageId}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                console.log(response);

                const payUrl = response?.data?.paymentCheckoutUrl;

                if (payUrl) {
                    window.open(payUrl, "_blank"); // 👈 مهم جدًا
                }

            } else {

                response = await api.put(
                    `/ClientSubscriptions/schedule-new-standard-package/${subscriptionId}/${packageId}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                console.log(response);
            }

            toast.success(
                `Plan ${mode === "now" ? "changed" : "scheduled"} successfully`
            );

            getPlans();

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    const handleTerminate = async ({ subscriptionId, subscriptionItemId = null }) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will terminate your subscription!",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, terminate it!"
        });

        if (!result.isConfirmed) return

        try {
            let url = ""

            if (subscriptionItemId) {
                url = `/ClientSubscriptions/terminate-customized-plan-item/${subscriptionId}/${subscriptionItemId}`
            } else {
                url = `/ClientSubscriptions/terminate-standard-package/${subscriptionId}`
            }

            const response = await api.put(url, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            console.log(response)
            getPlans()
            toast.success("Subscription terminated successfully");
        }
        catch (error) {
            toast.error(
                error.response?.data?.errors[1] ||
                "terminated failed",
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

            if (data.planType === "StandardPackage") {
                initialAutoRenewMap[data.subscriptionId] = data.autoRenewal;
            } else {
                data.includedFeatures?.forEach((feature) => {
                    const key = `${data.subscriptionId}-${feature.serviceId}`;
                    initialAutoRenewMap[key] = feature.autoRenewal;
                });
            }

            setAutoRenewMap(initialAutoRenewMap);

        } catch (error) {
            const status = error.response?.status;

            if (status === 404) {
                setsupscriptionPlans(null);
                return;
            }

            console.log(error);

            toast.error(
                error.response?.data?.errors?.[0] || "Something went wrong",
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

    async function getPackagePlans() {
        try {
            let { data } = await api.get(`/Packages`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            });

            console.log(data);
            setavailablePlan(data);

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.errors?.[0] || "Something went wrong",
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

    const formatDuration = (days) => {
        if (!days) return "";

        if (days > 30 && days % 30 === 0) {
            const months = days / 30;
            return `${months} months`;
        }

        return `${days} days`;
    };

    useEffect(() => {
        getPlans()
    }, [])
    useEffect(() => {
        if (supscriptionPlans && supscriptionPlans.planType !== "StandardPackage") {
            getAvailablePlans();
        }
        else {
            getPackagePlans()
        }
    }, [supscriptionPlans]);
    useEffect(() => {
        if (availablePlan?.length > 0) {
            const popularIndex = availablePlan.findIndex(
                (p) => Number(p.priority) === 1
            );

            if (popularIndex !== -1) {
                setActivePlanIndex(popularIndex);
            }
        }
    }, [availablePlan]);
    return (


        <>


            <div className={`${style.content_wrapper}`}>
                <div className={`${style.page_title}`}>
                    <h1>Subscription</h1>
                    <p>Manage your plan and service subscriptions</p>
                </div>

                {
                    supscriptionPlans ? <>
                        {supscriptionPlans?.planType === "StandardPackage" ? <>
                            <div className={`${style.subscription_card}`}>
                                <h2>Current Subscription</h2>
                                {supscriptionPlans && (
                                    <div key={supscriptionPlans.subscriptionId} className={`${style.subscription_card_parent}`}>
                                        <div className={`${style.plan_header}`}>
                                            <div>
                                                <h3>{supscriptionPlans.packageName}</h3>
                                                <p className={`${style.price}`}>EGP {supscriptionPlans.packagePrice}</p>
                                            </div>
                                            <span className={`${style.status_badge} ${supscriptionPlans.packageStatus === "Active" ? "" : style.canceled_badge}`}>{supscriptionPlans.packageStatus}</span>
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

                                        {supscriptionPlans.packageStatus === "Canceled" ?
                                            <div className={`${style.cancel_parent}`}>
                                                <i class="fa-solid fa-triangle-exclamation"></i>
                                                <div className={`${style.cancel_info}`}>
                                                    <h3>Subscription Cancelled</h3>
                                                    <p>Your plan will remain active until May 20, 2026. After that, all services will be paused.</p>
                                                </div>
                                            </div> :
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

                                        }

                                        {
                                            supscriptionPlans.packageStatus === "Canceled" ? <>
                                                <div className={`${style.btn_parent}`}>
                                                    <button onClick={() => handleRovke({ subscriptionId: supscriptionPlans.subscriptionId })} className={`${style.revoke_btn}`} type='button'><i class="fa-solid fa-arrows-rotate"></i> Resume Subscription</button>
                                                    <button onClick={() => handleTerminate({ subscriptionId: supscriptionPlans.subscriptionId })} className={`${style.terminate_btn}`} type='button'><i class="fa-solid fa-ban"></i>End Now</button>

                                                </div>
                                            </> : <button onClick={() => handleCancel({ subscriptionId: supscriptionPlans.subscriptionId })} className={`${style.cancel_btn}`}>Cancel Subscription</button>

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
                                                <span className={`${style.status_badge} ${individualFeature.subscriptionStatus === "Active" ? "" : style.canceled_badge}`}>{individualFeature.subscriptionStatus}</span>
                                            </div>

                                            <div className={`${style.subscription_card_info}`}>

                                                {individualFeature.subscriptionStatus === "Canceled" ?
                                                    <div className={`${style.cancel_parent}`}>
                                                        <i class="fa-solid fa-triangle-exclamation"></i>
                                                        <div className={`${style.cancel_info}`}>
                                                            <h3>Subscription Cancelled</h3>
                                                            <p>Your plan will remain active until May 20, 2026. After that, all services will be paused.</p>
                                                        </div>
                                                    </div> : <div className={`${style.auto_renewal2}`}>
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
                                                    </div>}


                                                <div>
                                                    {
                                                        individualFeature.subscriptionStatus === "Canceled" ? <>
                                                            <button onClick={() => handleRovke({
                                                                subscriptionId: supscriptionPlans.subscriptionId,
                                                                subscriptionItemId: individualFeature.subscriptionItemId
                                                            })} className={`${style.revoke_btn}`} type='button'><i class="fa-solid fa-arrows-rotate"></i> Resume Subscription</button>
                                                            <button onClick={() => handleTerminate({
                                                                subscriptionId: supscriptionPlans.subscriptionId,
                                                                subscriptionItemId: individualFeature.subscriptionItemId
                                                            })} className={`${style.terminate_btn}`} type='button'><i class="fa-solid fa-ban"></i>End Now</button>

                                                        </> : <button onClick={() => handleCancel({
                                                            subscriptionId: supscriptionPlans.subscriptionId,
                                                            subscriptionItemId: individualFeature.subscriptionItemId
                                                        })} className={`${style.cancel_btn2}`}>Cancel Subscription</button>

                                                    }
                                                </div>


                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>

                        </>}
                    </> : <>
                        <div className={`${style.no_subscriptions}`}>
                            <h2>No Active Subscription</h2>
                            <p>You don’t have any plan right now.</p>
                            <button className={`${style.btn_no_sub}`} onClick={() => navigate("/pricing")}>
                                Browse Plans
                            </button>
                        </div>
                    </>
                }






                {supscriptionPlans?.planType === "StandardPackage" && availablePlan?.length > 0 ? (
                    <div className={style.available_plans}>
                        <h2>Available Plans</h2>

                        <div className={style.plans_carousel_wrapper}>


                            <button
                                className={style.plans_carousel_arrow}
                                onClick={() => {
                                    if (!availablePlan.length) return;
                                    setPlanDir('prev');
                                    setActivePlanIndex(prev =>
                                        (prev - 1 + availablePlan.length) % availablePlan.length
                                    );
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18L9 12L15 6" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>


                            <div className={style.plans_carousel_track}>
                                {visiblePlanIndices.map((planIdx, position) => {

                                    const plan = availablePlan[planIdx];
                                    if (!plan) return null;

                                    const isCenter = position === 1;

                                    return (
                                        <div
                                            key={`${planIdx}-${activePlanIndex}`}
                                            className={`
                                ${style.plan_card}
                                ${isCenter ? style.carousel_card_active : style.carousel_card_side}
                                ${getPlanAnimClass(position, planDir)}
                            `}
                                            onClick={() => {
                                                if (!isCenter) {
                                                    setPlanDir(position === 2 ? 'next' : 'prev');
                                                    setActivePlanIndex(planIdx);
                                                }
                                            }}
                                        >


                                            {Number(plan.priority) === 1 && (
                                                <div className={style.popular_badge}>
                                                    <i className="fa-solid fa-bolt"></i> Most Popular
                                                </div>
                                            )}

                                            <h3>{plan.name}</h3>

                                           

                                            {plan?.saleAmount && plan?.price && (
                                                <span className={style.discount_badge}>
                                                    {Math.round((plan.saleAmount / plan.price) * 100)}% OFF
                                                </span>
                                            )}

                                            <div className={style.pricing_amount}>
                                                <div className={style.price}>
                                                    {plan?.salePercentage && plan.salePercentage > 0 ? (
                                                        <>
                                                            <span className={style.price_value}>
                                                                EGP {Math.round(plan.price * (1 - plan.salePercentage / 100))}
                                                            </span>

                                                            <span className={style.individual_old_price}>
                                                                EGP {plan.price}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className={style.price_value}>
                                                            EGP {plan.price}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={style.commitment}>
                                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                        <circle cx="8.5" cy="8.5" r="7" stroke="#3D1B6A" strokeWidth="1.36" />
                                                        <path d="M8.16 4.08V8.16L10.88 9.52" stroke="#3D1B6A" strokeWidth="1.36" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>{formatDuration(plan.durationInDays)} Commitment</span>
                                                </div>
                                            </div>

                                            <ul className={style.plan_features}>
                                                {plan.services?.map((f, i) => (
                                                    <li key={i}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#8A45B2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span className={style.plan_features_p}>{`${f.name} ${f.tokenAmount !== null ? `(${f.tokenAmount} Tokens)` : "(Unlimited Usage)"}`}</span>
                                                    </li>
                                                ))}
                                            </ul>


                                            <button
                                                disabled={plan.planChangeType === "Current"}
                                                className={`${style.availablePlan_btn} ${plan.planChangeType === "Current" ? style.current_btn : ""
                                                    }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePlanFlow(plan);
                                                }}
                                            >
                                                {plan.planChangeType}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>


                            <button
                                className={style.plans_carousel_arrow}
                                onClick={() => {
                                    if (!availablePlan.length) return;
                                    setPlanDir('next');
                                    setActivePlanIndex(prev =>
                                        (prev + 1) % availablePlan.length
                                    );
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18L15 12L9 6" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>


                        <div className={style.plans_carousel_dots}>
                            {availablePlan.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${style.plans_carousel_dot} ${i === activePlanIndex ? style.plans_carousel_dot_active : ''}`}
                                    onClick={() => {
                                        setPlanDir(i > activePlanIndex ? 'next' : 'prev');
                                        setActivePlanIndex(i);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

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
                        <button className={`${style.upgrade_submit_btn}`}>Add on</button>
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
