
import React from 'react'
// import style from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

export default function Layout() {
  return <>
    <ScrollToTop />
    <NavBar/>
    <Outlet></Outlet>
    <Footer />
  
  </>
}
