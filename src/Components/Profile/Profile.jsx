import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import style from "./Profile.module.css";
import api from "../../api";
import Swal from "sweetalert2";
import { userContext } from "../../context/userContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  let { userToken } = useContext(userContext);

  async function handleProfileSubmit(values) {
    setIsSaving(true);
    try {
      let response = await api.put(
        `Accounts/info`,
        values,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Profile updated!",
        text: "Your information has been saved successfully.",
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
      setIsEditable(false);
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: "Update failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong while saving your profile.",
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
    } finally {
      setIsSaving(false);
    }
  }

  let validationProfile = yup.object({
    firstName: yup
      .string()
      .min(3, "First Name must be at least 3 characters")   // الحد الأدنى 3
      .max(100, "First Name must be at most 100 characters"),
    // .matches(/^[A-Za-z0-9]+$/, "First Name can only contain letters and numbers")

    lastName: yup
      .string()
      .min(3, "Last Name must be at least 3 characters")   // الحد الأدنى 3
      .max(100, "Last Name must be at most 100 characters"),
    // .matches(/^[A-Za-z0-9]+$/, "Last Name can only contain letters and numbers")
  });
  let formik1 = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: handleProfileSubmit,
    validationSchema: validationProfile,
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        let response = await api.get(`/accounts`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        formik1.setValues({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className={`${style.Profilepage}`}>
      <div className="container">
        <div className="row min-vh-100 align-items-center py-4">
          <div className="col-12 col-md-6">
            <div
              className="card shadow mb-5 p-4 py-5 my-5"
              style={{
                width: "100%", // العرض النسبي
                maxWidth: "700px", // أقصى عرض للكارد
                minHeight: "450px",
                maxHeight: "890px",
                overflow: "hidden", // تكبير الارتفاع شوية
                background: `
                              radial-gradient(
                                circle at 2% 50%,       /* مكان النقطة المضيئة: شمال الكارد */
                                rgba(5, 53, 121, 0.6) 0%,  /* لون الإضاءة الأزرق */
                                rgba(0, 71, 171, 0.2) 20%, /* تدرج ناعم */
                                rgba(0, 0, 0, 0.9) 70%,    /* يتحول للأسود */
                                rgba(0, 0, 0, 1) 100%      /* أسود كامل */
                              )
                            `,
                backdropFilter: "blur(15px)",
                borderRadius: "28px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 0 50px rgba(0, 0, 0, 0.7)",
              }}
            >
              <h5
                className={`fw-semibold mb-5 text-center totalFont`}
                style={{
                  color: "white",
                  fontSize: "2.2rem",
                  lineHeight: "1.2",
                  background: "linear-gradient(to right, white, #bcbcbcff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Personal Information
              </h5>
              <form onSubmit={formik1.handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="firstName"
                    className={`form-label fw-medium text-white totalFont`}
                    style={{ fontSize: "0.95rem", fontWeight: "500" }}
                  >
                    First Name
                  </label> <span className={`${style.reqStar}`}>*</span>
                  <input
                    disabled={!isEditable}
                    type="text"
                    id="firstName"
                    placeholder="First name"
                    className={`${style.custominput} totalFont form-control bg-transparent text-light py-1`}
                    onBlur={formik1.handleBlur}
                    onChange={formik1.handleChange}
                    value={formik1.values.firstName}
                  />
                  {formik1.touched.firstName && formik1.errors.firstName && (
                    <div className="text-danger mt-1"
                     style={{ fontSize: "0.8rem" }}>
                      {formik1.errors.firstName}
                    </div>
                  )}
                </div>
                <div className="mb-3 mt-4">
                  <label
                    htmlFor="lastName"
                    className={`form-label fw-medium text-white totalFont`}
                    style={{ fontSize: "0.95rem", fontWeight: "500" }}
                  >
                    Last Name
                  </label> <span className={`${style.reqStar}`}>*</span>
                  <input
                    disabled={!isEditable}
                    type="text"
                    id="lastName"
                    placeholder="Last name"
                    className={`${style.custominput}  totalFont  form-control bg-transparent text-light py-1`}
                    onBlur={formik1.handleBlur}
                    onChange={formik1.handleChange}
                    value={formik1.values.lastName}
                  />
                  {formik1.touched.lastName && formik1.errors.lastName && (
                    <div className="text-danger mt-1"
                     style={{ fontSize: "0.8rem" }}>
                      {formik1.errors.lastName}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-end gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => setIsEditable(true)}
                    className={`${style.btn_S} totalFont px-4 py-2`}
                  >
                    Edit
                  </button>
                  <button
                    disabled={!isEditable || isSaving} // معطل لو مش Editable أو أثناء الحفظ
                    type="submit"
                    className={`${style.btn_deeb} px-4 py-2 totalFont`}
                  >
                    {isSaving ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      "Save"
                    )}
                  </button>

                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center gap-5 mb-5">
            <div className="row1 text-center">
              <h3 className="totalFont" 
                  style={{
                fontSize: "2.25rem",
                lineHeight: "1.2",
                background: "linear-gradient(to right, white, #bcbcbcff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",

              }}>Account</h3>
              <p className={`${style.row2_link} totalFont mt-3`}>Get help</p>
            </div>

            <div className="row2 text-center">
              <h4 className="totalFont"
               style={{
                fontSize: "2.1rem",
                lineHeight: "1.2",
                background: "linear-gradient(to right, white, #bcbcbcff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",

              }}>Change Password</h4>
              <Link to="/changepassword" className={`${style.row2_link} totalFont mt-3`}>
                Update password now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
