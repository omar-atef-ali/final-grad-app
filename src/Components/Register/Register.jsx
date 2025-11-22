import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "../../context/userContext";





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
      navigate("/confirm-email");
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
      .min(3, "First Name must be at least 3 characters")   // الحد الأدنى 3
      .max(100, "First Name must be at most 100 characters"),
    // .matches(/^[A-Za-z0-9]+$/, "First Name can only contain letters and numbers")

    lastName: yup
      .string()
      .min(3, "Last Name must be at least 3 characters")   // الحد الأدنى 3
      .max(100, "Last Name must be at most 100 characters"),
    // .matches(/^[A-Za-z0-9]+$/, "Last Name can only contain letters and numbers")

    email: yup
      .string()
      .email("Invalid email address.")
      .min(5, "Email must be at least 5 characters long"),

    password: yup
      .string()
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
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    businessName: yup
      .string()
      .notRequired()
      .trim()
      .min(3, "Business name must be at least 3 characters long")
      .max(50, "Business name must be at most 50 characters long")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Business name can only contain letters and numbers"
      ),
  });
  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword:"",
      businessName: "",
    },
    onSubmit: handleRegisterSubmit,
    validationSchema: validationRegister,
    validateOnMount: true,
  });

  return (
    <>
      <div className={`container-fluid  ${style.Registerpage} `}>
        <div
          className="px-4 py-5  shadow-lg d-flex flex-column justify-content-center"
          style={{

            width: "100%",
            maxWidth: "470px",
            maxHeight: "720px",
            background: `
                        radial-gradient(
                        circle at 2% 50%,
                        rgba(5, 53, 121, 0.6) 0%,
                        rgba(0, 71, 171, 0.2) 20%,
                        rgba(0, 0, 0, 0.9) 70%,
                        rgba(13, 13, 13, 1) 100%  
                        )
                    `,
            backdropFilter: "blur(15px)",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 0 50px rgba(0, 0, 0, 0.6)",
            paddingTop: "10px"
          }}
        >
          <div className="text-center mb-3">
            <h3
              className={`fw-bold mb-1 totalFont`}
              style={{

                fontSize: "2.25rem",
                lineHeight: "1.2",

                background: "linear-gradient(to right, white, #bcbcbcff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",

              }}
            >
              Create an account
            </h3>
            <p className={`text-white-50 mb-2 totalFont`}
              style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}
            >
              Sign Up Now
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2 ">
              <label
                htmlFor="firstName"
                className={`form-label fw-medium text-white totalFont`}
                style={{ fontSize: "0.95rem", fontWeight: "500" }}
              >
                First Name
              </label> <span className={`${style.reqStar}`}>*</span>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                className={`form-control bg-transparent text-light py-1 ${style.custominput} totalFont `}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.firstName}
                </div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="lastName"
                className={`form-label fw-medium text-white totalFont`}
                style={{ fontSize: "0.95rem", fontWeight: "500" }}
              >
                Last Name
              </label><span className={`${style.reqStar}`}>*</span>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                className={`${style.custominput} totalFont form-control bg-transparent text-light py-1`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.lastName}
                </div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="email"
                className={`form-label fw-medium text-white totalFont`}
                style={{ fontSize: "0.95rem", fontWeight: "500" }}
              >
                Email 
              </label><span className={`${style.reqStar}`}>*</span>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className={`${style.custominput} totalFont form-control bg-transparent text-light py-1`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className={`form-label fw-medium text-white totalFont`}
                style={{ fontSize: "0.95rem", fontWeight: "500" }}
              >
                Password
              </label><span className={`${style.reqStar}`}>*</span>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className={`${style.custominput} totalFont form-control bg-transparent text-light py-1`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 shadow-none"
                  style={{ color: "#aaa" }}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger small mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className={`form-label fw-medium text-white totalFont`}
                style={{ fontSize: "0.95rem", fontWeight: "500" }}
              >
                confirmPassword*
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="confirm your password"
                  className={`${style.custominput} totalFont form-control bg-transparent text-light py-1`}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 shadow-none"
                  style={{ color: "#aaa" }}
                >
                  {showConfirmPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-danger small mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <div className="mb-3">
              <label
                htmlFor="businessName"
                className={`form-label fw-medium text-white totalFont`}
                style={{ fontSize: "0.95rem", fontWeight: "500" }}
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                placeholder="business name"
                className={`${style.custominput} totalFont form-control bg-transparent text-light py-1`}
                style={{ fontSize: "0.9rem" }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.businessName}
              />
              {formik.touched.businessName && formik.errors.businessName && (
                <div
                  className="text-danger mt-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {formik.errors.businessName}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`${style.btn_deeb} w-100 mt-2 py-1 totalFont`}
              style={{ fontSize: "0.95rem", marginBottom: "5px" }}
              disabled={!(formik.isValid && formik.dirty) || isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm text-light" role="status" />
              ) : (
                "Create"
              )}
            </button>




            <p className={`mt-2 text-center totalFont`}
              style={{ fontSize: "0.875rem" }}
            >
              Already have an account?
              <Link className={`ms-1 totalFont ${style.Free}`} to={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

