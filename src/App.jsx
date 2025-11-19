import { useContext, useEffect } from 'react'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from "./Components/Login/Login"
import Layout from "./Components/Layout/Layout"
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import { Toaster } from 'react-hot-toast'
import Protected from './Components/Protected/Protected'
import { userContext } from './context/userContext'
import Dashboard from './Components/Charts/Dashboard'
import Dashboard2 from './Components/Charts/Dashboard2'
import Profile from './Components/Profile/Profile'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Register from './Components/Register/Register'
import ConfirmEmail from './Components/ConfirmEmail/ConfirmEmail'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import Home from './Components/Home/Home'
import Features from "./Components/Features/Features"
import Pricing  from "./Components/Pricing/Pricing"

let routers = createBrowserRouter([
  {path:"/" , element: <Layout/> ,children : [
      {index: true , element :  < Register /> } , 
      {path : "home" , element : <Home/> } ,
      {path : "pricing" , element : <Pricing/> } ,
      {path : "features" , element : <Features/> } ,
      {path : "login" , element : <Login /> } ,
      {path : "register" , element : < Register />  } ,
      {path : "forget-password" , element : <ForgetPassword />  } ,
      {path : "reset-password" , element : <ResetPassword />  } ,
      
      {path : "dashboard" , element : <Protected><Dashboard /></Protected>} ,
      {path : "dashboard2" , element : <Protected><Dashboard2 /></Protected>} ,
      {path : "profile" , element : <Protected>< Profile /> </Protected>} ,
      {path : "/confirm-email" , element : <ConfirmEmail /> } ,
      {path : "/changepassword" , element :<Protected> <ChangePassword /></Protected>} ,

      

  ]}
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
          <Toaster />
    </>
  )
}

export default App
