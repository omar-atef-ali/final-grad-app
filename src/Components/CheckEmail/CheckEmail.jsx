import React, { useEffect } from 'react'
import style from './CheckEmail.module.css'
import imghero from "../../assets/images/heroimage.jpeg"
import api from "../../api";
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
                        <svg width="58" height="35" viewBox="0 0 58.4871 44.9604" fill="none">
                            <path d="M29.9536 0.00969049C33.6875 0.00969049 37.4213 -0.0102839 41.1536 0.00969049C48.3035 0.0562973 54.864 4.83682 57.3601 11.8145C58.4358 14.8273 58.6694 17.945 58.3627 21.1459C57.9131 25.8465 56.5736 30.2092 54.0362 34.1192C50.1212 40.1548 44.6031 43.5088 37.7693 44.6257C35.4527 45.0036 33.1282 44.9586 30.8005 44.9586C29.8345 44.9586 29.3181 44.4959 29.2609 43.6586C29.1989 42.7614 29.7376 42.0723 30.6909 42.0124C31.7459 41.9442 32.8089 42.0008 33.8686 41.9708C40.302 41.7877 45.8726 39.4657 50.2849 34.4804C53.3768 30.9849 54.9434 26.727 55.4741 22.0347C55.8427 18.7789 55.803 15.5431 54.5748 12.4587C52.6904 7.73976 49.3141 4.84681 44.665 3.5052C42.8601 2.9842 41.0106 2.886 39.1596 2.87435C32.2496 2.83107 25.3364 2.8577 18.428 2.85604C18.1372 2.85604 17.8433 2.86769 17.5541 2.84106C17.2224 2.80891 16.9128 2.65311 16.6816 2.402C16.4504 2.1509 16.3129 1.82117 16.2941 1.47281C16.2892 1.13657 16.3983 0.809396 16.6019 0.549438C16.8056 0.289481 17.0906 0.113573 17.4063 0.0529699C17.7221 0.00719106 18.0411 -0.00896493 18.3596 0.00469711H29.9584L29.9536 0.00969049Z" fill="white" />
                            <path d="M22.8484 34.3485H10.4552C10.1903 34.3608 9.9249 34.3547 9.66076 34.3302C8.94418 34.2287 8.49294 33.7976 8.42303 33.0385C8.35312 32.2795 8.69314 31.7602 9.37635 31.4938C9.81012 31.3274 10.2645 31.3623 10.7126 31.3623C18.8651 31.3623 27.0192 31.3757 35.1717 31.3474C38.0317 31.3374 40.5008 30.2271 42.4631 28.03C44.1457 26.1457 45.0275 23.8686 45.2897 21.3053C45.4962 19.2945 45.2229 17.4452 44.0313 15.804C42.7062 13.973 40.9155 13.0542 38.7626 13.0442C31.0597 13.0093 23.3505 13.0309 15.654 13.0192C14.8357 13.0192 14.0159 12.9493 13.2008 12.8694C12.4969 12.8012 12.1076 12.3568 12.06 11.6144C12.0075 10.8054 12.4032 10.2228 13.1039 10.0814C13.3385 10.0464 13.5758 10.0347 13.8125 10.0464H38.5989C42.7634 10.0547 46.3638 12.693 47.6762 16.8177C48.6072 19.7456 48.2752 22.6968 47.2313 25.5348C45.2261 30.9828 40.5056 34.3335 34.9191 34.3485C30.8961 34.3602 26.8714 34.3485 22.8484 34.3485ZM4.36663 12.8761C3.41331 12.8761 2.45998 12.8894 1.50666 12.8761C0.712223 12.8611 0.102096 12.3135 0.0115301 11.5678C-0.0790357 10.8221 0.367438 10.1812 1.22702 9.99813C1.69647 9.91836 2.17209 9.88548 2.64747 9.89992C3.94399 9.88827 5.2421 9.88494 6.53862 9.89992C6.93454 9.8993 7.32916 9.94735 7.71439 10.0431C8.41508 10.2295 8.798 10.8554 8.71538 11.6161C8.63276 12.3767 8.19423 12.8345 7.46017 12.8595C6.42899 12.8961 5.39463 12.8694 4.36346 12.8694L4.36663 12.8761ZM21.7569 44.6686C20.8576 44.6686 19.9583 44.6852 19.0558 44.6686C18.201 44.6486 17.6258 44.1409 17.5384 43.3919C17.5052 42.998 17.6221 42.6063 17.8635 42.3023C18.1049 41.9983 18.4512 41.8066 18.827 41.769C20.7507 41.6106 22.6832 41.6078 24.6073 41.7607C24.7888 41.7688 24.9669 41.8156 25.1305 41.8984C25.2941 41.9811 25.4399 42.098 25.5589 42.2418C25.678 42.3857 25.7677 42.5534 25.8226 42.7349C25.8775 42.9163 25.8965 43.1076 25.8784 43.297C25.8196 44.1293 25.2603 44.6386 24.3769 44.6752H21.7569V44.6686Z" fill="white" />
                        </svg>
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
