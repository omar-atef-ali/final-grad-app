
import React, { useEffect, useState } from 'react'
import style from './profileDataSources.module.css'
import { useContext } from 'react'
import { userContext } from '../../context/userContext'
import api from '../../api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function ProfileDataSources() {

  const { userToken } = useContext(userContext)
  const [dataSource, setDataSource] = useState([])
  const navigate = useNavigate()
  let [showPassword, setShowPassword] = useState(false);


  async function handleDataSources() {
    try {
      const { data } = await api.get("/UserDatabaseCredentials/decrypted", {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })
      console.log(data)
      setDataSource(data)
    } catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while deleting the cart item.",
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
            height: "100%",
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

  useEffect(() => {
    if (userToken) {
      handleDataSources()
    }
  }, [userToken])


  return <>
    <div className={`container-fluid p-0 ${style.mainContainer}`}>
      {dataSource.length > 0 ?
        <div className={style.tabPanel}>
          <div className={`${style.pageTitleSection}`}>
            <h1 className={`${style.pageTitle}`}>Billing</h1>
            <p className={`${style.pageSubtitle}`}>Manage your payment methods and invoices</p>
          </div>
          {/* <!-- Main Card Frame --> */}
          <div className={style.mainFrame}>
            {/* <!-- Header Section --> */}
            <div className={style.headerSection}>
              <div className={style.containerHeader}>
                <div className={style.headerContent}>
                  <div className={style.headerTitle}>
                    {/* <!-- Database Icon --> */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8C16.9706 8 21 6.65685 21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5C3 6.65685 7.02944 8 12 8Z" stroke="#8A45B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 5V19C3 19.7956 3.94821 20.5587 5.63604 21.1213C7.32387 21.6839 9.61305 22 12 22C14.3869 22 16.6761 21.6839 18.364 21.1213C20.0518 20.5587 21 19.7956 21 19V5" stroke="#8A45B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 12C3 12.7956 3.94821 13.5587 5.63604 14.1213C7.32387 14.6839 9.61305 15 12 15C14.3869 15 16.6761 14.6839 18.364 14.1213C20.0518 13.5587 21 12.7956 21 12" stroke="#8A45B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className={style.headerText}>Connected Database</p>
                  </div>
                  <div className={style.badgesWrapper}>
                    {dataSource.UploadStatus === "Active" && (
                      <div className={style.badgeActive}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#016630" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4.5 6L5.5 7L7.5 5" stroke="#016630" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Active</span>
                      </div>
                    )}
                    {dataSource.UploadStatus === "Pending" && (
                      <div className={style.badgePending}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#A65F00" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6 3V6L8 7" stroke="#A65F00" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Content Section --> */}
            <div className={style.contentSection}>
              {/* <!-- SQL Server Card --> */}
              <div className={style.sqlServerCard}>
                <div className={style.cardInner}>
                  {/* <!-- Header with Icon and Title --> */}
                  <div className={style.serverHeader}>
                    <div className={style.serverIcon}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 10.667C22.6274 10.667 28 8.87613 28 6.66699C28 4.45785 22.6274 2.66699 16 2.66699C9.37258 2.66699 4 4.45785 4 6.66699C4 8.87613 9.37258 10.667 16 10.667Z" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 6.66699V25.3337C4 26.3945 5.26428 27.4119 7.51472 28.1621C9.76516 28.9122 12.8174 29.3337 16 29.3337C19.1826 29.3337 22.2348 28.9122 24.4853 28.1621C26.7357 27.4119 28 26.3945 28 25.3337V6.66699" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 16C4 17.0609 5.26428 18.0783 7.51472 18.8284C9.76515 19.5786 12.8174 20 16 20C19.1826 20 22.2348 19.5786 24.4853 18.8284C26.7357 18.0783 28 17.0609 28 16" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={style.serverInfo}>
                      <h3 className={style.serverTitle}>{dataSource.DatabaseType ? dataSource.DatabaseType : "SQL Server"}</h3>
                      <p className={style.serverDate}>Connected on {dataSource.UploadDate ? dataSource.UploadDate : ""}</p>
                    </div>
                  </div>

                  {/* <!-- Divider --> */}
                  <div className={style.divider}></div>

                  {/* <!-- Connection Details --> */}
                  <div className={style.connectionDetails}>
                    <div className={style.detailsHeader}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M15 9.75034C15 13.5003 12.375 15.3753 9.255 16.4628C9.09162 16.5182 8.91415 16.5156 8.7525 16.4553C5.625 15.3753 3 13.5003 3 9.75034V4.50034C3 4.30142 3.07902 4.11066 3.21967 3.97001C3.36032 3.82936 3.55109 3.75034 3.75 3.75034C5.25 3.75034 7.125 2.85034 8.43 1.71034C8.58889 1.57459 8.79102 1.5 9 1.5C9.20898 1.5 9.41111 1.57459 9.57 1.71034C10.8825 2.85784 12.75 3.75034 14.25 3.75034C14.4489 3.75034 14.6397 3.82936 14.7803 3.97001C14.921 4.11066 15 4.30142 15 4.50034V9.75034Z" stroke="#8A45B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <h4 className={style.detailsTitle}>Connection Details</h4>
                    </div>

                    <div className={style.detailsGrid}>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <div className={style.detailItem}>
                            <label className={style.detailLabel}>HOST</label>
                            <p className={style.detailValue}>{dataSource.DatabaseHost ? dataSource.DatabaseHost : "db.example.com"}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={style.detailItem}>
                            <label className={style.detailLabel}>PORT</label>
                            <p className={style.detailValue}>{dataSource.DatabasePort ? dataSource.DatabasePort : "****"}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={style.detailItem}>
                            <label className={style.detailLabel}>DATABASE</label>
                            <p className={style.detailValue}>{dataSource.DatabaseName ? dataSource.DatabaseName : "****"}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={style.detailItem}>
                            <label className={style.detailLabel}>USERNAME</label>
                            <p className={style.detailValue}>{dataSource.DatabaseUsername ? dataSource.DatabaseUsername : "admin_user"}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={style.detailItem}>
                            <label className={style.detailLabel}>PASSWORD</label>
                            <div className={style.passwordField}>
                              <p className={`${style.detailValue} mb-0`}> {showPassword ? dataSource.DecryptedPassword : "••••••••"}</p>
                              <button
                                type="button"
                                className=""
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <svg
                                    width="20"
                                    height="20"
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
                                    width="20"
                                    height="20"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Warning Alert --> */}
              <div className={style.warningAlert}>
                <svg className={style.alertIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.99967 14.6663C11.6816 14.6663 14.6663 11.6816 14.6663 7.99967C14.6663 4.31778 11.6816 1.33301 7.99967 1.33301C4.31778 1.33301 1.33301 4.31778 1.33301 7.99967C1.33301 11.6816 4.31778 14.6663 7.99967 14.6663Z" stroke="#A65F00" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 4V8L10.6667 9.33333" stroke="#A65F00" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className={style.alertContent}>
                  <h5 className={style.alertTitle}>Processing Your Data</h5>
                  <p className={style.alertDescription}>We are currently reviewing and validating your data connection. This process may take up to 7 days. You will be notified as soon as your data is ready for use.</p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Security Info Box --> */}
          <div className={style.securityBox}>
            <div className={style.securityContent}>
              <svg className={style.securityIcon} width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className={style.securityText}>
                <h4 className={style.securityTitle}>Secure Connection</h4>
                <p className={style.securityDescription}>Your database credentials are encrypted and stored using secure industry-standard practices to ensure their safety. We are committed to protecting your information and will never share your credentials with any third parties.</p>
                <div className={style.securityFeatures}>
                  <div className={style.featureItem}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7.00033 12.8337C10.222 12.8337 12.8337 10.222 12.8337 7.00033C12.8337 3.77866 10.222 1.16699 7.00033 1.16699C3.77866 1.16699 1.16699 3.77866 1.16699 7.00033C1.16699 10.222 3.77866 12.8337 7.00033 12.8337Z" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5.25 6.99967L6.41667 8.16634L8.75 5.83301" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className={style.featureItem}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7.00033 12.8337C10.222 12.8337 12.8337 10.222 12.8337 7.00033C12.8337 3.77866 10.222 1.16699 7.00033 1.16699C3.77866 1.16699 1.16699 3.77866 1.16699 7.00033C1.16699 10.222 3.77866 12.8337 7.00033 12.8337Z" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5.25 6.99967L6.41667 8.16634L8.75 5.83301" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Read-only access</span>
                  </div>
                  <div className={style.featureItem}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7.00033 12.8337C10.222 12.8337 12.8337 10.222 12.8337 7.00033C12.8337 3.77866 10.222 1.16699 7.00033 1.16699C3.77866 1.16699 1.16699 3.77866 1.16699 7.00033C1.16699 10.222 3.77866 12.8337 7.00033 12.8337Z" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5.25 6.99967L6.41667 8.16634L8.75 5.83301" stroke="#00A63E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Never shared</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        : <div className="container-fluid d-flex justify-content-center align-items-center mt-4">
          <div className={style['empty-state-card']}>
            {/* <!-- Icon Container --> */}
            <div className="d-flex justify-content-center mb-4">
              <div className={style['icon-circle']}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 13.333C28.2843 13.333 35 11.0944 35 8.33301C35 5.57158 28.2843 3.33301 20 3.33301C11.7157 3.33301 5 5.57158 5 8.33301C5 11.0944 11.7157 13.333 20 13.333Z" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 8.33301V31.6663C5 32.9924 6.58035 34.2642 9.3934 35.2019C12.2064 36.1396 16.0218 36.6663 20 36.6663C23.9782 36.6663 27.7936 36.1396 30.6066 35.2019C33.4196 34.2642 35 32.9924 35 31.6663V8.33301" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 20C5 21.3261 6.58035 22.5979 9.3934 23.5355C12.2064 24.4732 16.0218 25 20 25C23.9782 25 27.7936 24.4732 30.6066 23.5355C33.4196 22.5979 35 21.3261 35 20" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* <!-- Heading --> */}
            <h3 className={`${style['empty-state-heading']} text-center mb-4`}>No Database Connected</h3>

            {/* <!-- Description --> */}
            <p className={`${style['empty-state-description']} text-center mb-4`}>Connect your database to unlock AI-powered insights and recommendations.</p>

            {/* <!-- Action Buttons --> */}
            <div className="d-flex justify-content-center gap-3">
              <button onClick={() => navigate('/Setup-page')} className={style['btn-primary-gradient']}>Connect Database</button>
            </div>
          </div>
        </div>}
    </div>


  </>
}
