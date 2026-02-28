import { createContext, useContext, useEffect, useState } from 'react'
import api from "../api";
import { userContext } from './userContext';
import toast from 'react-hot-toast';
export let CartContext=createContext()
export default function CartContextProvider(props) {
    const { userToken } = useContext(userContext)
    const [cartvalue,setcartvalue]=useState([])

   async function getCart() {
    try {
      let {data} = await api.get(`/Cart`,{
        headers:{
          Authorization: `Bearer ${userToken}`,
        },
      })
      console.log(data)
      setcartvalue(data)
    }
    catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.errors[1])
    }
  }
  useEffect(() => {
  if (userToken) {
    getCart();
  }
}, [userToken]);
  return (
    <>

      <CartContext.Provider value={{cartvalue,getCart}}>
          {props.children}
      </CartContext.Provider>
    
    </>
  )
}
