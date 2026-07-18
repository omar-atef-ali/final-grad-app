import React, { useState, useEffect } from 'react'
import style from './ConfirmEmail.module.css'
import imghero from "../../assets/images/heroimage.jpeg"
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from "../../assets/images/logo.png"
import api from "../../api";

export default function ConfirmEmail() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // const [noEmail, setNoEmail] = useState(false);
    const [searchParams] = useSearchParams();
    const UserId = searchParams.get("UserId") ?? "";
    const Code = searchParams.get("Code") ?? "";
    // console.log("UserId =>", UserId);
    // console.log("Code =>", Code);


    async function confirmEmail() {
        console.log("confirmEmail() started");
        if (!UserId || !Code) {
            console.log("Missing params → UserId or Code is empty");
            return;
        }
        try {
            const response = await api.post("/Auth/confirm-email", { UserId, Code });
            if (response.status === 200) {
                console.log("sucessful");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error exist:", error);
        }
    }


    useEffect(() => {

        if (UserId && Code) {
            const callConfirm = async () => {
                console.log("Calling confirmEmail...");
                await confirmEmail();
            };
            callConfirm();
        }
    }, [UserId, Code]);


    return (
        <>
            <div className={style.page_container}>
                <div className={style.hero_section}>

                    <div className={style.hero_background}>
                        <img src={imghero} alt="" />
                    </div>


                    {loading && (
                        <div className={style.loader_overlay}>
                            <div className={style.spinner}></div>
                        </div>
                    )}

                    <div className={`${style.header_logo}`}>
                        <img src={logo} alt="Namaa Logo" className={style.logo_icon} />
                        <span className={`${style.logo_text}`}>Namaa</span>
                    </div>

                </div>
            </div>
        </>
    )
}
