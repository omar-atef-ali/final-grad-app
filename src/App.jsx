import { useEffect } from 'react'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from "./Components/Login/Login"
import Layout from "./Components/Layout/Layout"

// import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
// import { Toaster } from 'react-hot-toast'
// import Protected from './Components/Protected/Protected'
import { userContext } from './context/userContext'
// import Profile from './Components/Profile/Profile'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Register from './Components/Register/Register'
// import ConfirmEmail from './Components/ConfirmEmail/ConfirmEmail'
import ChangePassword from './Components/ChangePassword/ChangePassword'
// import Pricing  from "./Components/Pricing/Pricing"
import Home from './Components/Home/Home'
import GoogleCallback from "./Components/GoogleCallback/GoogleCallback";

import { useContext } from 'react'

let routers = createBrowserRouter([
  {path:"/" , element: <Layout/> ,children : [
      {index: true , element :  < Register /> } , 
      {path : "home" , element : <Home/> } ,
      // {path : "pricing" , element : <Pricing/> } ,
      // {path : "features" , element :<Features/>  } ,
      {path : "login" , element : <Login /> } ,
      {path : "register" , element : < Register />  } ,
      { path: "auth/google/callback", element: <GoogleCallback /> },
      // {path : "forget-password" , element : <ForgetPassword />  } ,
      {path : "reset-password" , element : <ResetPassword />  } ,
      // {path : "profile" , element : < Profile /> } ,
      // {path : "/confirm-email" , element : <ConfirmEmail /> } ,
      {path : "/changepassword" , element : <ChangePassword />} ,

  ]}
//   {path:"/",element:<ResetPassword/>}
])



function App() {


  let {setUserToken} = useContext(userContext)
    useEffect(()=>{
      if(localStorage.getItem("token")!==null){
        setUserToken(localStorage.getItem("token"))
      }
      
    } , [])


  return (
    <>
          <RouterProvider router={routers}></RouterProvider>
          {/* <Toaster /> */}
    </>
  )
}

export default App
