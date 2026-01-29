import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "../../context/userContext";
import style from "./Register.module.css"
import imghero from "../../assets/images/heroimage.jpeg"


export default function Register() {
    const { setemail } = useContext(userContext)
    let [showPassword, setShowPassword] = useState(false);
    let [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    async function handleRegisterSubmit(values) {
        const { confirmPassword, ...dataToSend } = values;
        setIsLoading(true);
        try {
            let response = await api.post(`/Auth/register`, dataToSend);
            console.log(response);
            console.log(values.email)
            console.log(dataToSend)
            localStorage.setItem('email', values.email)

            setemail(values.email)
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

        } finally {
            setIsLoading(false)
        }
    }


    let validationRegister = yup.object({
        firstName: yup
            .string()
            .required("required")
            .min(3, "First Name must be at least 3 characters")   // الحد الأدنى 3
            .max(100, "First Name must be at most 100 characters"),
        // .matches(/^[A-Za-z0-9]+$/, "First Name can only contain letters and numbers")

        lastName: yup
            .string()
            .required("required")
            .min(3, "Last Name must be at least 3 characters")   // الحد الأدنى 3
            .max(100, "Last Name must be at most 100 characters"),
        // .matches(/^[A-Za-z0-9]+$/, "Last Name can only contain letters and numbers")

        email: yup
            .string()
            .required("required")
            .email("Invalid email address.")
            .min(5, "Email must be at least 5 characters long"),

        password: yup
            .string()
            .required("required")
            .min(8, "Password must be at least 8 characters long")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character"
            ),
        confirmPassword: yup
            .string()
            .required("required")
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        businessName: yup
            .string()
            .notRequired()
            // .trim()
            // .min(3, "Business name must be at least 3 characters long")
            .max(200, "Business name must be at most 50 characters long")
        // .matches(
        //     /^[a-zA-Z0-9\s]*$/,
        //     "Business name can only contain letters and numbers"
        // )
        ,
        phoneNumber: yup
            .string()
            .nullable()
            .matches(
                /^01[0-2,5]\d{8}$/,
                "not valid number"
            )
            .notRequired()

    });
    let formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            businessName: "",
            phoneNumber: "",
        },
        onSubmit: handleRegisterSubmit,
        validationSchema: validationRegister,
        validateOnMount: true,
    });
    return (
        <>

            <div className={`${style.page_container}`}>

                <div className={`${style.hero_section}`}>
                    <div className={`${style.logo_container}`}>

                        <svg className={`${style.logo_icon}`} width="58" height="45" viewBox="0 0 58.4871 44.9604" fill="none">
                            <path d="M29.9536 0.00969049C33.6875 0.00969049 37.4213 -0.0102839 41.1536 0.00969049C48.3035 0.0562973 54.864 4.83682 57.3601 11.8145C58.4358 14.8273 58.6694 17.945 58.3627 21.1459C57.9131 25.8465 56.5736 30.2092 54.0362 34.1192C50.1212 40.1548 44.6031 43.5088 37.7693 44.6257C35.4527 45.0036 33.1282 44.9586 30.8005 44.9586C29.8345 44.9586 29.3181 44.4959 29.2609 43.6586C29.1989 42.7614 29.7376 42.0723 30.6909 42.0124C31.7459 41.9442 32.8089 42.0008 33.8686 41.9708C40.302 41.7877 45.8726 39.4657 50.2849 34.4804C53.3768 30.9849 54.9434 26.727 55.4741 22.0347C55.8427 18.7789 55.803 15.5431 54.5748 12.4587C52.6904 7.73976 49.3141 4.84681 44.665 3.5052C42.8601 2.9842 41.0106 2.886 39.1596 2.87435C32.2496 2.83107 25.3364 2.8577 18.428 2.85604C18.1372 2.85604 17.8433 2.86769 17.5541 2.84106C17.2224 2.80891 16.9128 2.65311 16.6816 2.402C16.4504 2.1509 16.3129 1.82117 16.2941 1.47281C16.2892 1.13657 16.3983 0.809396 16.6019 0.549438C16.8056 0.289481 17.0906 0.113573 17.4063 0.0529699C17.7221 0.00719106 18.0411 -0.00896493 18.3596 0.00469711H29.9584L29.9536 0.00969049Z" fill="white" />
                            <path d="M22.8484 34.3485H10.4552C10.1903 34.3608 9.9249 34.3547 9.66076 34.3302C8.94418 34.2287 8.49294 33.7976 8.42303 33.0385C8.35312 32.2795 8.69314 31.7602 9.37635 31.4938C9.81012 31.3274 10.2645 31.3623 10.7126 31.3623C18.8651 31.3623 27.0192 31.3757 35.1717 31.3474C38.0317 31.3374 40.5008 30.2271 42.4631 28.03C44.1457 26.1457 45.0275 23.8686 45.2897 21.3053C45.4962 19.2945 45.2229 17.4452 44.0313 15.804C42.7062 13.973 40.9155 13.0542 38.7626 13.0442C31.0597 13.0093 23.3505 13.0309 15.654 13.0192C14.8357 13.0192 14.0159 12.9493 13.2008 12.8694C12.4969 12.8012 12.1076 12.3568 12.06 11.6144C12.0075 10.8054 12.4032 10.2228 13.1039 10.0814C13.3385 10.0464 13.5758 10.0347 13.8125 10.0464H38.5989C42.7634 10.0547 46.3638 12.693 47.6762 16.8177C48.6072 19.7456 48.2752 22.6968 47.2313 25.5348C45.2261 30.9828 40.5056 34.3335 34.9191 34.3485C30.8961 34.3602 26.8714 34.3485 22.8484 34.3485ZM4.36663 12.8761C3.41331 12.8761 2.45998 12.8894 1.50666 12.8761C0.712223 12.8611 0.102096 12.3135 0.0115301 11.5678C-0.0790357 10.8221 0.367438 10.1812 1.22702 9.99813C1.69647 9.91836 2.17209 9.88548 2.64747 9.89992C3.94399 9.88827 5.2421 9.88494 6.53862 9.89992C6.93454 9.8993 7.32916 9.94735 7.71439 10.0431C8.41508 10.2295 8.798 10.8554 8.71538 11.6161C8.63276 12.3767 8.19423 12.8345 7.46017 12.8595C6.42899 12.8961 5.39463 12.8694 4.36346 12.8694L4.36663 12.8761ZM21.7569 44.6686C20.8576 44.6686 19.9583 44.6852 19.0558 44.6686C18.201 44.6486 17.6258 44.1409 17.5384 43.3919C17.5052 42.998 17.6221 42.6063 17.8635 42.3023C18.1049 41.9983 18.4512 41.8066 18.827 41.769C20.7507 41.6106 22.6832 41.6078 24.6073 41.7607C24.7888 41.7688 24.9669 41.8156 25.1305 41.8984C25.2941 41.9811 25.4399 42.098 25.5589 42.2418C25.678 42.3857 25.7677 42.5534 25.8226 42.7349C25.8775 42.9163 25.8965 43.1076 25.8784 43.297C25.8196 44.1293 25.2603 44.6386 24.3769 44.6752H21.7569V44.6686Z" fill="white" />
                        </svg>
                        <p className={`${style.logo_text}`} >DeebAI</p>
                    </div>


                    {/* <img className={`${style.background_image}`} src={imghero} alt="Background" /> */}
                    <div className={`${style.hero_background}`}>
                        <img src={imghero} alt="" />
                    </div>



                    <div className={`${style.form_card}`} >
                        <div className={`${style.form_content}`} >

                            <div className={`${style.form_header}`} >
                                <h1 className={`${style.form_title}`} >Create an account</h1>
                                <p className={`${style.form_subtitle}`} >Enter your personal data to create an account</p>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                <div className={`${style.form_row}`} >
                                    <div className={`${style.form_field}`} >
                                        <label htmlFor="firstName" className={`${style.form_label}`} >First Name</label>
                                        <div className={`${style.input_wrapper}`}>
                                            <svg className={`${style.input_icon}`} viewBox="0 0 20.1667 21.0556" fill="none">
                                                <path d="M10.0833 9.63889C13.0289 9.63889 15.4167 7.64905 15.4167 5.19445C15.4167 2.73985 13.0289 0.75 10.0833 0.75C7.13781 0.75 4.75 2.73985 4.75 5.19445C4.75 7.64905 7.13781 9.63889 10.0833 9.63889Z" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19.4167 20.3056V18.0833C19.4167 16.9046 18.8548 15.7741 17.8546 14.9406C16.8544 14.1071 15.4978 13.6389 14.0833 13.6389H6.08333C4.66885 13.6389 3.31229 14.1071 2.3121 14.9406C1.3119 15.7741 0.75 16.9046 0.75 18.0833V20.3056" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input id="firstName"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.firstName}
                                                className={`${style.form_input}`} type="text" placeholder="Enter your first name" />


                                        </div>
                                        <div className={`${style.error_placeholder}`}>
                                            {formik.touched.firstName && formik.errors.firstName && (
                                                <div className="text-danger" style={{ fontSize: "0.8rem" }}>
                                                    {formik.errors.firstName !== "required" ? formik.errors.firstName : ""}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`${style.form_field}`} >
                                        <label htmlFor="lastName" className={`${style.form_label}`}>Last Name</label>
                                        <div className={`${style.input_wrapper}`}>
                                            <svg className={`${style.input_icon}`} viewBox="0 0 20.1667 21.0556" fill="none">
                                                <path d="M10.0833 9.63889C13.0289 9.63889 15.4167 7.64905 15.4167 5.19445C15.4167 2.73985 13.0289 0.75 10.0833 0.75C7.13781 0.75 4.75 2.73985 4.75 5.19445C4.75 7.64905 7.13781 9.63889 10.0833 9.63889Z" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19.4167 20.3056V18.0833C19.4167 16.9046 18.8548 15.7741 17.8546 14.9406C16.8544 14.1071 15.4978 13.6389 14.0833 13.6389H6.08333C4.66885 13.6389 3.31229 14.1071 2.3121 14.9406C1.3119 15.7741 0.75 16.9046 0.75 18.0833V20.3056" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input id="lastName"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                                className={`${style.form_input}`} type="text" placeholder="Enter your last name" />

                                        </div>
                                        <div className={`${style.error_placeholder}`}>
                                            {formik.touched.lastName && formik.errors.lastName && (
                                                <div
                                                    className="text-danger mt-1"
                                                    style={{ fontSize: "0.8rem" }}
                                                >
                                                    {formik.errors.lastName !== "required" ? formik.errors.lastName : ""}

                                                </div>
                                            )}
                                        </div>


                                    </div>
                                </div>

                                <div className={`${style.form_field} ${style.full_width}`} >
                                    <label htmlFor="email" className={`${style.form_label}`}>Email</label>
                                    <div className={`${style.input_wrapper}`}>
                                        <svg className={`${style.input_icon}`} viewBox="0 0 16.5 13.5" fill="none">
                                            <path d="M15.75 2.75L9.00675 7.04525C8.77792 7.17816 8.518 7.24817 8.25338 7.24817C7.98875 7.24817 7.72883 7.17816 7.5 7.04525L0.75 2.75" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M0.75 0.75H15.75V12.75H0.75V0.75Z" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input id="email"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            className={`${style.form_input}`} type="email" placeholder="Enter your email" />


                                    </div>

                                    <div className={`${style.error_placeholder}`}>
                                        {formik.touched.email && formik.errors.email && (
                                            <div
                                                className="text-danger mt-1"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                {formik.errors.email !== "required" ? formik.errors.email : ""}

                                            </div>
                                        )}
                                    </div>
                                </div>


                                <div className={`${style.form_field} ${style.full_width}`}>
                                    <label htmlFor="businessName" className={`${style.form_label}`} >Business Name </label>
                                    <div className={`${style.input_wrapper}`}>
                                        <svg className={`${style.input_icon}`} viewBox="0 0 18 18" fill="none">
                                            <path d="M9 7.5H9.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 10.5H9.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 4.5H9.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 7.5H12.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 10.5H12.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 4.5H12.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 7.5H6.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 10.5H6.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 4.5H6.0075" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.75 16.5V14.25C6.75 14.0511 6.82902 13.8603 6.96967 13.7197C7.11032 13.579 7.30109 13.5 7.5 13.5H10.5C10.6989 13.5 10.8897 13.579 11.0303 13.7197C11.171 13.8603 11.25 14.0511 11.25 14.25V16.5" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.5 1.5H4.5C3.67157 1.5 3 2.17157 3 3V15C3 15.8284 3.67157 16.5 4.5 16.5H13.5C14.3284 16.5 15 15.8284 15 15V3C15 2.17157 14.3284 1.5 13.5 1.5Z" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input id="businessName"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.businessName}
                                            className={`${style.form_input}`} type="text" placeholder="Your company name (Optional)" />


                                    </div>
                                    <div className={`${style.error_placeholder}`}>
                                        {formik.touched.businessName && formik.errors.businessName && (
                                            <div
                                                className="text-danger mt-1"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                {formik.errors.businessName}
                                            </div>
                                        )}
                                    </div>

                                </div>


                                <div className={`${style.form_field} ${style.full_width}`}>
                                    <label htmlFor="phoneNumber" className={`${style.form_label}`}>Phone Number</label>
                                    <div className={`${style.input_wrapper}`}>
                                        <svg className={`${style.input_icon}`} viewBox="0 0 18 18" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.29975 1.53225C5.2125 0.62475 6.7155 0.786 7.47975 1.8075L8.42625 3.0705C9.04875 3.9015 8.99325 5.0625 8.2545 5.79675L8.076 5.97525C8.05576 6.05018 8.0537 6.12886 8.07 6.20475C8.11725 6.51075 8.373 7.15875 9.444 8.22375C10.515 9.28875 11.1675 9.54375 11.478 9.59175C11.5562 9.60749 11.637 9.60518 11.7143 9.585L12.0203 9.2805C12.6773 8.628 13.6852 8.50575 14.4982 8.9475L15.9307 9.7275C17.1585 10.3935 17.4682 12.0615 16.4632 13.0613L15.3975 14.1203C15.0615 14.454 14.61 14.7323 14.0595 14.784C12.702 14.9108 9.53925 14.7488 6.2145 11.4435C3.11175 8.358 2.51625 5.667 2.4405 4.341C2.403 3.6705 2.7195 3.1035 3.123 2.703L4.29975 1.53225Z" fill="#717182" />
                                        </svg>
                                        <input  id="phoneNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.phoneNumber}
                                         className={`${style.form_input}`} type="tel" placeholder="Your phone number (Optional)" />
                                    </div>
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <div
                                                className="text-danger mt-1"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                {formik.errors.phoneNumber}
                                            </div>
                                        )}
                                </div>


                                <div className={`${style.form_field} ${style.full_width}`}>
                                    <label htmlFor="password" className={`${style.form_label}`}>Password</label>
                                    <div className={`${style.input_wrapper}`}>
                                        <svg className={`${style.input_icon}`} viewBox="0 0 18 19" fill="none">
                                            <path d="M5.25 8.75V5.75C5.25 4.75544 5.64509 3.80161 6.34835 3.09835C7.05161 2.39509 8.00544 2 9 2C9.99456 2 10.9484 2.39509 11.6517 3.09835C12.3549 3.80161 12.75 4.75544 12.75 5.75V8.75" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.25 8.75H3.75C2.92157 8.75 2.25 9.42157 2.25 10.25V15.5C2.25 16.3284 2.92157 17 3.75 17H14.25C15.0784 17 15.75 16.3284 15.75 15.5V10.25C15.75 9.42157 15.0784 8.75 14.25 8.75Z" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input id="password"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            className={`${style.form_input}`}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password" />
                                        <button onClick={() => setShowPassword(!showPassword)} className={`${style.eye_button}`} type="button">
                                            {showPassword ? (
                                                <i className="fa-solid fa-eye-slash"></i>
                                            ) : (
                                                <i className="fa-solid fa-eye"></i>
                                            )}
                                        </button>
                                    </div>
                                    <div className={`${style.error_placeholder}`}>
                                        {formik.touched.password && formik.errors.password && (
                                            <div
                                                className="text-danger mt-1"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                {formik.errors.password !== "required" ? formik.errors.password : ""}
                                            </div>
                                        )}
                                    </div>

                                    <p className={`${style.password_hint}`}>Use at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (e.g. ! @ # $ % ^ & *).</p>

                                </div>


                                <div className={`${style.form_field} ${style.full_width}`}>
                                    <label htmlFor="confirmPassword" className={`${style.form_label}`}>Confirm Password</label>
                                    <div className={`${style.input_wrapper}`} >
                                        <svg className={`${style.input_icon}`} viewBox="0 0 18 19" fill="none">
                                            <path d="M5.25 8.75V5.75C5.25 4.75544 5.64509 3.80161 6.34835 3.09835C7.05161 2.39509 8.00544 2 9 2C9.99456 2 10.9484 2.39509 11.6517 3.09835C12.3549 3.80161 12.75 4.75544 12.75 5.75V8.75" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.25 8.75H3.75C2.92157 8.75 2.25 9.42157 2.25 10.25V15.5C2.25 16.3284 2.92157 17 3.75 17H14.25C15.0784 17 15.75 16.3284 15.75 15.5V10.25C15.75 9.42157 15.0784 8.75 14.25 8.75Z" stroke="#717182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input id="confirmPassword"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.confirmPassword}
                                            className={`${style.form_input}`}
                                            type={showConfirmPassword ? "text" : "password"}

                                            placeholder="Confirm your password" />
                                        <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`${style.eye_button}`} type="button">
                                            {showConfirmPassword ? (
                                                <i className="fa-solid fa-eye-slash"></i>
                                            ) : (
                                                <i className="fa-solid fa-eye"></i>
                                            )}
                                        </button>
                                    </div>

                                    <div className={`${style.error_placeholder}`}>
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                            <div
                                                className="text-danger mt-1"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                {formik.errors.confirmPassword !== "required" ? formik.errors.confirmPassword : ""}
                                                {/* {formik.errors.confirmPassword} */}
                                            </div>
                                        )}
                                    </div>
                                </div>


                                {/* <div className={`${style.checkbox_container}`}>
                                    <input className={`${style.checkbox}`} type="checkbox" id="remember" />
                                    <label className={`${style.checkbox_label}`} htmlFor="remember">Remember Me</label>
                                </div> */}


                                <button
                                    type="submit"
                                    className={`${style.signup_button}`}
                                    disabled={!(formik.isValid && formik.dirty) || isLoading}>
                                    {isLoading ? (
                                        <span
                                            className="spinner-border spinner-border-sm text-light"
                                            role="status"
                                        />
                                    ) : (
                                        "Sign up"
                                    )}
                                </button>
                                <div className={`${style.divider}`}>
                                    <div className={`${style.divider_line}`}></div>
                                    <span className={`${style.divider_text}`}>Or Continue with</span>
                                    <div className={`${style.divider_line}`}></div>
                                </div>


                                <button className={`${style.google_button}`} type="button">
                                    <svg className={`${style.google_icon}`} viewBox="0 0 25.4994 25.5" fill="none">
                                        <path d="M24.5355 10.59H12.9943V15.03H19.7475C19.6249 16.11 18.8875 17.79 17.2916 18.87C16.3089 19.59 14.8356 20.07 12.9943 20.07C8.88902 20.07 5.62773 16.6407 5.62773 12.63C5.62773 8.73267 9.07435 5.31 12.9943 5.31C15.3276 5.31 16.8009 6.27 17.7822 7.11L21.2208 3.75C19.1329 1.95 16.3089 0.75 12.9943 0.75C8.20636 0.75 4.03175 3.39 2.06645 7.35C1.20148 9.01858 0.75 10.8705 0.75 12.75C0.75 14.6295 1.20148 16.4814 2.06645 18.15C4.03175 22.11 8.20636 24.75 12.9943 24.75C16.3089 24.75 19.1329 23.67 21.0982 21.87C24.2981 19.07 25.2248 14.634 24.5355 10.59Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Continue with Google</span>
                                </button>


                                <p className={`${style.login_link}`}>
                                    Already have an account? <a href="/login">Login</a>
                                </p>


                            </form>






                        </div>
                    </div>

                </div>


            </div >

            <script src="script.js"></script>


        </>
    )
}
