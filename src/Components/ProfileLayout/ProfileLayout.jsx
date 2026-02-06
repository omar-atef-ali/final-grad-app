import React, { useContext, useEffect, useState } from "react";
import style from "./ProfileLayout.module.css";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { userContext } from "../../context/userContext";
import api from "../../api";



export default function ProfileLayout() {


  const location = useLocation();

  if (location.pathname === "/profile") {
    return <Navigate to="/profile/info" replace />;
  }


  ///////////////////////////user data////////////////////////////////////

  let { userToken, loading } = useContext(userContext);
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    if (loading || !userToken) return;

    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/Users/profile", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUserData(data)
        console.log(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userToken, loading]);


  return (
    <>


      <main className={`${style.main_content}`}>
        <div className={`${style.profile_page}`}>

          <div className={`${style.profile_header}`} >
            <div className={`${style.profile_header_left}`} >
              <button className={`${style.back_btn}`} aria-label="Go back">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`${style.profile_header_text}`} >
                <h1 className={`${style.profile_title}`}>Profile Settings</h1>
                <p className={`${style.profile_subtitle}`} >Manage your account and preferences</p>
              </div>
            </div>
            <button className={`${style.sign_out_btn}`} >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Sign Out</span>
            </button>
          </div>


          <div className={`${style.content_wrapper}`} >

            <aside className={`${style.sidebar}`}>

              <div className={`${style.profile_card}`} >
                <div className={`${style.avatar_wrapper}`} >
                  <div className={`${style.avatar}`} >
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 9C16.3431 9 15 10.3431 15 12C15 13.6569 16.3431 15 18 15C19.6569 15 21 13.6569 21 12C21 10.3431 19.6569 9 18 9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M24 24V22C24 20.3431 22.6569 19 21 19H15C13.3431 19 12 20.3431 12 22V24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <span className={`${style.camera_icon}`} >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7" cy="7" r="7" fill="white" />
                      <path d="M9.33 4.33H8.67L8 3H6L5.33 4.33H4.67C4.3 4.33 4 4.63 4 5V9C4 9.37 4.3 9.67 4.67 9.67H9.33C9.7 9.67 10 9.37 10 9V5C10 4.63 9.7 4.33 9.33 4.33ZM7 8.67C6.08 8.67 5.33 7.92 5.33 7C5.33 6.08 6.08 5.33 7 5.33C7.92 5.33 8.67 6.08 8.67 7C8.67 7.92 7.92 8.67 7 8.67Z" fill="#6B3FA0" />
                    </svg>
                  </span>
                </div>
                <h3 className={`${style.profile_name}`}>{userData?.firstName} {userData?.lastName}</h3>
                <p className={`${style.profile_role}`}>CEO</p>
                <p className={`${style.profile_company}`}>TechVenture Inc.</p>

                <div className={`${style.profile_info}`} >
                  <div className={`${style.info_row}`} >
                    <span className={`${style.info_label}`} >Plan</span>
                    <span className={`${style.badge}`}>No Plan</span>
                  </div>
                  <div className={`${style.info_row}`} >
                    <span className={`${style.info_label}`} >Status</span>
                    <span className={`${style.badge} ${style.badge_warning}`} >Free</span>
                  </div>
                </div>

                <button className={`${style.btn_choose_plan}`}>Choose a Plan</button>
              </div>


              <div className={`${style.help_card}`}>
                <h4 className={`${style.help_title}`} >Need Help?</h4>
                <p className={`${style.help_text}`}>Contact our support team for assistance</p>
                <button className={`${style.btn_contact}`}>
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* <!-- Imported SVG paths for Support Icon --> */}
                    <path
                      d="M12.7501 6.99387C12.7501 6.71707 12.7501 6.57868 12.7917 6.45548C12.9125 6.09709 13.2317 5.95869 13.5517 5.8131C13.9101 5.6491 14.0893 5.5675 14.2676 5.5531C14.4692 5.5371 14.6716 5.5803 14.8444 5.6771C15.0732 5.8051 15.2332 6.04989 15.3964 6.24828C16.1508 7.16506 16.5284 7.62345 16.666 8.12824C16.778 8.53623 16.778 8.96342 16.666 9.37061C16.4652 10.1082 15.8292 10.7258 15.358 11.2986C15.1172 11.5906 14.9964 11.7369 14.8444 11.8225C14.6687 11.92 14.4679 11.9632 14.2676 11.9465C14.0893 11.9321 13.9101 11.8505 13.5509 11.6866C13.2309 11.541 12.9125 11.4026 12.7917 11.0442C12.7501 10.921 12.7501 10.7826 12.7501 10.5058V6.99387ZM4.75024 6.99387C4.75024 6.64508 4.74064 6.33228 4.45904 6.08749C4.35665 5.99869 4.22065 5.93709 3.94945 5.8131C3.59026 5.6499 3.41106 5.5675 3.23267 5.5531C2.69908 5.5099 2.41188 5.87469 2.10469 6.24908C1.34951 7.16506 0.971913 7.62345 0.833515 8.12904C0.722162 8.53568 0.722162 8.96477 0.833515 9.37141C1.03511 10.1082 1.6719 10.7266 2.14229 11.2986C2.43908 11.6586 2.72308 11.9873 3.23267 11.9465C3.41106 11.9321 3.59026 11.8505 3.94945 11.6866C4.22145 11.5634 4.35665 11.501 4.45904 11.4122C4.74064 11.1674 4.75024 10.8546 4.75024 10.5066V6.99387Z"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M3.15027 5.54988C3.15027 2.89875 5.65742 0.75 8.75016 0.75C11.8429 0.75 14.3501 2.89875 14.3501 5.54988"
                      stroke="black"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14.3501 11.9498V12.5898C14.3501 14.0033 12.9181 15.1497 11.1501 15.1497H9.55015"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>Contact Support</span>
                </button>
              </div>
            </aside>


            <div className={`${style.main_section}`}>

              <div className={`${style.TabsContainer}`}>
                <div className={`${style.Tabs}`}>
                  <NavLink
                    to="/profile/info"
                    className={({ isActive }) =>
                      `${style.Tab}  ${isActive ? style.Active : ""}`
                    }
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/profile/subscription"
                    className={({ isActive }) =>
                      `${style.Tab} ${isActive ? style.Active : ""}`
                    }
                  >
                    Subscription
                  </NavLink>

                  <NavLink
                    to="/profile/billing"
                    className={({ isActive }) =>
                      `${style.Tab} ${isActive ? style.Active : ""}`
                    }
                  >
                    Billing
                  </NavLink>

                  <NavLink
                    to="/profile/security"
                    className={({ isActive }) =>
                      `${style.Tab} ${isActive ? style.Active : ""}`
                    }
                  >
                    Security
                  </NavLink>

                </div>
              </div>

              <Outlet />

            </div>
          </div>
        </div>
      </main >

    </>
  );
}
