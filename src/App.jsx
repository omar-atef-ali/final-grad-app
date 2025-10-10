import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import Layout from "./Components/Layout/Layout"
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import { Toaster } from 'react-hot-toast'
import Protected from './Components/Protected/Protected'
import { userContext } from './context/userContext'
import Dashboard from './Components/Charts/Dashboard'
import Profile from './Components/Profile/Profile'

let routers = createBrowserRouter([
  {path:"/" , element: <Layout/> ,children : [
      {index: true , element : <Home/>  } , 
      {path : "login" , element : <Login /> } ,
      {path : "forget-password" , element : <ForgetPassword />  } ,
      {path : "dashboard" , element : <Protected><Dashboard /></Protected>  } ,
      {path : "profile" , element : <Protected>< Profile /></Protected>  } ,

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
