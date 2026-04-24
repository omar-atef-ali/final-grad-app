import { createContext, useContext, useEffect, useState } from 'react'
import api from "../api";
import { userContext } from './userContext';
import toast from 'react-hot-toast';
export let CartContext = createContext()


export default function CartContextProvider(props) {
  const { userToken } = useContext(userContext)
  const [cartvalue, setcartvalue] = useState([])

  async function getCart() {
    try {
      if (userToken) {
        let { data } = await api.get(`/Cart`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        // console.log(data)
        setcartvalue(data)
      }
      else {
        setcartvalue(localStorage.getItem('local cart') ? JSON.parse(localStorage.getItem('local cart')) : [])
      }
    }
    catch (error) {
      console.log(error)
      toast.error(
        error.response?.data?.errors[1])
    }
  }
  useEffect(() => {
    const initOrSyncCart = async () => {
      if (userToken) {
        try {
          const savedCart = localStorage.getItem("local cart");
          let localCartIds = [];
          try {
            localCartIds = savedCart ? JSON.parse(savedCart) : [];
          } catch {
            localCartIds = savedCart ? savedCart.split(',') : [];
          }

          if (localCartIds.length > 0) {
            let successCount = 0;
            for (const id of localCartIds) {
              try {
                await api.post(`/Cart`, { serviceId: id }, {
                  headers: { Authorization: `Bearer ${userToken}` }
                });
                successCount++;
              } catch (e) {
                console.error("Error adding guest item to cart:", e);
              }
            }

            localStorage.removeItem("local cart");
            // toast.success("Guest items merged with your cart successfully");
          }
        } catch (syncError) {
          console.error("Error syncing local cart to server:", syncError);
        }
        
        // Fetch cart data after sync
        getCart();
      }
    };

    initOrSyncCart();
  }, [userToken]);
  return (
    <>

      <CartContext.Provider value={{ cartvalue, getCart, setcartvalue }}>
        {props.children}
      </CartContext.Provider>

    </>
  )
}
