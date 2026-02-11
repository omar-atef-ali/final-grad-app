import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../api";


export let userContext = createContext();

export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
  let [loading, setLoading] = useState(true);
  let [email, setemail] = useState('')

  let [userProfileImage, setUserProfileImage] = useState(null);

  // 1. Check storage on mount
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
    setLoading(false);
  }, []);

  // 2. Fetch data whenever token changes (Login or Refresh)
  useEffect(() => {
    if (userToken) {
      fetchUserNameAndImage(userToken);
    }
  }, [userToken]);

  async function fetchUserNameAndImage(token) {
    try {
      const { data } = await api.get("/Users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.profileImage) {
        // Force cache refresh
        setUserProfileImage(`${data.profileImage}?t=${new Date().getTime()}`);
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <userContext.Provider value={{ userToken, setUserToken, loading, email, setemail, userProfileImage, setUserProfileImage }}>
        {props.children}
      </userContext.Provider>
    </>
  );
}
