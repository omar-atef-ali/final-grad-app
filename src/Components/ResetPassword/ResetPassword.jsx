import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import { useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
import toast from "react-hot-toast";
// import { userContext } from "../../context/userContext";
import style from "./ResetPassword.module.css"
import imghero from "../../assets/images/heroimage.jpeg"
import logo from "../../assets/images/logo.png"

export default function ResetPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    async function handleResetPasswordSubmit(values) {
        setIsLoading(true);
        try {
            let response = await api.post(`/Auth/forget-password`, values);
            console.log(response);
            console.log(values)

            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.errors[1] ||
                "Something went wrong while registration.",
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
        finally {
            setIsLoading(false)
        }
    }


    let validationResetPassword = yup.object({

        email: yup
            .string()
            .email("Invalid email address.")
            .min(5, "Email must be at least 5 characters long"),

    });
    let formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: handleResetPasswordSubmit,
        validationSchema: validationResetPassword,
        validateOnMount: true,
    });
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
                        <div className={`${style.reset_card}`} >
                            <div className={`${style.card_inner}`} >

                                <div className={style.back_link} onClick={() => navigate("/login")}>
                                    <svg style={{marginTop:"3px"}} width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M15 18L9 12L15 6"
                                            stroke="#6A6A6A"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>Back to login</span>
                                </div>


                                <div className={`${style.card_header}`}  >
                                    <h1 className={`${style.main_title}`} >Reset your password</h1>
                                    <p className={`${style.subtitle}`}>Enter the email address linked with your account. We'll send you a reset password link.</p>
                                </div>


                                <form onSubmit={formik.handleSubmit}>

                                    <div className={`${style.form_group}`}>
                                        <label htmlFor="email" className={`${style.form_label}`} >Email</label>
                                        <div className={`${style.input_wrapper}`} >
                                            <svg className={`${style.input_icon}`} width="18" height="18" viewBox="0 0 18 15" fill="none">
                                                <path d="M16.5 5.25L9.75675 9.54525C9.52792 9.67816 9.268 9.74817 9.00338 9.74817C8.73875 9.74817 8.47883 9.67816 8.25 9.54525L1.5 5.25" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15 3H3C2.17157 3 1.5 3.67157 1.5 4.5V13.5C1.5 14.3284 2.17157 15 3 15H15C15.8284 15 16.5 14.3284 16.5 13.5V4.5C16.5 3.67157 15.8284 3 15 3Z" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input id="email"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.email}

                                                className={`${style.email_input}`} type="email" placeholder="Enter your email" />
                                        </div>
                                        <div className={`${style.error_placeholder}`}>
                                            {formik.touched.email && formik.errors.email && (
                                                <div
                                                    className="text-danger mt-1"
                                                    style={{ fontSize: "0.8rem" }}
                                                >
                                                    {formik.errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>




                                    <button
                                        type="submit"
                                        className={`${style.submit_btn}`}
                                        disabled={!(formik.isValid && formik.dirty) || isLoading}>
                                        {isLoading ? (
                                            <span
                                                className="spinner-border spinner-border-sm text-light"
                                                role="status"
                                            />
                                        ) : (
                                            "Send email"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



            </div>



        </>
    )
}
