import React, { useEffect } from 'react'
import style from './CheckEmail.module.css'
import imghero from "../../assets/images/heroimage.jpeg"
import api from "../../api";
import logo from "../../assets/images/logo.png"
import { useState } from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function CheckEmail() {

    const email = localStorage.getItem("email");
    // console.log(email.trim());
    const [time, setTime] = useState(50);


    async function resendEmail() {
        try {
            const response = await api.post("/Auth/resend-confirm-email", { email });
            Swal.fire({
                icon: "success",
                title: "Email Sent!",
                text: "We've sent you a link to reset your password. Please check your inbox.",
                background: "#0d1117",
                color: "#ffffff",
                confirmButtonColor: "rgba(0, 71, 171, 0.2)",
                customClass: {
                    popup: "custom-popup",
                    title: "custom-title",
                    confirmButton: "custom-btn",
                    htmlContainer: "custom-text",
                },
            });
            console.log("recieved");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.errors[1] || "the selected email is invalid",
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
                        height: "60px",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                    },
                    iconTheme: {
                        primary: "#FF4D4F",
                        secondary: "#ffffff",
                    },
                }
            );
        }
    }

    useEffect(() => {
        if (time === 0) return;

        const timer = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);
    return (
        <>
            <div className={`${style.page_container}`}>

                <div className={`${style.hero_section}`}>

                    <div className={`${style.hero_background}`}>
                        <img src={imghero} alt="" />
                    </div>


                    <div className={`${style.header_logo}`}>
                        <img src={logo} alt="Namaa Logo" className={style.logo_icon} />
                        <span className={`${style.logo_text}`}>Namaa</span>
                    </div>


                    <div className={`${style.content_wrapper}`}>
                        <div className={`${style.checkemail_card}`} >
                            <div className={`${style.card_inner}`} >



                                <div className={`${style.card_header}`}  >
                                    <h1 className={`${style.main_title}`} >Check your email</h1>
                                    <p className={`${style.subtitle}`}>We’ve sent a confirmation link to</p>
                                    <p className={`${style.email_subtitle}`}>{email}</p>
                                    <p className={`${style.instruction}`}>Please click the link to activate your account.</p>
                                </div>

                                <div className={`${style.warning_box}`}>

                                    <p className={`${style.warning_text}`}><i className={`fa-solid fa-triangle-exclamation ${style.warn_icon}`}></i>If you don't see the email, check your spam or promotions folder.</p>
                                </div>


                                <p className={`${style.p_resend}`}>
                                    Didn't receive the email?{" "}
                                    <span
                                        className={`${style.resend_link} ${time > 0 ? style.disabled : ""}`}
                                        onClick={time === 0 ? resendEmail : null}
                                    >
                                        Resend email
                                    </span>{" "}
                                    in 00:{time.toString().padStart(2, "0")}
                                </p>


                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </>








    )
}
