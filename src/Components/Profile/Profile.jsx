import React, { useContext, useEffect, useState } from "react";
// import profileImage from "../../assets/images/ChatGPT Image 8 أكتوبر 2025، 08_55_40 م.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import axios from "axios";
import Swal from "sweetalert2";
import { userContext } from "../../context/userContext";

export default function Profile() {
  const [isEditable, setIsEditable] = useState(false);

  let { userToken } = useContext(userContext);

  async function handleProfileSubmit(values) {
    try {
      let response = await axios.put(
        `/api/Account/info`,
        values,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Profile updated!",
        text: "Your information has been saved successfully.",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Update failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong while saving your profile.",
      });
    }
  }

  let validationProfile = yup.object({
    firstName: yup
      .string()
      .required("First Name required")
      .matches(
        /^[A-Za-z][A-Za-z0-9]*$/,
        "First Name must start with a letter and contain only letters and numbers"
      ),

    lastName: yup
      .string()
      .required("Last Name required")
      .matches(
        /^[A-Za-z][A-Za-z0-9]*$/,
        "Last Name must start with a letter and contain only letters and numbers"
      ),
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
        let response = await axios.get(`/api/Account`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        formik1.setValues({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, []);

  let validationChangePass = yup.object({
    currentPassword: yup.string().required("Current Password is required"),
    newPassword: yup
      .string()
      .required("New Password is required")
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
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });
  async function handleChangePassword(values) {
    const { confirmNewPassword, ...dataToSend } = values;
    try {
      let response = await axios.put(
        `/api/Account/change-password`,
        dataToSend,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Password changed!",
        text: "Your password has been updated successfully.",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Password change failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong while changing your password.",
      });
    }
  }
  let formik2 = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: handleChangePassword,
    validationSchema: validationChangePass,
  });

  return (
    <div className="col-md-12 d-flex align-items-center justify-content-center bg-body h-100 mt-5">
      <div className="w-50">
        <h2
          className="text-center fw-bold mt-1 mb-5"
          style={{ color: "var(--secondary)" }}
        >
          <FontAwesomeIcon icon={faUser} /> Your Profile
        </h2>

        {/* Profile Info Section */}
        <div className="card shadow mb-5 p-4">
          <h5
            className="fw-semibold mb-3 text-center"
            style={{ color: "var(--secondary)", fontSize: 26 }}
          >
            Personal Information
          </h5>
          <form onSubmit={formik1.handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="firstName"
                className="form-label fw-medium text-secondary"
              >
                First Name
              </label>
              <input
                disabled={!isEditable}
                type="text"
                id="firstName"
                placeholder="First name"
                className="form-control"
                onBlur={formik1.handleBlur}
                onChange={formik1.handleChange}
                value={formik1.values.firstName}
              />
              {formik1.touched.firstName && formik1.errors.firstName && (
                <div className="text-danger mt-1">
                  {formik1.errors.firstName}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="lastName"
                className="form-label fw-medium text-secondary"
              >
                Last Name
              </label>
              <input
                disabled={!isEditable}
                type="text"
                id="lastName"
                placeholder="Last name"
                className="form-control"
                onBlur={formik1.handleBlur}
                onChange={formik1.handleChange}
                value={formik1.values.lastName}
              />
              {formik1.touched.lastName && formik1.errors.lastName && (
                <div className="text-danger mt-1">
                  {formik1.errors.lastName}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditable(true)}
                className="btn btn-success px-4 py-2"
                style={{borderRadius : "0.625rem"}}
              >
                Edit
              </button>
              <button
                disabled={!isEditable}
                type="submit"
                className=" btn-deeb  px-4 py-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="card shadow mb-5 p-4">
          <h5
            className="fw-semibold mb-3 text-center"
            style={{ color: "var(--secondary)", fontSize: 25 }}
          >
            Change Password
          </h5>
          <form onSubmit={formik2.handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="currentPassword"
                className="form-label fw-medium text-secondary"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                placeholder="Current password"
                className="form-control"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                value={formik2.values.currentPassword}
              />
              {formik2.touched.currentPassword &&
                formik2.errors.currentPassword && (
                  <div className="text-danger mt-1">
                    {formik2.errors.currentPassword}
                  </div>
                )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="newPassword"
                className="form-label fw-medium text-secondary"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="New password"
                className="form-control"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                value={formik2.values.newPassword}
              />
              {formik2.touched.newPassword && formik2.errors.newPassword && (
                <div className="text-danger mt-1">
                  {formik2.errors.newPassword}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirmNewPassword"
                className="form-label fw-medium text-secondary"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="Confirm new password"
                className="form-control"
                onBlur={formik2.handleBlur}
                onChange={formik2.handleChange}
                value={formik2.values.confirmNewPassword}
              />
              {formik2.touched.confirmNewPassword &&
                formik2.errors.confirmNewPassword && (
                  <div className="text-danger mt-1">
                    {formik2.errors.confirmNewPassword}
                  </div>
                )}
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn-deeb px-4 py-2">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
