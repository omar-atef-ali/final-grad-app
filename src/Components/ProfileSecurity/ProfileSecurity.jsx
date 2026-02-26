
import React, { useContext, useEffect, useState } from 'react'
import style from "./ProfileSecurity.module.css"
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { userContext } from '../../context/userContext';
import { useSearchParams } from 'react-router-dom';
export default function ProfileSecurity() {
  const { userToken } = useContext(userContext)
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [userSessions, setuserSessions] = useState([])
  const [searchParams] = useSearchParams()

  const UserId = searchParams.get('UserId') ?? ""
  const Code = searchParams.get('Code') ?? ""
  console.log("UserId =>", UserId);
  console.log("Code =>", Code);

  async function handleChangePassword(values) {
    const { confirmNewPassword, ...dataToSend } = values;
    try {
      setIsLoading(true)
      let response = await api.put(`/Accounts/change-password`, dataToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      //   console.log(response.data);
      console.log("sucessful");
      Swal.fire({
        icon: "success",
        title: "Password changed!",
        text: "Your password has been updated successfully.",
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


    } catch (error) {
      //   console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong while changing your password.",
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
      setIsLoading(false);
    }
  }

  async function getUserSessions() {
    try {
      let response = await api.get(`/UserSessions`)
      console.log(response)
      setuserSessions(response.data)
    }
    catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.errors[1])
    }
  }
  async function trustDevice(userid) {
    try {
      let response = await api.put(`/UserSessions/${userid}/trust`)
      console.log(response)
      toast.success(response.data.message)

    }
    catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.errors[1])
    }
  }

  async function putTrustedDevice() {
    try {
      let response = await api.put(`/UserSessions/verify-trust`, {
        UserId,
        Code
      })
      await getUserSessions();
      console.log(response)
      toast.success(response.data.message)

    }
    catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.errors[1])
    }
  }



  function getDeviceIcon(type) {
    switch (type) {
      case 1:
        return <i className="fa-solid fa-desktop"></i>;
      case 2:
        return <i className="fa-solid fa-mobile-screen-button"></i>;
      case 3:
        return <i className="fa-solid fa-tablet-screen-button"></i>;
      default:
        return <i className="fa-solid fa-question"></i>;
    }
  }


  async function deleteUsers() {
    try {
      let response = await api.delete(`/UserSessions/others`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      console.log(response)
      await getUserSessions();
      toast.success("All Sessions removed");
    }
    catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.errors[1] || "Failed to remove sessions")
    }
  }

   async function deleteUserSession(id) {
    try {
      let response = await api.delete(`/UserSessions/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
        console.log(response)
        setuserSessions(prev => prev.filter(s=>s.id !==id))
         toast.success("Session removed");
    }
    catch (error) {
      console.log(error)
       toast.error(
        error.response?.data?.errors[1] || "Failed to remove session")
    }
  }



  function formatDate(isoDate) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(isoDate);
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  // function timeAgo(dateString) {
  //   const now = new Date();
  //   const past = new Date(dateString);
  //   const diff = Math.floor((now - past) / 1000); // seconds

  //   const minutes = Math.floor(diff / 60);
  //   const hours = Math.floor(diff / 3600);
  //   const days = Math.floor(diff / 86400);
  //   const weeks = Math.floor(diff / 604800);
  //   const months = Math.floor(diff / 2592000);
  //   const years = Math.floor(diff / 31536000);

  //   if (diff < 60) return "Just now";
  //   if (minutes < 60) return `${minutes} minutes ago`;
  //   if (hours < 24) return `${hours} hours ago`;
  //   if (days < 7) return `${days} days ago`;
  //   if (weeks < 4) return `${weeks} weeks ago`;
  //   if (months < 12) return `${months} months ago`;
  //   return `${years} years ago`;
  // }

  function timeAgo(dateString) {
    const past = new Date(dateString);
    const now = new Date();

    const diff = Math.floor((now - past) / 1000); // فرق بالثواني

    if (diff < 60) return "Active"; // أقل من دقيقة → Active
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
    return `${Math.floor(diff / 31536000)} years ago`;
  }


  let validationChangePass = yup.object({
    currentPassword: yup
      .string()
      .required(""),
    newPassword: yup
      .string()
      .required("")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmNewPassword: yup
      .string()
      .required("")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: handleChangePassword,
    validationSchema: validationChangePass,
  });

  useEffect(() => {
    getUserSessions()
  }, [])
  useEffect(() => {
    if (UserId && Code && !verified) {
      putTrustedDevice();
      setVerified(true);
    }
  }, [UserId, Code,verified]);
  return <>


    <main className={`${style.content_area}`}>

      <section className={`${style.security_section}`}>
        <h2 className={`${style.section_title}`}>Change Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className={`${style.form_group}`}>
            <label className={`${style.form_label}`}>Current Password</label>
            <div className={`${style.input_wrapper}`}>
              <span className={`${style.input_icon}`} >
                <i class="fa-solid fa-lock"></i>
              </span>
              <input id="currentPassword"
                name="currentPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                className={`${style.form_input}`} type="password" placeholder="Enter your password" />

            </div>
            <div className={`${style.error_placeholder}`}>
              {formik.touched.currentPassword && formik.errors.currentPassword && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.currentPassword}
                </div>
              )}
            </div>
          </div>
          <div className={`${style.form_group}`}>
            <label className={`${style.form_label}`}>New Password</label>
            <div className={`${style.input_wrapper}`}>
              <input
                id="newPassword"
                name="newPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.newPassword}

                className={`${style.form_input}`} type="password" placeholder="Enter your new password" />
              <span className={`${style.input_icon}`}>
                <i class="fa-solid fa-lock"></i>
              </span>
            </div>
            <div className={`${style.error_placeholder}`}>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.newPassword}
                </div>
              )}
            </div>
            <p className={`${style.password_hint}`} class="password-hint">Use at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (e.g. !@#$%^&*)</p>
          </div>
          <div className={`${style.form_group}`}>
            <label className={`${style.form_label}`}>Confirm New Password</label>
            <div className={`${style.input_wrapper}`}>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmNewPassword}
                className={`${style.form_input}`} type="password" placeholder="Confirm your new password" />
              <span className={`${style.input_icon}`}>
                <i class="fa-solid fa-lock"></i>
              </span>
            </div>
            <div className={`${style.error_placeholder}`}>
              {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.confirmNewPassword}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`${style.update_password_btn}`}
            disabled={!(formik.isValid && formik.dirty) || isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm text-light" role="status" />
            ) : (
              "Update Password"
            )}
          </button>


        </form>
      </section>


      <section className={`${style.sessions_section}`}>
        <h2 className={`${style.section_title}`}>Active Sessions</h2>




        {userSessions.map((users) => (
          <div key={users.id} className={`${style.device_card}`}>
            <div className={`${style.card_header}`}>
              <div className={`${style.info}`}>

                <div className={`${style.info_parent}`}>
                  <div className={`${style.info_sipling}`}>
                    <div>
                      {getDeviceIcon(users.deviceType)}
                    </div>
                    <div className={`${style.title}`}>{users.os} - {users.browser}</div>
                  </div>
                  <div>
                    {
                      users.isCurrent ? <button className={`${style.current_btn}`}>Current</button>
                        : <button onClick={()=>deleteUserSession(users.id)} className={`${style.no_current_btn}`}>Sign Out</button>
                       
                    }
                  </div>
                </div>


                <div className={`${style.location}`}>
                  <div className={`${style.location_parent}`}>
                    <i className={`fa-solid fa-location-dot ${style.location_i}`}></i> <span>{users.city} , {users.country}</span>
                  </div>
                  <div>
                    {users.isTrusted ? <span className={`${style.trusted}`}><i className={`fa-regular fa-circle-check ${style.check_icon}`}></i> Trusted</span> :
                      <span className={`${style.not_trusted}`}><i className={`fa-solid fa-exclamation ${style.check_icon}`}></i> Not Trusted</span>
                    }
                  </div>


                </div>
                <div className={`${style.ip}`}>IP: {users.ipAddress}</div>
                <div className={`${style.divider}`}></div>


                <div className={`${style.card_footer_parent}`}>
                  <div className={`${style.card_footer}`}>
                    <div className={`${style.label}`}>First Active</div>
                    <div className={`${style.value}`}>{formatDate(users.firstSeenAt)}</div>
                  </div>
                  <div className={`${style.card_footer}`}>
                    <div className={`${style.label}`}>Last Active</div>
                    {/* <div className={`${style.value}`}>{timeAgo(users.lastSeenAt)}</div> */}
                    <div className={`${style.value}`}>
                      {users.isCurrent ? "Active Now" : timeAgo(users.lastSeenAt)}
                    </div>

                  </div>
                </div>
              </div>
              {/* </div> */}

            </div>
            {
              users.isTrusted ? "" : <div className={`${style.divider2}`}></div>
            }

            
            {
              users.isTrusted ? "" : <div onClick={() => trustDevice(users.id)} className={`${style.trust_device}`}>
                <div>
                  <span className={`${style.trust_device_text}`}><i class={`fa-solid fa-shield ${style.sheild_icon}`}></i> Trust this device</span>
                </div>

              </div>
            }

            {
              users.isTrusted ?
                "" : <p className={`${style.trust_device_note}`}>A verification link will be sent to your email to approve this device.</p>

            }
          </div>

        ))}






        <button onClick={() => deleteUsers()} className={`${style.sign_out_all_btn}`}>
          <i className={`fa-solid fa-arrow-right-from-bracket ${style.sign_out_icon}`}></i>
          Sign Out From All Devices
        </button>
      </section>
    </main>


  </>
}
