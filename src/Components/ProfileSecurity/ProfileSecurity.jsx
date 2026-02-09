
import React, { useState } from 'react'
import style from "./ProfileSecurity.module.css"
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
export default function ProfileSecurity() {
  const [isLoading, setIsLoading] = useState(false);
  async function handleChangePassword(values) {
    const { confirmNewPassword, ...dataToSend } = values;
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token");
      let response = await api.put(`/Accounts/change-password`, dataToSend,
        {
        headers: {
          Authorization: `Bearer ${token}`,
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
          <button type='submit' className={`${style.update_password_btn}`} disabled={!(formik.isValid && formik.dirty) || isLoading}>
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
              />
            ) : (
              "Update Password"
            )}</button>

        </form>
      </section>


      <section className={`${style.sessions_section}`}>
        <h2 className={`${style.section_title}`}>Active Sessions</h2>






        <div className={`${style.device_card}`}>
          <div className={`${style.card_header}`}>
            <div className={`${style.left}`}>
              <div className={`${style.icon}`}>💻</div>
              <div className={`${style.info}`}>
                <div className={`${style.title}`}>MacBook Pro 16 - macOS</div>
                <div className={`${style.location}`}>
                  <div className={`${style.location_parent}`}>
                    <i className={`fa-solid fa-location-dot ${style.location_i}`}></i> <span>Cairo, Egypt</span>
                  </div>
                  <span className={`${style.trusted}`}><i className={`fa-regular fa-circle-check ${style.check_icon}`}></i> Trusted</span>
                </div>
                <div className={`${style.ip}`}>IP: 192.168.1.105</div>


                <div className={`${style.card_footer_parent}`}>
                  <div className={`${style.card_footer}`}>
                    <div className={`${style.label}`}>First Active</div>
                    <div className={`${style.value}`}>Jan 15, 2026</div>
                  </div>
                  <div className={`${style.card_footer}`}>
                    <div className={`${style.label}`}>Last Active</div>
                    <div className={`${style.value}`}>Active now</div>
                  </div>
                </div>
              </div>
            </div>

            <button className={`${style.current_btn}`}>Current</button>
          </div>


        </div>


        <div className={`${style.trust_device}`}>
          <div>
            <span className={`${style.trust_device_text}`}><i class={`fa-solid fa-shield ${style.sheild_icon}`}></i> Trust this device</span>
          </div>




        </div>
        <p className={`${style.trust_device_note}`}>A verification link will be sent to your email to approve this device.</p>

        <button className={`${style.sign_out_all_btn}`}>
          <i className={`fa-solid fa-arrow-right-from-bracket ${style.sign_out_icon}`}></i>
          Sign Out From All Devices
        </button>
      </section>
    </main>


  </>
}
