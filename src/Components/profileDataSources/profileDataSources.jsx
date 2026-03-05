
import React from 'react'
import style from "./ProfileDataSources.module.css"

export default function ProfileDataSources() {
  return <>

    <div className={`container-fluid p-0 ${style.mainContainer}`}>
      <div className={style.tabPanel}>
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
                  <div className={style.badgeActive}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#016630" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.5 6L5.5 7L7.5 5" stroke="#016630" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Active</span>
                  </div>
                  <div className={style.badgePending}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#A65F00" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 3V6L8 7" stroke="#A65F00" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Pending</span>
                  </div>
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
                    <h3 className={style.serverTitle}>SQL Server</h3>
                    <p className={style.serverDate}>Connected on February 20, 2026</p>
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
                          <p className={style.detailValue}>db.example.com</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={style.detailItem}>
                          <label className={style.detailLabel}>PORT</label>
                          <p className={style.detailValue}>5432</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={style.detailItem}>
                          <label className={style.detailLabel}>DATABASE</label>
                          <p className={style.detailValue}>production_analytics</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={style.detailItem}>
                          <label className={style.detailLabel}>USERNAME</label>
                          <p className={style.detailValue}>admin_user</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={style.detailItem}>
                          <label className={style.detailLabel}>PASSWORD</label>
                          <div className={style.passwordField}>
                            <p className={`${style.detailValue} mb-0`}>••••••••</p>
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                              <path d="M2.44118 0.150629C2.22321 -0.0502098 1.86981 -0.0502098 1.65185 0.150629C1.43388 0.351469 1.43388 0.677101 1.65185 0.87794L2.44118 0.150629ZM13.5588 11.8494C13.7768 12.0502 14.1302 12.0502 14.3481 11.8494C14.5661 11.6485 14.5661 11.3229 14.3481 11.1221L13.5588 11.8494ZM9.86061 7.91658C10.0903 7.72712 10.1098 7.40202 9.9043 7.19034C9.69868 6.97873 9.34586 6.96069 9.11613 7.15016L9.86061 7.91658ZM6.75178 4.97157C6.95739 4.75989 6.93782 4.43479 6.70817 4.24536C6.47846 4.05594 6.12561 4.07395 5.92003 4.28559L6.75178 4.97157ZM13.2951 8.08602C13.0626 8.27247 13.0382 8.59736 13.2406 8.81158C13.4431 9.0258 13.7956 9.04822 14.0281 8.86177L13.2951 8.08602ZM5.90758 0.992221C5.61345 1.0772 5.44977 1.3658 5.54199 1.63682C5.63422 1.90784 5.94742 2.05866 6.24155 1.97369L5.90758 0.992221ZM4.20729 2.8701C4.46712 2.71728 4.54329 2.3993 4.37744 2.15989C4.21158 1.92048 3.86649 1.85028 3.60667 2.00311L4.20729 2.8701ZM12.1313 10.1466C12.3955 10.0001 12.4807 9.68415 12.3219 9.44072C12.1629 9.19736 11.82 9.11878 11.5559 9.26525L12.1313 10.1466ZM1.65185 0.87794L13.5588 11.8494L14.3481 11.1221L2.44118 0.150629L1.65185 0.87794ZM5.2093 6.00001C5.2093 7.42019 6.45874 8.57144 8 8.57144V7.54287C7.07527 7.54287 6.32558 6.85208 6.32558 6.00001H5.2093ZM8 8.57144C8.71442 8.57144 9.36722 8.32342 9.86061 7.91658L9.11613 7.15016C8.8195 7.39475 8.42917 7.54287 8 7.54287V8.57144ZM5.92003 4.28559C5.47847 4.74021 5.2093 5.34172 5.2093 6.00001H6.32558C6.32558 5.60456 6.48634 5.2449 6.75178 4.97157L5.92003 4.28559ZM0.800803 7.82648C2.26806 9.24893 4.91087 11.3143 8 11.3143V10.2857C5.41022 10.2857 3.0536 8.51747 1.60993 7.11786L0.800803 7.82648ZM15.1992 4.17354C13.7319 2.75107 11.0891 0.685714 8 0.685714V1.71429C10.5898 1.71429 12.9464 3.48253 14.3901 4.88215L15.1992 4.17354ZM15.1992 7.82648C16.2669 6.79132 16.2669 5.20869 15.1992 4.17354L14.3901 4.88215C15.0483 5.52028 15.0483 6.47973 14.3901 7.11786L15.1992 7.82648ZM1.60993 7.11786C0.951732 6.47973 0.951732 5.52028 1.60993 4.88215L0.800803 4.17354C-0.266934 5.20869 -0.266935 6.79132 0.800803 7.82648L1.60993 7.11786ZM14.0281 8.86177C14.4685 8.50842 14.8615 8.15377 15.1992 7.82648L14.3901 7.11786C14.0727 7.42554 13.7051 7.75708 13.2951 8.08602L14.0281 8.86177ZM8 0.685714C7.27256 0.685714 6.57124 0.800475 5.90758 0.992221L6.24155 1.97369C6.81243 1.80875 7.40078 1.71429 8 1.71429V0.685714ZM3.60667 2.00311C2.47108 2.67104 1.51081 3.48521 0.800803 4.17354L1.60993 4.88215C2.28102 4.23153 3.172 3.47904 4.20729 2.8701L3.60667 2.00311ZM8 11.3143C9.52379 11.3143 10.9323 10.8113 12.1313 10.1466L11.5559 9.26525C10.4656 9.8697 9.25663 10.2857 8 10.2857V11.3143Z" fill="#0A0A0A" />
                            </svg>
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
    </div>

  </>
}
