import React, { useState, useContext, useEffect, useRef } from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { getImageUrl } from "../../utils/imageUrl";
import { CartContext } from '../../context/CartContext';
import toast from "react-hot-toast";

export default function NavBar() {
  const { cartvalue } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false);
  const { userProfileImage, userToken } = useContext(userContext);
  const [displayedImage, setDisplayedImage] = useState(userProfileImage);
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Sync displayedImage with userProfileImage, but only after loading the new image
  useEffect(() => {
    if (!userProfileImage) {
      setDisplayedImage(null);
      return;
    }

    // If it's a data URI (preview), update immediately
    if (userProfileImage.startsWith("data:")) {
      setDisplayedImage(userProfileImage);
      return;
    }

    // Otherwise (server URL), preload to prevent white flash
    const img = new Image();
    const src = getImageUrl(userProfileImage);

    if (src) {
      img.src = src;
      img.onload = () => setDisplayedImage(userProfileImage);
      img.onerror = () => setDisplayedImage(userProfileImage); // Fallback: update even if preload fails
    } else {
      setDisplayedImage(userProfileImage);
    }
  }, [userProfileImage]);

  const location = useLocation();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const linksRef = useRef({});

  const navItems = [
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Documentation", path: "/documentation" },
  ];

  useEffect(() => {
    const updateUnderline = () => {
      const activeItem = navItems.find((item) => {
        if (item.path === "/documentation") {
          return location.pathname.startsWith("/documentation");
        }
        return location.pathname === item.path;
      });

      if (activeItem && linksRef.current[activeItem.path]) {
        const activeEl = linksRef.current[activeItem.path];
        setUnderlineStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      } else {
        setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateUnderline();
    const timer = setTimeout(updateUnderline, 100);

    window.addEventListener("resize", updateUnderline);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateUnderline);
    };
  }, [location.pathname]);





  return (
    <>
      <div ref={navRef} className={`${style.NavBar}`}>
        <div className=" flex-md-row justify-content-between align-items-center">
          <div
            className=" w-100 d-flex align-items-center gap-0 gap-md-5"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <div className={style.LogoContainer} onClick={() => { navigate("/home"); setIsOpen(false); }}>
              <img src={logo} alt="Namaa Logo" className={style.LogoImg} />
              <span className={style.LogoText}>Namaa</span>
            </div>

            {/* <!-- Desktop Nav --> */}
            <nav className={`${style.NavLinks} ${isOpen ? style.Show : ""}`}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  ref={(el) => (linksRef.current[item.path] = el)}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${style.NavLinkItem} ${item.path === "/documentation"
                      ? location.pathname.startsWith("/documentation")
                        ? style.active
                        : ""
                      : isActive
                        ? style.active
                        : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <span
                className={style.UnderlineIndicator}
                style={{
                  left: underlineStyle.left,
                  width: underlineStyle.width,
                  opacity: underlineStyle.opacity
                }}
              />
            </nav>

            {/* <!-- Mobile Header Actions --> */}
            <div className={style.HeaderActions} style={{ marginLeft: "auto" }}>



              <div className={`${style.cart_parent}`}>
                <button className={style.IconBtn} onClick={() => navigate("/cart")}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4.06109 3.93865H19.3665L17.4246 12.0934C17.2783 12.7072 16.9693 13.2472 16.5445 13.6316C16.1197 14.016 15.6021 14.2239 15.07 14.2239H6.86627C6.26319 14.2243 5.68119 13.9577 5.2318 13.4751C4.7824 12.9924 4.49721 12.3278 4.43087 11.6085L3.44887 1H1" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {cartvalue.length > 0 && (
                  <span className={style.count}>
                    {cartvalue.length}
                  </span>
                )}
              </div>

              <span className={style.navDemo} onClick={() => navigate("/demo")}>
                <span>demo</span>
              </span>
              {userToken ? (
                <button className={style.UserAvatarSmall} onClick={() => navigate("/profile/info")} style={{ overflow: "hidden", padding: 0 }}>
                  {displayedImage ? (
                    <img
                      src={getImageUrl(displayedImage) || getImageUrl(userProfileImage)}
                      alt="User"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=User"; }}
                    />
                  ) : (
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
                  )}
                </button>
              ) : (<button className={style.btnPrimaryCustom} onClick={() => navigate("/login")}>login</button>)}
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
