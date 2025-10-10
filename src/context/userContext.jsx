import { createContext, useContext, useEffect, useState } from "react";




export let userContext = createContext();

export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
    setLoading(false); 

  }, []);
    // console.log(userToken);

  return (
    <>
      <userContext.Provider value={{ userToken, setUserToken  ,loading}}>
        {props.children}
      </userContext.Provider>
    </>
  );
}
