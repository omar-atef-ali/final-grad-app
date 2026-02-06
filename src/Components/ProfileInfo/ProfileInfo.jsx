
import React, { useContext, useEffect, useState } from 'react'
import style from "./ProfileInfo.module.css"
import { userContext } from '../../context/userContext';
import api from '../../api';
import toast from 'react-hot-toast';

export default function ProfileInfo() {

  /////////////////////user data////////////////////////////////////

  let { userToken, loading } = useContext(userContext);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    position: '',
    phoneNumber: '',
    businessAddress: ''
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [save, setSave] = useState(false)

  useEffect(() => {
    if (loading || !userToken) return;

    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/Users/profile", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        // Ensure we don't set null values for controlled inputs
        setUserData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          companyName: data.companyName || '',
          email: data.email || '',
          position: data.position || '',
          phoneNumber: data.phoneNumber || '',
          businessAddress: data.businessAddress || ''
        })
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userToken, loading]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = async () => {
    if (save) {
      // Logic to save data
      try {
        const formData = new FormData();
        for (const key in userData) {
          formData.append(key, userData[key]);
        }

        await api.put("/Users/profile", formData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        toast.success("Profile updated successfully!");
        setSave(false);
        setIsDisabled(true);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.");
      }
    } else {
      // Enable edit mode
      setIsDisabled(false);
      setSave(true);
    }
  };


  return <>

    <div className={style.FormSection}>
      <div className={style.SectionHeader}>
        <h3 className={style.SectionTitle}>Personal Information</h3>
        <button className={style.BtnGradient} onClick={handleEditToggle}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g id="mynaui:edit">
              <path
                d="M2.66699 14.0002H13.3337M3.77766 8.79156C3.4934 9.07645 3.33373 9.46244 3.33366 9.86489V12.0002H5.48232C5.88499 12.0002 6.27099 11.8402 6.55566 11.5549L12.889 5.21822C13.1731 4.93329 13.3327 4.5473 13.3327 4.14489C13.3327 3.74248 13.1731 3.35649 12.889 3.07156L12.2637 2.44489C12.1226 2.30379 11.9552 2.19187 11.7709 2.11554C11.5866 2.0392 11.389 1.99994 11.1895 2C10.99 2.00006 10.7925 2.03944 10.6082 2.1159C10.424 2.19235 10.2566 2.30437 10.1157 2.44556L3.77766 8.79156Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          {save ? "Save" : "Edit Profile"}
        </button>
      </div>

      <div className={style.FormGrid}>
        {/* <!-- First Name --> */}
        <div className={style.InputGroup}>
          <label className={style.InputLabel}>First Name</label>
          <div className={style.InputWrapper}>
            <div className={style.InputIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M14.25 15.75V14.25C14.25 13.4544 13.9339 12.6913 13.3713 12.1287C12.8087 11.5661 12.0456 11.25 11.25 11.25H6.75C5.95435 11.25 5.19129 11.5661 4.62868 12.1287C4.06607 12.6913 3.75 13.4544 3.75 14.25V15.75"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              name="firstName"
              className={style.FormInput}
              placeholder="First Name"
              value={userData.firstName}
              onChange={handleInputChange}
              disabled={isDisabled}
              style={isDisabled ? { opacity: .5 } : { opacity: 1 }}
            />
          </div>
        </div>

        {/* <!-- Last Name --> */}
        <div className={style.InputGroup}>
          <label className={style.InputLabel}>Last Name</label>
          <div className={style.InputWrapper}>
            <div className={style.InputIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M14.25 15.75V14.25C14.25 13.4544 13.9339 12.6913 13.3713 12.1287C12.8087 11.5661 12.0456 11.25 11.25 11.25H6.75C5.95435 11.25 5.19129 11.5661 4.62868 12.1287C4.06607 12.6913 3.75 13.4544 3.75 14.25V15.75"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              name="lastName"
              className={style.FormInput}
              placeholder="Last Name"
              value={userData.lastName}
              onChange={handleInputChange}
              disabled={isDisabled}
              style={isDisabled ? { opacity: .5 } : { opacity: 1 }}

            />
          </div>
        </div>

        {/* <!-- Company Name --> */}
        <div className={style.InputGroup}>
          <label className={style.InputLabel}>Company Name</label>
          <div className={style.InputWrapper}>
            <div className={style.InputIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 7.5H9.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 10.5H9.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M9 4.5H9.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 7.5H12.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 10.5H12.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 4.5H12.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 7.5H6.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 10.5H6.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 4.5H6.0075"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M6.75 16.5V14.25C6.75 14.0511 6.82902 13.8603 6.96967 13.7197C7.11032 13.579 7.30109 13.5 7.5 13.5H10.5C10.6989 13.5 10.8897 13.579 11.0303 13.7197C11.171 13.8603 11.25 14.0511 11.25 14.25V16.5"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M13.5 1.5H4.5C3.67157 1.5 3 2.17157 3 3V15C3 15.8284 3.67157 16.5 4.5 16.5H13.5C14.3284 16.5 15 15.8284 15 15V3C15 2.17157 14.3284 1.5 13.5 1.5Z"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              name="companyName"
              className={style.FormInput}
              placeholder="Company Name"
              value={userData.companyName}
              onChange={handleInputChange}
              disabled={isDisabled}
              style={isDisabled ? { opacity: .5 } : { opacity: 1 }}
            />
          </div>
        </div>

        {/* <!-- Email Address --> */}
        <div className={style.InputGroup}>
          <label className={style.InputLabel}>Email Address</label>
          <div className={style.InputWrapper}>
            <div className={style.InputIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M16.5 5.25L9.75675 9.54525C9.52792 9.67816 9.268 9.74817 9.00338 9.74817C8.73875 9.74817 8.47883 9.67816 8.25 9.54525L1.5 5.25"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 3H3C2.17157 3 1.5 3.67157 1.5 4.5V13.5C1.5 14.3284 2.17157 15 3 15H15C15.8284 15 16.5 14.3284 16.5 13.5V4.5C16.5 3.67157 15.8284 3 15 3Z"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              className={style.FormInput}
              placeholder="email@company.com"
              value={userData.email}
              onChange={handleInputChange}
              disabled={isDisabled}
              style={isDisabled ? { opacity: .5 } : { opacity: 1 }}

            />
          </div>
        </div>

        {/* <!-- Position --> */}
        <div className={style.InputGroup}>
          <label className={style.InputLabel}>Position</label>
          <div className={style.InputWrapper}>
            <div className={style.InputIcon}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  d="M16 2.00065V12.0007H0V2.00065H5V1.00065C5 0.860026 5.02604 0.729818 5.07812 0.610026C5.13021 0.490234 5.20052 0.386068 5.28906 0.297526C5.3776 0.208984 5.48438 0.136068 5.60938 0.078776C5.73438 0.0214844 5.86458 -0.00455729 6 0.000651042H10C10.1406 0.000651042 10.2708 0.0266927 10.3906 0.078776C10.5104 0.130859 10.6146 0.201172 10.7031 0.289714C10.7917 0.378255 10.8646 0.485026 10.9219 0.610026C10.9792 0.735026 11.0052 0.865234 11 1.00065V2.00065H16ZM6 2.00065H10V1.00065H6V2.00065ZM1 3.00065V4.44596L6 6.93815V6.00065H10V6.93815L15 4.44596V3.00065H1ZM7 7.00065V8.00065H9V7.00065H7ZM15 11.0007V5.55534L10 8.06315V9.00065H6V8.06315L1 5.55534V11.0007H15Z"
                  fill="#717182"
                />
              </svg>
            </div>
            <input
              type="text"
              name="position"
              className={style.FormInput}
              placeholder="Position"
              value={userData.position}
              onChange={handleInputChange}
              disabled={isDisabled}
              style={isDisabled ? { opacity: .5 } : { opacity: 1 }}

            />
          </div>
        </div>

        {/* <!-- Phone (Custom added for balance) --> */}
        <div className={style.InputGroup}>
          <label className={style.InputLabel}>Phone Number</label>
          <div className={style.InputWrapper}>
            <div className={style.InputIcon}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#717182"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <input
              type="tel"
              name="phoneNumber"
              className={style.FormInput}
              placeholder="+20xxxxxxxxxx"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              disabled={isDisabled}
              style={isDisabled ? { opacity: .5 } : { opacity: 1 }}

            />
          </div>
        </div>

        {/* <!-- Business Address (Full Width) --> */}
        <div className={`${style.InputGroup} ${style.ColSpan2}`}>
          <label className={style.InputLabel}>Business Address</label>
          <div className={style.InputWrapper}>
            <div className={style.InputIcon}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 10C10.6569 10 12 8.65685 12 7C12 5.34315 10.6569 4 9 4C7.34315 4 6 5.34315 6 7C6 8.65685 7.34315 10 9 10Z"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 7.5C15 11.2448 10.8457 15.1447 9.45075 16.3492C9.32079 16.447 9.1626 16.4998 9 16.4998C8.8374 16.4998 8.67921 16.447 8.54925 16.3492C7.15425 15.1447 3 11.2448 3 7.5C3 5.9087 3.63214 4.38258 4.75736 3.25736C5.88258 2.13214 7.4087 1.5 9 1.5C10.5913 1.5 12.1174 2.13214 13.2426 3.25736C14.3679 4.38258 15 5.9087 15 7.5Z"
                  stroke="#717182"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              name="businessAddress"
              className={style.FormInput}
              placeholder="Address"
              value={userData.businessAddress}
              onChange={handleInputChange}
              disabled={isDisabled}
              style={isDisabled ? { opacity: .5 } : { opacity: 1 }}
            />
          </div>
        </div>
      </div>

      {/* <!-- Notifications Section --> */}
      <div className={style.NotificationsSection}>
        <h3
          className={style.SectionTitle}
          style={{ marginBottom: "16px" }}
        >
          Notification preferences
        </h3>

        <div className={style.ToggleRow}>
          <div className={style.ToggleInfo}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <div className={style.ToggleText}>
              <h4>Product Updates</h4>
              <p>Stay informed about new features and improvements</p>
            </div>
          </div>
          <label className={style.ToggleWrapper}>
            <input type="checkbox" className={style.ToggleCheckbox} />
            <span className={style.ToggleSlider}></span>
          </label>
        </div>

        <div className={style.ToggleRow}>
          <div className={style.ToggleInfo}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <div className={style.ToggleText}>
              <h4>Billing Notifications</h4>
              <p>Receive billing and payment notifications</p>
            </div>
          </div>
          <label className={style.ToggleWrapper}>
            <input
              type="checkbox"
              className={style.ToggleCheckbox}
              defaultChecked
            />
            <span className={style.ToggleSlider}></span>
          </label>
        </div>
      </div>
    </div>

  </>
}
