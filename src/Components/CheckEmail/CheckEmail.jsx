import React, { useEffect, useState } from "react";
import style from "./CheckEmail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

export default function CheckEmail() {
//   const [isDisabled, setIsDisabled] = useState(true);

//   const [secondsLeft, setSecondsLeft] = useState(duration);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setIsDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const progress = ((duration - secondsLeft) / duration) * 100;

  // const [searchParams] = useSearchParams()
  // const UserId = searchParams.get("UserId")
  // const Code = searchParams.get("Code")

  // async function checkEmail() {
  //     try {
  //         const response  = await api.post("/Auth/confirm-email", values);
  //         if (response.status === 200) {
  //             console.log("sucessful")
  //             navigate("/login");
  //         }
  //         else {
  //             console.log("noooo")
  //         }

  //     } catch (error) {
  //         console.error("Error exist:", error);

  //     }
  // }
  // useEffect(() => {
  //     checkEmail
  // }, [UserId, Code])
  return (
    // <div className={`container-fluid  ${style.checkemailpage} `}>
    //   <div className="p-5 text-center">
    //     <FontAwesomeIcon className={style.locki} icon={faLock} />
    //     <h2 className="my-4">Check Your Email</h2>
    //     <p>
    //       We've sent a confirmation email to your email address. <br />
    //       Please click the link in the email to verify your account.
    //     </p>

    //     <div className="timed-button-wrapper">
    //       <button
    //         className={`timed-button ${isDisabled ? "disabled" : "enabled"}`}
    //         disabled={isDisabled}
    //         onClick={() => alert("تم الضغط!")}
    //       >
    //         {isDisabled ? `${secondsLeft}` : "اضغط الآن"}
    //       </button>
    //       {isDisabled && (
    //         <div className="progress-bar">
    //           <div
    //             className="progress-fill"
    //             style={{ width: `${progress} %` }}
    //           ></div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <p>check email</p>
  );
}
