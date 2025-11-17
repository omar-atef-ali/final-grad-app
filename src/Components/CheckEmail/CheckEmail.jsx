import React, { useEffect } from 'react'
import style from './CheckEmail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from 'react-router-dom';

export default function CheckEmail() {
    const [searchParams] = useSearchParams()
    const UserId = searchParams.get("UserId")
    const Code = searchParams.get("Code")

    async function checkEmail() {
        try {
            const response  = await api.post("/Auth/confirm-email", values);
            if (response.status === 200) {
                console.log("sucessful")
                navigate("/login");
            }
            else {
                console.log("noooo")
            }

        } catch (error) {
            console.error("Error exist:", error);

        }
    }
    useEffect(() => {
        checkEmail
    }, [UserId, Code])
    return (
        <div className={`container-fluid  ${style.checkemailpage} `}>

            <div className="p-5 text-center">
                <FontAwesomeIcon className={style.locki} icon={faLock} />
                <h2 className='my-4'>Check Your Email</h2>
                <p>
                    We've sent a confirmation email to your email address. <br />
                    Please click the link in the email to verify your account.
                </p>
               
            </div>
        </div>
    )
}
