import React, { useContext, useEffect, useState } from 'react'
import style from './Setup.module.css'
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userContext } from '../../context/userContext';
export default function Setup() {

    let [showPassword, setShowPassword] = useState(false);
    let [loading, setLoading] = useState(false);
    const { userToken } = useContext(userContext)
    const [databaseTypes, setdatabaseTypes] = useState([])
    const navigate = useNavigate();
    async function handleSetupSubmit(values) {
        console.log(values)
        setLoading(true);
        try {
            let response = await api.post(`/UserDatabaseCredentials`, values,
                { headers: { Authorization: `Bearer ${userToken}` } });
            console.log(response);

            navigate("/data-sources");
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
                },
            );
        } finally {
            setLoading(false);
        }
    }

    async function getDatabaseTypes() {
        try {
            let { data } = await api.get(`/UserDatabaseCredentials/database-types`);
            console.log(data);
            const typesArray = Object.values(data);
            setdatabaseTypes(typesArray)


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
                },
            );
        }
    }



    let validationSetup = yup.object({
        databaseType: yup
            .number()
            .required("Please select a database type"),

        databaseHost: yup
            .string()
            .required("host required")
            // .min(3, "Host must be at least 3 characters")
            // .max(100, "Host must be at most 100 characters")
            .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Host must start with a letter and contain only letters and numbers"),

        databasePort: yup
            .string()
            .required("Port required")
            .matches(/^[0-9]+$/, "Port must contain numbers only"),

        databaseName: yup
            .string()
            .required("database name required")
            // .min(3, "Host must be at least 3 characters")
            // .max(100, "Host must be at most 100 characters")
            .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Host must start with a letter and contain only letters and numbers"),

        databaseUsername: yup
            .string()
            .required("database username required")
            // .min(3, "Host must be at least 3 characters")
            // .max(100, "Host must be at most 100 characters")
            .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Host must start with a letter and contain only letters and numbers"),

        databasePassword: yup
            .string()
            .required("database password required")
            .min(8, "Password must be at least 8 characters long")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character",
            )
    })
    let formik = useFormik({
        initialValues: {
            databaseType: "",
            databaseHost: "",
            databasePort: "",
            databaseName: "",
            databaseUsername: "",
            databasePassword: "",
        },
        onSubmit: handleSetupSubmit,
        validationSchema: validationSetup,
        validateOnMount: true,
    });
    useEffect(() => {
        getDatabaseTypes()
    }, [])
    return (

        <>
            <main className={style.main_content}>
                <div className={style.container}>

                    <section className={style.hero}>
                        <div className={style.hero_icon}>
                            <svg viewBox="0 0 40 40" fill="none" stroke="white" stroke-width="3.33">
                                <path d="M20 13.333C28.2843 13.333 35 11.0944 35 8.33301C35 5.57158 28.2843 3.33301 20 3.33301C11.7157 3.33301 5 5.57158 5 8.33301C5 11.0944 11.7157 13.333 20 13.333Z" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5 8.33301V31.6663C5 32.9924 6.58035 34.2642 9.3934 35.2019C12.2064 36.1396 16.0218 36.6663 20 36.6663C23.9782 36.6663 27.7936 36.1396 30.6066 35.2019C33.4196 34.2642 35 32.9924 35 31.6663V8.33301" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5 20C5 21.3261 6.58035 22.5979 9.3934 23.5355C12.2064 24.4732 16.0218 25 20 25C23.9782 25 27.7936 24.4732 30.6066 23.5355C33.4196 22.5979 35 21.3261 35 20" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h1 className={style.hero_title}>Connect Your Data</h1>
                        <p className={style.hero_subtitle}>Securely connect your data source to unlock powerful AI_driven insights</p>
                    </section>


                    <section className={style.form_section}>
                        <div className={style.form_card}>

                            <div className={style.form_header}>
                                <div className={style.header_content}>
                                    <div className={style.header_title}>
                                        <svg className={style.title_icon} viewBox="0 0 20 20" fill="none" stroke="#3D1B6A" stroke-width="1.66667">
                                            <path d="M15.8333 9.16699H4.16667C3.24619 9.16699 2.5 9.91318 2.5 10.8337V16.667C2.5 17.5875 3.24619 18.3337 4.16667 18.3337H15.8333C16.7538 18.3337 17.5 17.5875 17.5 16.667V10.8337C17.5 9.91318 16.7538 9.16699 15.8333 9.16699Z" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5.83301 9.16602V5.83268C5.83301 4.72761 6.27199 3.66781 7.0534 2.8864C7.8348 2.105 8.89461 1.66602 9.99967 1.66602C11.1047 1.66602 12.1646 2.105 12.946 2.8864C13.7274 3.66781 14.1663 4.72761 14.1663 5.83268V9.16602" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div>
                                            <h2>Database Connection</h2>
                                            <p className={style.header_description}>Your credentials are encrypted and stored securely</p>
                                        </div>
                                    </div>
                                    <div className={style.badge_secure}>
                                        <svg viewBox="0 0 12 12" fill="none" stroke="#008236" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M10 6.5C10 9 8.25 10.25 6.17 10.975C6.06108 11.0119 5.94277 11.0101 5.835 10.97C3.75 10.25 2 9 2 6.5V3C2 2.86739 2.05268 2.74021 2.14645 2.64645C2.24021 2.55268 2.36739 2.5 2.5 2.5C3.5 2.5 4.75 1.9 5.62 1.14C5.72593 1.0495 5.86068 0.999775 6 0.999775C6.13932 0.999775 6.27407 1.0495 6.38 1.14C7.255 1.905 8.5 2.5 9.5 2.5C9.63261 2.5 9.75979 2.55268 9.85355 2.64645C9.94732 2.74021 10 2.86739 10 3V6.5Z" />
                                        </svg>
                                        <span>Secure</span>
                                    </div>
                                </div>
                            </div>


                            <div className={style.form_body}>

                                <form onSubmit={formik.handleSubmit}>
                                    <div className={style.form_group}>
                                        <label htmlFor="databaseType">
                                            <svg className={style.input_icon} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.33333">
                                                <path d="M8 5.33301C11.3137 5.33301 14 4.43758 14 3.33301C14 2.22844 11.3137 1.33301 8 1.33301C4.68629 1.33301 2 2.22844 2 3.33301C2 4.43758 4.68629 5.33301 8 5.33301Z" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2 3.33301V12.6663C2 13.1968 2.63214 13.7055 3.75736 14.0806C4.88258 14.4556 6.4087 14.6663 8 14.6663C9.5913 14.6663 11.1174 14.4556 12.2426 14.0806C13.3679 13.7055 14 13.1968 14 12.6663V3.33301" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2 8C2 8.53043 2.63214 9.03914 3.75736 9.41421C4.88258 9.78929 6.4087 10 8 10C9.5913 10 11.1174 9.78929 12.2426 9.41421C13.3679 9.03914 14 8.53043 14 8" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            Database Type
                                        </label>
                                        <select value={formik.values.databaseType}
                                            onChange={(e) =>
                                                formik.setFieldValue("databaseType", Number(e.target.value))
                                            }
                                            onBlur={formik.handleBlur} name='databaseType' id="databaseType" className={style.form_select2}>
                                            <option value="" disabled hidden>
                                                Select Database Type
                                            </option>
                                            {
                                                databaseTypes?.map((type, index) => (
                                                    <option key={index} value={index}>
                                                        {type}
                                                    </option>

                                                ))
                                            }
                                        </select>
                                        {formik.touched.databaseType && formik.errors.databaseType && (
                                            <div className="text-danger small mt-1">
                                                {formik.errors.databaseType}
                                            </div>
                                        )}
                                    </div>


                                    <div className={style.form_row}>

                                        <div className={style.form_group}>
                                            <label htmlFor="databaseHost">Host / Server</label>
                                            <input value={formik.values.databaseHost}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} name='databaseHost' className={style.form_input} type="text" id="databaseHost" placeholder="server name" />
                                            {formik.touched.databaseHost && formik.errors.databaseHost && (
                                                <div className="text-danger small mt-1">
                                                    {formik.errors.databaseHost}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`${style.form_group} ${style.form_group_small}`}>
                                            <label htmlFor="databasePort">Port</label>
                                            <input value={formik.values.databasePort}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} name='databasePort' className={style.form_input} type="text" id="databasePort" placeholder="5432" />
                                            {formik.touched.databasePort && formik.errors.databasePort && (
                                                <div className="text-danger small mt-1">
                                                    {formik.errors.databasePort}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={style.form_group}>
                                        <label htmlFor="databaseName">Database Name</label>
                                        <input value={formik.values.databaseName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} name='databaseName' type="text" id="databaseName" placeholder="my_database" className={style.form_input} />
                                        {formik.touched.databaseName && formik.errors.databaseName && (
                                            <div className="text-danger small mt-1">
                                                {formik.errors.databaseName}
                                            </div>
                                        )}
                                    </div>

                                    <div className={style.form_group}>
                                        <label htmlFor="databaseUsername">Username</label>
                                        <input value={formik.values.databaseUsername}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} name='databaseUsername' type="text" id="databaseUsername" placeholder="admin" className={style.form_input} />
                                        {formik.touched.databaseUsername && formik.errors.databaseUsername && (
                                            <div className="text-danger small mt-1">
                                                {formik.errors.databaseUsername}
                                            </div>
                                        )}
                                    </div>

                                    <div className={style.form_group}>
                                        <label htmlFor="databasePassword">Password</label>
                                        <div className={style.password_input}>

                                            <input
                                                name='databasePassword'
                                                id="databasePassword"
                                                placeholder="•••••••"
                                                className={style.form_input}
                                                value={formik.values.databasePassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                type={showPassword ? "text" : "password"}

                                            />
                                            <button
                                                type="button"
                                                className={style.btn_toggle_password}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M14.5002 14.795C14.8088 14.5187 14.8351 14.0446 14.5589 13.7359C14.2826 13.4273 13.8085 13.401 13.4998 13.6773L14.5002 14.795ZM10.3227 10.5002C10.599 10.1915 10.5727 9.71739 10.2641 9.44115C9.95543 9.1649 9.48129 9.19117 9.20504 9.49981L10.3227 10.5002ZM19.1153 15.0421C18.8029 15.314 18.7701 15.7878 19.0421 16.1002C19.3141 16.4126 19.7878 16.4453 20.1002 16.1734L19.1153 15.0421ZM9.18831 4.69699C8.79307 4.82092 8.57313 5.24179 8.69705 5.63703C8.82098 6.03227 9.24185 6.25221 9.63709 6.12829L9.18831 4.69699ZM6.90354 7.43556C7.25269 7.21269 7.35505 6.74898 7.13218 6.39984C6.90931 6.0507 6.4456 5.94833 6.09646 6.1712L6.90354 7.43556ZM17.5515 18.0471C17.9064 17.8335 18.021 17.3727 17.8075 17.0177C17.5939 16.6628 17.1331 16.5482 16.7782 16.7618L17.5515 18.0471ZM8.25 12C8.25 14.0711 9.92893 15.75 12 15.75V14.25C10.7574 14.25 9.75 13.2426 9.75 12H8.25ZM12 15.75C12.96 15.75 13.8372 15.3883 14.5002 14.795L13.4998 13.6773C13.1012 14.034 12.5767 14.25 12 14.25V15.75ZM9.20504 9.49981C8.61169 10.1628 8.25 11.04 8.25 12H9.75C9.75 11.4233 9.96602 10.8988 10.3227 10.5002L9.20504 9.49981ZM2.32608 14.6636C4.2977 16.738 7.84898 19.75 12 19.75V18.25C8.51999 18.25 5.35328 15.6713 3.41334 13.6302L2.32608 14.6636ZM21.6739 9.33641C19.7023 7.26198 16.151 4.25 12 4.25V5.75C15.48 5.75 18.6467 8.32869 20.5867 10.3698L21.6739 9.33641ZM21.6739 14.6636C23.1087 13.154 23.1087 10.846 21.6739 9.33641L20.5867 10.3698C21.4711 11.3004 21.4711 12.6996 20.5867 13.6302L21.6739 14.6636ZM3.41334 13.6302C2.52889 12.6996 2.52889 11.3004 3.41334 10.3698L2.32608 9.33641C0.891308 10.846 0.891307 13.154 2.32608 14.6636L3.41334 13.6302ZM20.1002 16.1734C20.6921 15.6581 21.2202 15.1409 21.6739 14.6636L20.5867 13.6302C20.1602 14.0789 19.6662 14.5624 19.1153 15.0421L20.1002 16.1734ZM12 4.25C11.0225 4.25 10.0801 4.41736 9.18831 4.69699L9.63709 6.12829C10.4042 5.88776 11.1948 5.75 12 5.75V4.25ZM6.09646 6.1712C4.57051 7.14527 3.28015 8.33259 2.32608 9.33641L3.41334 10.3698C4.31512 9.42098 5.51237 8.3236 6.90354 7.43556L6.09646 6.1712ZM12 19.75C14.0476 19.75 15.9403 19.0165 17.5515 18.0471L16.7782 16.7618C15.3131 17.6433 13.6886 18.25 12 18.25V19.75Z"
                                                            fill="currentColor"
                                                            fillOpacity="0.75"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M4.53033 3.46967C4.23744 3.17678 3.76256 3.17678 3.46967 3.46967C3.17678 3.76256 3.17678 4.23744 3.46967 4.53033L4.53033 3.46967ZM19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L19.4697 20.5303ZM14.5002 14.795C14.8088 14.5187 14.8351 14.0446 14.5589 13.7359C14.2826 13.4273 13.8085 13.401 13.4998 13.6773L14.5002 14.795ZM10.3227 10.5002C10.599 10.1915 10.5727 9.71739 10.2641 9.44115C9.95543 9.1649 9.48129 9.19117 9.20504 9.49981L10.3227 10.5002ZM19.1153 15.0421C18.8029 15.314 18.7701 15.7878 19.0421 16.1002C19.3141 16.4126 19.7878 16.4453 20.1002 16.1734L19.1153 15.0421ZM9.18831 4.69699C8.79307 4.82092 8.57313 5.24179 8.69705 5.63703C8.82098 6.03227 9.24185 6.25221 9.63709 6.12829L9.18831 4.69699ZM6.90354 7.43556C7.25269 7.21269 7.35505 6.74898 7.13218 6.39984C6.90931 6.0507 6.4456 5.94833 6.09646 6.1712L6.90354 7.43556ZM17.5515 18.0471C17.9064 17.8335 18.021 17.3727 17.8075 17.0177C17.5939 16.6628 17.1331 16.5482 16.7782 16.7618L17.5515 18.0471ZM3.46967 4.53033L19.4697 20.5303L20.5303 19.4697L4.53033 3.46967L3.46967 4.53033ZM8.25 12C8.25 14.0711 9.92893 15.75 12 15.75V14.25C10.7574 14.25 9.75 13.2426 9.75 12H8.25ZM12 15.75C12.96 15.75 13.8372 15.3883 14.5002 14.795L13.4998 13.6773C13.1012 14.034 12.5767 14.25 12 14.25V15.75ZM9.20504 9.49981C8.61169 10.1628 8.25 11.04 8.25 12H9.75C9.75 11.4233 9.96602 10.8988 10.3227 10.5002L9.20504 9.49981ZM2.32608 14.6636C4.2977 16.738 7.84898 19.75 12 19.75V18.25C8.51999 18.25 5.35328 15.6713 3.41334 13.6302L2.32608 14.6636ZM21.6739 9.33641C19.7023 7.26198 16.151 4.25 12 4.25V5.75C15.48 5.75 18.6467 8.32869 20.5867 10.3698L21.6739 9.33641ZM21.6739 14.6636C23.1087 13.154 23.1087 10.846 21.6739 9.33641L20.5867 10.3698C21.4711 11.3004 21.4711 12.6996 20.5867 13.6302L21.6739 14.6636ZM3.41334 13.6302C2.52889 12.6996 2.52889 11.3004 3.41334 10.3698L2.32608 9.33641C0.891308 10.846 0.891307 13.154 2.32608 14.6636L3.41334 13.6302ZM20.1002 16.1734C20.6921 15.6581 21.2202 15.1409 21.6739 14.6636L20.5867 13.6302C20.1602 14.0789 19.6662 14.5624 19.1153 15.0421L20.1002 16.1734ZM12 4.25C11.0225 4.25 10.0801 4.41736 9.18831 4.69699L9.63709 6.12829C10.4042 5.88776 11.1948 5.75 12 5.75V4.25ZM6.09646 6.1712C4.57051 7.14527 3.28015 8.33259 2.32608 9.33641L3.41334 10.3698C4.31512 9.42098 5.51237 8.3236 6.90354 7.43556L6.09646 6.1712ZM12 19.75C14.0476 19.75 15.9403 19.0165 17.5515 18.0471L16.7782 16.7618C15.3131 17.6433 13.6886 18.25 12 18.25V19.75Z"
                                                            fill="currentColor"
                                                            fillOpacity="0.75"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {formik.touched.databasePassword && formik.errors.databasePassword && (
                                            <div className="text-danger small mt-1">
                                                {formik.errors.databasePassword}
                                            </div>
                                        )}
                                    </div>


                                    <div className={style.security_notice}>
                                        <svg className={style.notice_icon} viewBox="0 0 12 12" fill="none" stroke="#008236" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M10 6.5C10 9 8.25 10.25 6.17 10.975C6.06108 11.0119 5.94277 11.0101 5.835 10.97C3.75 10.25 2 9 2 6.5V3C2 2.86739 2.05268 2.74021 2.14645 2.64645C2.24021 2.55268 2.36739 2.5 2.5 2.5C3.5 2.5 4.75 1.9 5.62 1.14C5.72593 1.0495 5.86068 0.999775 6 0.999775C6.13932 0.999775 6.27407 1.0495 6.38 1.14C7.255 1.905 8.5 2.5 9.5 2.5C9.63261 2.5 9.75979 2.55268 9.85355 2.64645C9.94732 2.74021 10 2.86739 10 3V6.5Z" />
                                        </svg>
                                        <p><strong>Secure Connection</strong>
                                            <br />

                                            Your database credentials are encrypted and stored using secure industry-standard practices to ensure their safety. We are committed to protecting your information and will never share your credentials with any third parties.</p>
                                    </div>


                                    <button disabled={!(formik.isValid && formik.dirty) || loading} className={style.btn_submit} type="submit">


                                        {/* {loading ? (
                                            <span
                                                className="spinner-border spinner-border-sm text-light"
                                                role="status"
                                            />
                                        ) : (
                                            <> */}
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="8" cy="8" r="7" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 8.00033L7.33333 9.33366L10 6.66699" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <span>Connect & Continue</span>
                                        <svg className={style.arrow_icon} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                        {/* </>
                                        )} */}
                                    </button>
                                </form>

                                <p className={style.form_footer}>You can always check your database later from the profile settings</p>

                            </div>
                        </div>
                    </section>


                    <section className={style.help_section}>
                        <svg className={style.help_icon} viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5" />
                            <path d="M10 14v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M10 7h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        <span>Need help?</span>
                        <a href="#supdatabasePort">Contact Support</a>
                        <a href="#docs">View Documentation</a>
                    </section>
                </div>
            </main>
        </>




    )
}
