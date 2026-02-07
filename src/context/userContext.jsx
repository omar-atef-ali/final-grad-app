import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../api";




export let userContext = createContext();

export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
  let [loading, setLoading] = useState(true);
  let [email, setemail] = useState('')

  let [userProfileImage, setUserProfileImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setUserToken(token);
      fetchUserNameAndImage(token);
    }
    setLoading(false);

  }, []);

  async function fetchUserNameAndImage(token) {
    try {
      const { data } = await api.get("/Users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.profileImage) {
        setUserProfileImage(data.profileImage);
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
