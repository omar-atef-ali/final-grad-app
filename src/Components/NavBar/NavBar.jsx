import React, { useState } from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`${style.NavBar}`}>
              <div className="flex-md-row justify-content-between align-items-center">
                <div
                  className=" w-100 d-flex align-items-center gap-0 gap-md-5"
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <div className={style.LogoContainer}>
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 59 46"
                      fill="none"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M29.9536 0.00974613C33.6875 0.00974613 37.4213 -0.0103429 41.1536 0.00974613C48.3035 0.0566206 54.864 4.8646 57.3601 11.8824C58.4358 14.9125 58.6694 18.048 58.3627 21.2673C57.9131 25.9949 56.5736 30.3827 54.0362 34.3151C50.1212 40.3854 44.6031 43.7586 37.7693 44.882C35.4527 45.262 33.1282 45.2168 30.8005 45.2168C29.8345 45.2168 29.3181 44.7514 29.2609 43.9093C29.1989 43.007 29.7376 42.3139 30.6909 42.2536C31.7459 42.185 32.8089 42.2419 33.8686 42.2118C40.302 42.0276 45.8726 39.6923 50.2849 34.6784C53.3768 31.1628 54.9434 26.8805 55.4741 22.1613C55.8427 18.8867 55.803 15.6323 54.5748 12.5302C52.6904 7.7842 49.3141 4.87464 44.665 3.52533C42.8601 3.00134 41.0106 2.90257 39.1596 2.89085C32.2496 2.84732 25.3364 2.87411 18.428 2.87243C18.1372 2.87243 17.8433 2.88415 17.5541 2.85737C17.2224 2.82504 16.9128 2.66834 16.6816 2.4158C16.4504 2.16325 16.3129 1.83163 16.2941 1.48127C16.2892 1.14309 16.3983 0.814043 16.6019 0.552593C16.8056 0.291143 17.0906 0.114225 17.4063 0.053274C17.7221 0.00723235 18.0411 -0.00901641 18.3596 0.00472408H29.9584L29.9536 0.00974613Z"
                        fill="currentColor"
                      />
                      <path
                        d="M22.8484 34.5457H10.4552C10.1903 34.5581 9.9249 34.552 9.66076 34.5273C8.94418 34.4252 8.49294 33.9916 8.42303 33.2282C8.35312 32.4649 8.69314 31.9425 9.37635 31.6747C9.81012 31.5073 10.2645 31.5424 10.7126 31.5424C18.8651 31.5424 27.0192 31.5558 35.1717 31.5274C38.0317 31.5173 40.5008 30.4007 42.4631 28.1909C44.1457 26.2959 45.0275 24.0057 45.2897 21.4276C45.4962 19.4053 45.2229 17.5454 44.0313 15.8948C42.7062 14.0533 40.9155 13.1292 38.7626 13.1191C31.0597 13.084 23.3505 13.1057 15.654 13.094C14.8357 13.094 14.0159 13.0237 13.2008 12.9433C12.4969 12.8747 12.1076 12.4277 12.06 11.6811C12.0075 10.8675 12.4032 10.2815 13.1039 10.1392C13.3385 10.1041 13.5758 10.0923 13.8125 10.1041H38.5989C42.7634 10.1125 46.3638 12.7659 47.6762 16.9143C48.6072 19.859 48.2752 22.8271 47.2313 25.6815C45.2261 31.1607 40.5056 34.5307 34.9191 34.5457C30.8961 34.5575 26.8714 34.5457 22.8484 34.5457ZM4.36663 12.95C3.41331 12.95 2.45998 12.9634 1.50666 12.95C0.712223 12.935 0.102096 12.3842 0.0115301 11.6342C-0.0790357 10.8842 0.367438 10.2397 1.22702 10.0555C1.69647 9.97531 2.17209 9.94224 2.64747 9.95677C3.94399 9.94505 5.2421 9.9417 6.53862 9.95677C6.93454 9.95615 7.32916 10.0045 7.71439 10.1007C8.41508 10.2882 8.798 10.9177 8.71538 11.6828C8.63276 12.4478 8.19423 12.9082 7.46017 12.9333C6.42899 12.9701 5.39463 12.9433 4.36346 12.9433L4.36663 12.95ZM21.7569 44.9251C20.8576 44.9251 19.9583 44.9418 19.0558 44.9251C18.201 44.905 17.6258 44.3944 17.5384 43.6411C17.5052 43.2449 17.6221 42.851 17.8635 42.5452C18.1049 42.2394 18.4512 42.0466 18.827 42.0088C20.7507 41.8495 22.6832 41.8467 24.6073 42.0005C24.7888 42.0086 24.9669 42.0557 25.1305 42.139C25.2941 42.2222 25.4399 42.3397 25.5589 42.4844C25.678 42.629 25.7677 42.7978 25.8226 42.9803C25.8775 43.1628 25.8965 43.3551 25.8784 43.5456C25.8196 44.3827 25.2603 44.895 24.3769 44.9318H21.7569V44.9251Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className={style.LogoText}>Namaa</span>
                  </div>
      
                  {/* <!-- Desktop Nav --> */}
                  <nav className={`${style.NavLinks} ${isOpen ? style.Show : ""}`}>
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">Documentation</a>
                  </nav>
      
                  {/* <!-- Mobile Header Actions --> */}
                  <div className={style.HeaderActions} style={{ marginLeft: "auto" }}>
                    <button className={style.IconBtn}>
                      {/* <!-- Heart Icon --> */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                    <button className={style.IconBtn}>
                      {/* <!-- Shopping Cart --> */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </button>
                    <span
                      className=" overflow-hidden d-block"
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "var(--text-gray)",
                      }}
                    >
                      Demo
                    </span>
                    <button className={style.UserAvatarSmall}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </button>
                    <button
                      className={`${style.MenuToggle} ${isOpen ? style.Active : ""}`}
                      onClick={() => setIsOpen(!isOpen)}
                      aria-label="Toggle navigation"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
      </div>
    </>
  );
}
