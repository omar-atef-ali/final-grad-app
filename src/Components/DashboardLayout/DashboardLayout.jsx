
import React, { useContext, useEffect, useState } from 'react'
import style from "./DashboardLayout.module.css"
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import api from '../../api';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';

export default function DashboardLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  let currentPage = pathSegments[pathSegments.length - 1] || 'subscription';
  if (currentPage === 'dashboard') currentPage = 'subscription';
  const breadcrumbName = currentPage.split('-').map(word => word.charAt(0) + word.slice(1)).join(' ');

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { userToken } = useContext(userContext);
  const { getCart, cartvalue } = useContext(CartContext);
  const [localSelections, setLocalSelections] = useState({});
  const [selectedTokenIds, setSelectedTokenIds] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      const initialDurations = {};
      const initialTokens = {};

      const savedSelections = JSON.parse(localStorage.getItem('cart_selections') || '{}');

      cartItems.forEach(item => {
        const savedData = savedSelections[item.cartItemId];
        const targetDays = savedData?.duration || Math.round((item.duration || 1) * 30);

        const availableDurations = item.servicePrices?.map(sp => sp.durationInDays) || [];
        const closestDuration = availableDurations.length > 0
          ? availableDurations.reduce((prev, curr) =>
            Math.abs(curr - targetDays) < Math.abs(prev - targetDays) ? curr : prev
            , availableDurations[0])
          : targetDays;

        initialDurations[item.cartItemId] = closestDuration;

        const tokensForDuration = item.servicePrices
          ?.find(sp => sp.durationInDays === closestDuration)
          ?.tokens || [];

        const savedTokenId = savedData?.tokenId;
        const currentToken = tokensForDuration.find(t => String(t.id) === String(savedTokenId)) ||
          tokensForDuration.find(t => t.amount === item.tokenAmount) ||
          tokensForDuration[0];

        if (currentToken) {
          initialTokens[item.cartItemId] = currentToken.id;
        }
      });
      setLocalSelections(initialDurations);
      setSelectedTokenIds(initialTokens);
    }
  }, [cartItems]);

  const selectedServicesPayload = React.useMemo(() => {
    return cartItems.map((item) => {
      const currentDurationDays = localSelections[item.cartItemId] || Math.round((item.duration || 0) * 30);
      const currentTokenId = selectedTokenIds[item.cartItemId];
      const sp = item.servicePrices?.find(sp => sp.durationInDays === currentDurationDays);
      return {
        serviceId: item.serviceId,
        servicePriceId: sp?.id,
        serviceTokensId: Number(currentTokenId) || null,
      };
    });
  }, [cartItems, localSelections, selectedTokenIds]);

  async function payment() {
    try {
      const { data } = await api.post('/Orders/services',
        {
          serviceItems: selectedServicesPayload,
          ...(promoCode ? { couponCode: promoCode } : {}),
          autoRenewal: false,
          paymentMethodId: 0
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      getCart()
      if (data.paymentCheckoutUrl) {
        window.location.href = data.paymentCheckoutUrl;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while proceeding to checkout.",
        {
          position: "top-center",
          duration: 4000,
          style: {
            background:
              "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            width: "300px",
            height: "100%",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: {
            primary: "#FF4D4F",
            secondary: "#ffffff",
          },
        },
      );
    }
  }

  const handleDurationChange = (cartItemId, duration) => {
    const numDuration = Number(duration);
    setLocalSelections(prev => ({ ...prev, [cartItemId]: numDuration }));
    const saved = JSON.parse(localStorage.getItem('cart_selections') || '{}');
    saved[cartItemId] = { ...saved[cartItemId], duration: numDuration };

    const item = cartItems.find(i => i.cartItemId === cartItemId);
    const firstTokenId = item?.servicePrices?.find(sp => sp.durationInDays === numDuration)?.tokens?.[0]?.id;

    if (firstTokenId) {
      setSelectedTokenIds(prev => ({ ...prev, [cartItemId]: firstTokenId }));
      saved[cartItemId].tokenId = firstTokenId;
    }
    localStorage.setItem('cart_selections', JSON.stringify(saved));
  };

  const handleTokenChange = (cartItemId, tokenId) => {
    setSelectedTokenIds(prev => ({ ...prev, [cartItemId]: tokenId }));
    const saved = JSON.parse(localStorage.getItem('cart_selections') || '{}');
    saved[cartItemId] = { ...saved[cartItemId], tokenId: tokenId };
    localStorage.setItem('cart_selections', JSON.stringify(saved));
  };

  async function getCartItems() {
    try {
      if (userToken) {
        setLoading(true);
        const { data } = await api.get('Cart', { headers: { Authorization: `Bearer ${userToken}` } });
        try {
          const savedSelections = JSON.parse(localStorage.getItem('cart_selections') || '{}');
          let changed = false;
          Object.keys(savedSelections).forEach(key => {
            if (key.startsWith('local-')) {
              const serviceId = key.replace('local-', '');
              const serverItem = data.find(item => String(item.serviceId) === String(serviceId));
              if (serverItem) {
                savedSelections[serverItem.cartItemId] = savedSelections[key];
                delete savedSelections[key];
                changed = true;
              }
            }
          });
          if (changed) localStorage.setItem('cart_selections', JSON.stringify(savedSelections));
        } catch (e) {
          console.error("Error migrating guest cart selections:", e);
        }
        setCartItems(data);
        setLoading(false);
      } else {
        const saved = localStorage.getItem("local cart");
        let localCartIds = [];
        try { localCartIds = saved ? JSON.parse(saved) : []; } catch { localCartIds = saved ? saved.split(',') : []; }

        if (localCartIds.length > 0) {
          const { data: allServices } = await api.get(`/Services/guest-catalog`);
          const guestCartItems = localCartIds.map(id => {
            const service = allServices.find(s => String(s.serviceId) === String(id));
            if (!service) return null;
            return {
              cartItemId: `local-${id}`,
              serviceId: service.id,
              name: service.name,
              subTitle: service.subTitle,
              iconURL: service.iconURL,
              price: service.price,
              duration: service.durationInDays / 30,
              servicePrices: service.servicePrices || [],
              tokenAmount: service.tokenAmount,
            };
          }).filter(Boolean);
          setCartItems(guestCartItems);
          setLoading(false);
        } else {
          setCartItems([]);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error(error.response?.data?.errors[1] || "Something went wrong while fetching cart items.");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    const syncLocalCartToServer = async () => {
      if (userToken) {
        try {
          const savedCart = localStorage.getItem("local cart");
          let localCartIds = [];
          try { localCartIds = savedCart ? JSON.parse(savedCart) : []; } catch { localCartIds = savedCart ? savedCart.split(',') : []; }

          if (localCartIds.length > 0) {
            let successCount = 0;
            for (const id of localCartIds) {
              try {
                await api.post(`/Cart`, { serviceId: id }, { headers: { Authorization: `Bearer ${userToken}` } });
                successCount++;
              } catch (e) { console.error("Error adding guest item to cart:", e); }
            }
            localStorage.removeItem("local cart");
            getCart();
          }
        } catch (syncError) { console.error("Error syncing local cart to server:", syncError); }
      }
      getCartItems();
    };

    if (isCartOpen) {
      syncLocalCartToServer();
    }
  }, [userToken, isCartOpen]);

  const itemTotals = React.useMemo(() => {
    return cartItems.map(item => {
      const currentDurationDays = localSelections[item.cartItemId] || Math.round((item.duration || 0) * 30);
      const currentTokenId = selectedTokenIds[item.cartItemId];
      const sp = item.servicePrices?.find(sp => sp.durationInDays === currentDurationDays);
      const token = sp?.tokens?.find(t => String(t.id) === String(currentTokenId));

      const basePrice = sp ? (sp.price || 0) : (item.price || 0);
      const tokenPrice = token ? (token.price || 0) : 0;
      const monthlyPrice = basePrice + tokenPrice;
      const durationMonths = currentDurationDays / 30;
      const subtotalBeforeDiscount = basePrice + tokenPrice;
      const isOnSale = sp ? sp.isOnSale : false;
      const discountPercentage = isOnSale ? (sp.salePercentage || 0) : 0;
      const discountAmt = subtotalBeforeDiscount * (discountPercentage / 100);
      const finalTotal = subtotalBeforeDiscount - discountAmt;

      return {
        ...item,
        cartItemId: item.cartItemId,
        basePrice,
        tokenPrice,
        monthlyPrice,
        durationMonths,
        subtotalBeforeDiscount,
        discountAmount: discountAmt,
        finalTotal,
        tokenAmount: token ? token.amount : item.tokenAmount,
        discountPercentage,
        isOnSale
      };
    });
  }, [cartItems, localSelections, selectedTokenIds]);

  const summary = React.useMemo(() => {
    return itemTotals.reduce((acc, item) => ({
      subtotal: acc.subtotal + item.subtotalBeforeDiscount,
      discount: acc.discount + item.discountAmount,
      total: acc.total + item.finalTotal
    }), { subtotal: 0, discount: 0, total: 0 });
  }, [itemTotals]);

  const finalCartTotal = summary.total - (summary.total * (discountAmount / 100));

  async function applyPromo() {
    try {
      if (!userToken) return toast.error(
        "Please login to apply a promo code.",
        {
          position: "top-center",
          duration: 4000,
          style: {
            background:
              "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            width: "300px",
            height: "100%",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: {
            primary: "#FF4D4F",
            secondary: "#ffffff",
          },
        },
      );
      const { data } = await api.get(`/Orders/discount-codes/validate?code=${promoCode}`)
      setDiscountAmount(data.discountPercentage);
    } catch (error) {
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while applying the promo code."
        ,
        {
          position: "top-center",
          duration: 4000,
          style: {
            background:
              "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            width: "300px",
            height: "100%",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: {
            primary: "#FF4D4F",
            secondary: "#ffffff",
          },
        },
      );
    }
  }

  function handleCancelPromo() {
    setDiscountAmount(0);
    setPromoCode('');
  }

  async function handleDeleteCartItem(cartItemId) {
    try {
      if (userToken) {
        await api.delete(`/Cart/${cartItemId}`, { headers: { Authorization: `Bearer ${userToken}` } });
        getCartItems();
        getCart();
        toast.success("Cart item deleted successfully.");
      } else {
        const saved = localStorage.getItem("local cart");
        let localCartIds = [];
        try { localCartIds = saved ? JSON.parse(saved) : []; } catch { localCartIds = saved ? saved.split(',') : []; }
        const originalId = cartItemId.toString().replace('local-', '');
        const indexToRemove = localCartIds.findIndex(id => String(id) === String(originalId));
        if (indexToRemove !== -1) {
          localCartIds.splice(indexToRemove, 1);
          localStorage.setItem("local cart", JSON.stringify(localCartIds));
          getCartItems();
          toast.success("Cart item removed successfully.");
          getCart();
        }
      }

      const savedSelections = JSON.parse(localStorage.getItem('cart_selections') || '{}');
      if (savedSelections[cartItemId]) {
        delete savedSelections[cartItemId];
        localStorage.setItem('cart_selections', JSON.stringify(savedSelections));
        setLocalSelections(prev => { const next = { ...prev }; delete next[cartItemId]; return next; });
        setSelectedTokenIds(prev => { const next = { ...prev }; delete next[cartItemId]; return next; });
      }
    } catch (error) {
      toast.error(error.response?.data?.errors[1] || "Something went wrong while deleting the cart item.");
    }
  }

  

  return <>

    <div className={`${style.allparent}`}>
      <div className={`${style.dashboard}`}>

        {!isSidebarOpen && (
          <button
            className={`${style.burger_menu}`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
        <aside className={`${style.sidebar} ${isSidebarOpen ? style.open : ""}`} id="sidebar">
          {/* <!-- Logo Section --> */}
          <div className={`${style.sidebarHeader}`}>
            <div className={`${style.logoContainer}`}>
              <button
                className={`${style.close_btn}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className={`${style.logoIcon}`}></div>
              <div className={`${style.logoText}`}>
                <div className={`${style.logoTitle}`}>Namaa</div>
                <div className={`${style.logoSubtitle}`}>AI Platform</div>
              </div>
            </div>
          </div>

          {/* <!-- Navigation --> */}
          <nav className={`${style.sidebarNav}`}>
            <NavLink to="/profile" className={({ isActive }) =>
              `${style.navItem} text-decoration-none ${isActive ? style.active : ""}`
            }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.67737 2.00631 11.2874 2.66082 12.4933 3.82667L14 5.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 6C10.5 7.19347 10.0259 8.33807 9.18198 9.18198C8.33807 10.0259 7.19347 10.5 6 10.5C4.74198 10.4953 3.53448 10.0044 2.63 9.13L1.5 8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14C6.32264 13.9937 4.71265 13.3392 3.50667 12.1733L2 10.6667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Home</span>
            </NavLink>

            {/* <button className={`${style.navItem}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 13.3337V6.66699" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 13.3337V2.66699" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 13.333V9.33301" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>Services</span>
              <svg className="ms-auto" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#99A1AF" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button> */}

            <NavLink to="/dashboard/data-sources" className={({ isActive }) =>
              `${style.navItem} text-decoration-none ${isActive ? style.active : ""}`
            }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 5.33301C11.3137 5.33301 14 4.43758 14 3.33301C14 2.22844 11.3137 1.33301 8 1.33301C4.68629 1.33301 2 2.22844 2 3.33301C2 4.43758 4.68629 5.33301 8 5.33301Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 3.33301V12.6663C2 13.1968 2.63214 13.7055 3.75736 14.0806C4.88258 14.4556 6.4087 14.6663 8 14.6663C9.5913 14.6663 11.1174 14.4556 12.2426 14.0806C13.3679 13.7055 14 13.1968 14 12.6663V3.33301" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 8C2 8.53043 2.63214 9.03914 3.75736 9.41421C4.88258 9.78929 6.4087 10 8 10C9.5913 10 11.1174 9.78929 12.2426 9.41421C13.3679 9.03914 14 8.53043 14 8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Data Sources</span>
            </NavLink>

            <NavLink to="/dashboard/api-access" className={({ isActive }) =>
              `${style.navItem} text-decoration-none ${isActive ? style.active : ""}`
            }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10.3335 5.00033L11.8668 6.53366C11.9914 6.65581 12.159 6.72423 12.3335 6.72423C12.508 6.72423 12.6755 6.65581 12.8002 6.53366L14.2002 5.13366C14.3223 5.00904 14.3907 4.84149 14.3907 4.66699C14.3907 4.49249 14.3223 4.32495 14.2002 4.20033L12.6668 2.66699" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.0001 1.33301L7.6001 7.73301" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.00016 14.0003C7.02521 14.0003 8.66683 12.3587 8.66683 10.3337C8.66683 8.30861 7.02521 6.66699 5.00016 6.66699C2.97512 6.66699 1.3335 8.30861 1.3335 10.3337C1.3335 12.3587 2.97512 14.0003 5.00016 14.0003Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>API Access</span>
            </NavLink>

            <NavLink to="/dashboard/subscription" end className={({ isActive }) =>
              `${style.navItem} text-decoration-none ${isActive ? style.active : ""}`
            }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.33333 14.4869C7.53603 14.604 7.76595 14.6656 8 14.6656C8.23405 14.6656 8.46397 14.604 8.66667 14.4869L13.3333 11.8203C13.5358 11.7034 13.704 11.5353 13.821 11.3328C13.938 11.1304 13.9998 10.9007 14 10.6669V5.33359C13.9998 5.09978 13.938 4.87013 13.821 4.6677C13.704 4.46527 13.5358 4.29717 13.3333 4.18026L8.66667 1.51359C8.46397 1.39657 8.23405 1.33496 8 1.33496C7.76595 1.33496 7.53603 1.39657 7.33333 1.51359L2.66667 4.18026C2.46418 4.29717 2.29599 4.46527 2.17897 4.6677C2.06196 4.87013 2.00024 5.09978 2 5.33359V10.6669C2.00024 10.9007 2.06196 11.1304 2.17897 11.3328C2.29599 11.5353 2.46418 11.7034 2.66667 11.8203L7.33333 14.4869Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 14.6667V8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.19336 4.66699L8.00003 8.00033L13.8067 4.66699" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 2.84667L11 6.28" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Subscription</span>
            </NavLink>

            <NavLink to="/dashboard/billing" className={({ isActive }) =>
              `${style.navItem} text-decoration-none ${isActive ? style.active : ""}`
            }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2.6665 1.33301V14.6663L3.99984 13.9997L5.33317 14.6663L6.6665 13.9997L7.99984 14.6663L9.33317 13.9997L10.6665 14.6663L11.9998 13.9997L13.3332 14.6663V1.33301L11.9998 1.99967L10.6665 1.33301L9.33317 1.99967L7.99984 1.33301L6.6665 1.99967L5.33317 1.33301L3.99984 1.99967L2.6665 1.33301Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.6668 5.33301H6.66683C6.31321 5.33301 5.97407 5.47348 5.72402 5.72353C5.47397 5.97358 5.3335 6.31272 5.3335 6.66634C5.3335 7.01996 5.47397 7.3591 5.72402 7.60915C5.97407 7.8592 6.31321 7.99967 6.66683 7.99967H9.3335C9.68712 7.99967 10.0263 8.14015 10.2763 8.3902C10.5264 8.64025 10.6668 8.97939 10.6668 9.33301C10.6668 9.68663 10.5264 10.0258 10.2763 10.2758C10.0263 10.5259 9.68712 10.6663 9.3335 10.6663H5.3335" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11.6663V4.33301" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Billing</span>
            </NavLink>

            <NavLink to="/dashboard/security" className={({ isActive }) =>
              `${style.navItem} text-decoration-none ${isActive ? style.active : ""}`
            }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.14667 1.33301H7.85333C7.49971 1.33301 7.16057 1.47348 6.91053 1.72353C6.66048 1.97358 6.52 2.31272 6.52 2.66634V2.78634C6.51976 3.02016 6.45804 3.2498 6.34103 3.45223C6.22401 3.65466 6.05583 3.82277 5.85333 3.93967L5.56667 4.10634C5.36398 4.22337 5.13405 4.28497 4.9 4.28497C4.66595 4.28497 4.43603 4.22337 4.23333 4.10634L4.13333 4.05301C3.82738 3.87652 3.46389 3.82864 3.12267 3.91988C2.78145 4.01112 2.49037 4.23403 2.31333 4.53967L2.16667 4.79301C1.99018 5.09896 1.9423 5.46245 2.03354 5.80367C2.12478 6.1449 2.34769 6.43597 2.65333 6.61301L2.75333 6.67967C2.95485 6.79602 3.12241 6.96307 3.23937 7.16423C3.35632 7.36539 3.4186 7.59366 3.42 7.82634V8.16634C3.42093 8.40129 3.35977 8.63231 3.2427 8.83601C3.12563 9.03972 2.95681 9.20887 2.75333 9.32634L2.65333 9.38634C2.34769 9.56338 2.12478 9.85445 2.03354 10.1957C1.9423 10.5369 1.99018 10.9004 2.16667 11.2063L2.31333 11.4597C2.49037 11.7653 2.78145 11.9882 3.12267 12.0795C3.46389 12.1707 3.82738 12.1228 4.13333 11.9463L4.23333 11.893C4.43603 11.776 4.66595 11.7144 4.9 11.7144C5.13405 11.7144 5.36398 11.776 5.56667 11.893L5.85333 12.0597C6.05583 12.1766 6.22401 12.3447 6.34103 12.5471C6.45804 12.7495 6.51976 12.9792 6.52 13.213V13.333C6.52 13.6866 6.66048 14.0258 6.91053 14.2758C7.16057 14.5259 7.49971 14.6663 7.85333 14.6663H8.14667C8.50029 14.6663 8.83943 14.5259 9.08948 14.2758C9.33953 14.0258 9.48 13.6866 9.48 13.333V13.213C9.48024 12.9792 9.54196 12.7495 9.65898 12.5471C9.77599 12.3447 9.94418 12.1766 10.1467 12.0597L10.4333 11.893C10.636 11.776 10.866 11.7144 11.1 11.7144C11.3341 11.7144 11.564 11.776 11.7667 11.893L11.8667 11.9463C12.1726 12.1228 12.5361 12.1707 12.8773 12.0795C13.2186 11.9882 13.5096 11.7653 13.6867 11.4597L13.8333 11.1997C14.0098 10.8937 14.0577 10.5302 13.9665 10.189C13.8752 9.84779 13.6523 9.55671 13.3467 9.37967L13.2467 9.32634C13.0432 9.20887 12.8744 9.03972 12.7573 8.83601C12.6402 8.63231 12.5791 8.40129 12.58 8.16634V7.83301C12.5791 7.59806 12.6402 7.36704 12.7573 7.16334C12.8744 6.95963 13.0432 6.79048 13.2467 6.67301L13.3467 6.61301C13.6523 6.43597 13.8752 6.1449 13.9665 5.80367C14.0577 5.46245 14.0098 5.09896 13.8333 4.79301L13.6867 4.53967C13.5096 4.23403 13.2186 4.01112 12.8773 3.91988C12.5361 3.82864 12.1726 3.87652 11.8667 4.05301L11.7667 4.10634C11.564 4.22337 11.3341 4.28497 11.1 4.28497C10.866 4.28497 10.636 4.22337 10.4333 4.10634L10.1467 3.93967C9.94418 3.82277 9.77599 3.65466 9.65898 3.45223C9.54196 3.2498 9.48024 3.02016 9.48 2.78634V2.66634C9.48 2.31272 9.33953 1.97358 9.08948 1.72353C8.83943 1.47348 8.50029 1.33301 8.14667 1.33301Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Settings</span>
            </NavLink>
          </nav>

          {/* <!-- User Profile --> */}
          <div className={`${style.sidebarFooter}`}>
            <div className={`${style.userProfile}`}>
              <div className={`${style.userAvatar}`}></div>
              <div className={`${style.userInfo}`}>
                <div className={`${style.userName}`}>########</div>
                <div className={`${style.userPosition}`}>Position</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#99A1AF" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </aside>

        <main className={`${style.main_content}`}>
          <div className={`${style.header}`}>
            <div className={`${style.breadcrumb}`}>
              <span>Namaa</span>
              <span className={`${style.separator}`}>›</span>
              <span className={`${style.separator_sub}`}>{breadcrumbName}</span>
            </div>
            <div className={`${style.header_actions}`}>
              <button
                className={`${style.iconBtn} ${style.cartBtn}`}
                onClick={() => setIsCartOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.06109 3.93865H19.3665L17.4246 12.0934C17.2783 12.7072 16.9693 13.2472 16.5445 13.6316C16.1197 14.016 15.6021 14.2239 15.07 14.2239H6.86627C6.26319 14.2243 5.68119 13.9577 5.2318 13.4751C4.7824 12.9924 4.49721 12.3278 4.43087 11.6085L3.44887 1H1" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={`${style.badgeNumber}`}>{cartvalue?.length || 0}</span>
              </button>
              {/* <div className={`${style.notification_badge}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="#6A7282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42112 18.2537 9.16813 18.1079C8.91514 17.9622 8.70484 17.7526 8.55835 17.5" stroke="#6A7282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className={`${style.badge}`}>2</span>
              </div> */}
              <div className={`${style.user_avatar_header}`}>SH</div>
            </div>
          </div>


          {/* Cart Overlay */}
          <div
            className={`${style.cart_overlay} ${isCartOpen ? style.open : ''}`}
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className={`${style.cart_container} ${isCartOpen ? style.open : ''}`}>
            {/* <!-- Header --> */}
            <div className={`${style.cart_header}`}>
              <h1 className={`${style.cart_title}`}>Added Features</h1>
              <button className={`${style.close_cart_btn}`} onClick={() => setIsCartOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15" stroke="#6A7282" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 5L15 15" stroke="#6A7282" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {/* <!-- Main Content --> */}
            <div className={`${style.cart_content}`}>
              {cartItems.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-muted">Your cart is empty</p>
                </div>
              ) : (
                itemTotals.map((item) => (
                  <div key={item.cartItemId} className={`${style.feature_section}`}>
                    <div className={`${style.feature_card}`}>
                      <div className={`${style.feature_card_header}`}>
                        <div className="d-flex align-items-start justify-content-between">
                          <div className="d-flex gap-3">
                            <div className={`${style.feature_icon}`}>
                              {item.iconURL ? (
                                <img src={item.iconURL} alt={item.name} width="24" height="24" />
                              ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 8V4H8" stroke="#8A45B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M18 8H6C4.89543 8 4 8.89543 4 10V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8Z" stroke="#8A45B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <div className={`${style.feature_info}`}>
                              <h3 className={`${style.feature_name}`}>{item.name}</h3>
                              <p className={`${style.feature_description}`}>{item.subTitle}</p>
                              {item.tokenAmount > 0 && (
                                <div className={`${style.feature_base_info}`}>
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M1.99975 6.99984C1.90513 7.00016 1.81237 6.97363 1.73223 6.92333C1.65209 6.87302 1.58787 6.80102 1.54703 6.71567C1.50618 6.63032 1.4904 6.53513 1.5015 6.44117C1.5126 6.3472 1.55014 6.25832 1.60975 6.18484L6.55975 1.08484C6.59688 1.04198 6.64748 1.01302 6.70324 1.0027C6.759 0.992392 6.81661 1.00134 6.86662 1.02809C6.91662 1.05484 6.95604 1.09779 6.97842 1.14989C7.00079 1.202 7.00479 1.26016 6.98975 1.31484L6.02975 4.32484C6.00144 4.4006 5.99194 4.4821 6.00205 4.56234C6.01216 4.64258 6.04158 4.71918 6.0878 4.78555C6.13401 4.85192 6.19564 4.90609 6.26739 4.94342C6.33914 4.98074 6.41887 5.0001 6.49975 4.99984H9.99975C10.0944 4.99951 10.1871 5.02605 10.2673 5.07635C10.3474 5.12665 10.4116 5.19866 10.4525 5.28401C10.4933 5.36936 10.5091 5.46454 10.498 5.55851C10.4869 5.65247 10.4494 5.74136 10.3898 5.81484L5.43975 10.9148C5.40262 10.9577 5.35202 10.9867 5.29626 10.997C5.2405 11.0073 5.18289 10.9983 5.13289 10.9716C5.08288 10.9448 5.04346 10.9019 5.02108 10.8498C4.99871 10.7977 4.99471 10.7395 5.00975 10.6848L5.96975 7.67484C5.99806 7.59908 6.00757 7.51758 5.99746 7.43733C5.98735 7.35709 5.95792 7.2805 5.91171 7.21412C5.86549 7.14775 5.80387 7.09358 5.73211 7.05626C5.66036 7.01893 5.58063 6.99957 5.49975 6.99984H1.99975Z" stroke="#FE9A00" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span>Base: {item.tokenAmount.toLocaleString()} tokens/mo</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <button className={`${style.delete_btn}`} onClick={() => handleDeleteCartItem(item.cartItemId)}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4H14" stroke="#D1D5DC" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12.6667 4V12.6667C12.6667 13.3333 12 14 11.3333 14H4.66667C4 14 3.33333 13.3333 3.33333 12.6667V4" stroke="#D1D5DC" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5.33301 4.00033V2.66699C5.33301 2.00033 5.99967 1.33366 6.66634 1.33366H9.33301C9.99967 1.33366 10.6663 2.00033 10.6663 2.66699V4.00033" stroke="#D1D5DC" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`${style.feature_controls}`}>
                      <div className={`${style.form_group}`}>
                        <label className={`${style.control_label}`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M7.99967 14.6663C11.6816 14.6663 14.6663 11.6816 14.6663 7.99967C14.6663 4.31778 11.6816 1.33301 7.99967 1.33301C4.31778 1.33301 1.33301 4.31778 1.33301 7.99967C1.33301 11.6816 4.31778 14.6663 7.99967 14.6663Z" stroke="#8A45B2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 4V8L10.6667 9.33333" stroke="#8A45B2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Commitment Duration
                        </label>
                        <select
                          className={`form-select ${style.custom_select}`}
                          value={localSelections[item.cartItemId] || ''}
                          onChange={(e) => handleDurationChange(item.cartItemId, e.target.value)}
                        >
                          {item.servicePrices?.map((sp) => (
                            <option key={sp.id} value={sp.durationInDays}>
                              {sp.durationInDays} days
                            </option>
                          ))}
                        </select>
                      </div>

                      {item.servicePrices?.find(sp => sp.durationInDays === (localSelections[item.cartItemId] || Math.round((item.duration || 1) * 30)))?.tokens?.length > 0 && (
                        <div className={`${style.form_group}`}>
                          <label className={`${style.control_label}`}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2.66699 9.33377C2.54083 9.3342 2.41714 9.29882 2.31029 9.23175C2.20344 9.16468 2.11781 9.06867 2.06335 8.95487C2.0089 8.84107 1.98785 8.71416 2.00265 8.58887C2.01746 8.46359 2.06751 8.34507 2.14699 8.2471L8.74699 1.4471C8.7965 1.38996 8.86396 1.35134 8.93831 1.33759C9.01266 1.32384 9.08947 1.33578 9.15614 1.37144C9.22281 1.4071 9.27538 1.46437 9.30521 1.53384C9.33504 1.60331 9.34037 1.68087 9.32032 1.75377L8.04032 5.7671C8.00258 5.86812 7.9899 5.97678 8.00338 6.08377C8.01686 6.19076 8.05609 6.29289 8.11771 6.38139C8.17933 6.46988 8.2615 6.54211 8.35717 6.59187C8.45284 6.64164 8.55915 6.66745 8.66699 6.6671H13.3337C13.4598 6.66667 13.5835 6.70205 13.6904 6.76912C13.7972 6.83619 13.8828 6.9322 13.9373 7.046C13.9917 7.1598 14.0128 7.28671 13.998 7.412C13.9832 7.53728 13.9331 7.6558 13.8537 7.75377L7.25365 14.5538C7.20415 14.6109 7.13668 14.6495 7.06233 14.6633C6.98798 14.677 6.91117 14.6651 6.8445 14.6294C6.77783 14.5938 6.72526 14.5365 6.69543 14.467C6.6656 14.3976 6.66027 14.32 6.68032 14.2471L7.96032 10.2338C7.99806 10.1328 8.01074 10.0241 7.99726 9.9171C7.98378 9.81011 7.94455 9.70798 7.88293 9.61948C7.82131 9.53099 7.73914 9.45876 7.64347 9.40899C7.5478 9.35923 7.44149 9.33342 7.33365 9.33377H2.66699Z" stroke="#8A45B2" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Token Allocation
                          </label>
                          <select
                            className={`form-select ${style.custom_select}`}
                            value={selectedTokenIds[item.cartItemId] || ''}
                            onChange={(e) => handleTokenChange(item.cartItemId, e.target.value)}
                          >
                            {item.servicePrices
                              ?.find(sp => sp.durationInDays === (localSelections[item.cartItemId] || Math.round((item.duration || 1) * 30)))
                              ?.tokens?.map((token) => (
                                <option key={token.id} value={token.id}>
                                  {token.amount} tokens
                                </option>
                              ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className={`${style.price_box} ${!item.servicePrices?.find(sp => sp.durationInDays === (localSelections[item.cartItemId] || Math.round((item.duration || 1) * 30)))?.tokens?.length ? style.price_box_simple : ''}`}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className={`${style.price_label}`}>Total price</span>
                        <span className={`${style.price_value}`}>EGP {item.finalTotal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      {item.servicePrices?.find(sp => sp.durationInDays === (localSelections[item.cartItemId] || Math.round((item.duration || 1) * 30)))?.tokens?.length > 0 && (
                        <p className={`${style.price_hint}`}>Select both options above to see the price</p>
                      )}
                    </div>
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <>
                  <div className={`${style.promo_section}`}>
                    <input
                      type="text"
                      className={`form-control ${style.promo_input}`}
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={discountAmount > 0}
                    />
                    {discountAmount > 0 ? (
                      <button className={`${style.btn} ${style.cancel_promo_btn}`} onClick={handleCancelPromo}>Cancel</button>
                    ) : (
                      <button className={`${style.btn} ${style.cancel_promo_btn}`} onClick={applyPromo}>Apply</button>
                    )}
                  </div>

                  <div className={`${style.totals_box}`}>
                    <div className={`${style.total_row}`}>
                      <span className={`${style.total_label}`}>Subtotal</span>
                      <span className={`${style.total_value}`}>EGP {summary.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    {summary.discount > 0 && (
                      <div className={`${style.total_row} ${style.discount_row}`}>
                        <span className={`${style.discount_label}`}>Commitment savings</span>
                        <span className={`${style.discount_value}`}>-EGP {summary.discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className={`${style.total_row} ${style.discount_row}`}>
                        <span className={`${style.discount_label}`}>Promo discount ({discountAmount}%)</span>
                        <span className={`${style.discount_value}`}>-EGP {(summary.total * (discountAmount / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    <div className={`${style.total_row} ${style.final_row}`}>
                      <span className={`${style.total_label}`}>Final Total</span>
                      <span className={`${style.total_value}`}>EGP {finalCartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* <!-- Footer --> */}
            <div className={`${style.cart_footer}`}>
              <button
                className={`${style.checkout_btn}`}
                onClick={payment}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.33301 8H12.6663" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 3.33333L12.6667 8L8 12.6667" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className={`${style.btn} ${style.cancel_btn}`} onClick={() => setIsCartOpen(false)}>Cancel</button>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>

  </>
}
