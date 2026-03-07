import React, { useContext, useEffect, useState } from 'react';
import style from "./Cart.module.css";
import { userContext } from '../../context/userContext';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CartContextProvider, { CartContext } from '../../context/CartContextProvider';


export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { userToken } = useContext(userContext);
  const [localSelections, setLocalSelections] = useState({});
  const [selectedTokenIds, setSelectedTokenIds] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      const initialDurations = {};
      const initialTokens = {};

      // Load saved selections from localStorage
      const savedSelections = JSON.parse(localStorage.getItem('cart_selections') || '{}');

      cartItems.forEach(item => {
        const savedData = savedSelections[item.cartItemId];
        const targetDays = savedData?.duration || Math.round((item.duration || 1) * 30);

        // Find the closest duration available in servicePrices
        const availableDurations = item.servicePrices?.map(sp => sp.durationInDays) || [];
        const closestDuration = availableDurations.length > 0
          ? availableDurations.reduce((prev, curr) =>
            Math.abs(curr - targetDays) < Math.abs(prev - targetDays) ? curr : prev
            , availableDurations[0])
          : targetDays;

        initialDurations[item.cartItemId] = closestDuration;

        // Find tokens for this specific duration
        const tokensForDuration = item.servicePrices
          ?.find(sp => sp.durationInDays === closestDuration)
          ?.tokens || [];

        // Match by saved ID, then saved amount, or fallback to first available
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


  /////////////////////////////////////


  const selectedServicesPayload = React.useMemo(() => {
    return cartItems.map((item) => {
      const currentDurationDays = localSelections[item.cartItemId] || Math.round((item.duration || 0) * 30);
      const currentTokenId = selectedTokenIds[item.cartItemId];

      const sp = item.servicePrices?.find(sp => sp.durationInDays === currentDurationDays);

      return {
        serviceId: item.serviceId,        // أو item.id حسب اسم الفيلد عندك
        servicePriceId: sp?.id,               // الـ id بتاع الـ servicePrice
        serviceTokensId: Number(currentTokenId) || null,
      };
    });
  }, [cartItems, localSelections, selectedTokenIds]);
  // console.log(selectedServicesPayload);
  // useEffect(() => {
  //   setfinalcheckout({
  //     "serviceItems": [
  //       selectedServicesPayload
  //     ],
  //     "autoRenewal": false,
  //   "paymentMethodId": 0
  // }) 
  // },[selectedServicesPayload])


  async function payment() {
    try {
      const { data } = await api.post('/Orders/services',
        {
          serviceItems: selectedServicesPayload,
          autoRenewal: false,
          paymentMethodId: 0
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );
      console.log(data);
      if (data.paymentCheckoutUrl) {
        window.location.href = data.paymentCheckoutUrl;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while deleting the cart item.",
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
  //////////////////////////

  const handleDurationChange = (cartItemId, duration) => {
    const numDuration = Number(duration);
    setLocalSelections(prev => ({
      ...prev,
      [cartItemId]: numDuration
    }));

    // Persist duration to localStorage immediately
    const saved = JSON.parse(localStorage.getItem('cart_selections') || '{}');
    saved[cartItemId] = { ...saved[cartItemId], duration: numDuration };

    // Find the item and the first token for this duration to sync
    const item = cartItems.find(i => i.cartItemId === cartItemId);
    const firstTokenId = item?.servicePrices
      ?.find(sp => sp.durationInDays === numDuration)
      ?.tokens?.[0]?.id;

    if (firstTokenId) {
      setSelectedTokenIds(prev => ({
        ...prev,
        [cartItemId]: firstTokenId
      }));
      // Update token in persistent storage too
      saved[cartItemId].tokenId = firstTokenId;
    }

    localStorage.setItem('cart_selections', JSON.stringify(saved));
  };

  const handleTokenChange = (cartItemId, tokenId) => {
    setSelectedTokenIds(prev => ({
      ...prev,
      [cartItemId]: tokenId
    }));

    // Persist to localStorage
    const saved = JSON.parse(localStorage.getItem('cart_selections') || '{}');
    saved[cartItemId] = { ...saved[cartItemId], tokenId: tokenId };
    localStorage.setItem('cart_selections', JSON.stringify(saved));
  };

  async function getCartItems() {
    try {
      const { data } = await api.get('Cart', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      setCartItems(data);
      // console.log("Cart Data:", data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while deleting the cart item.",
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



  useEffect(() => {
    if (userToken) {
      getCartItems();
    }

  }, [userToken])




  // Calculate accurate totals based on current local selections or server defaults
  const itemTotals = React.useMemo(() => {
    return cartItems.map(item => {
      const currentDurationDays = localSelections[item.cartItemId] || Math.round((item.duration || 0) * 30);
      const currentTokenId = selectedTokenIds[item.cartItemId];

      // Find the specific price configuration for the current selection
      const sp = item.servicePrices?.find(sp => sp.durationInDays === currentDurationDays);
      const token = sp?.tokens?.find(t => String(t.id) === String(currentTokenId));

      // New Core Logic: Total Monthly = Base Duration Price (sp.price) + Token Price (token.price)
      const basePrice = sp ? (sp.price || 0) : (item.price || 0); // Fallback to item.price if sp missing
      const tokenPrice = token ? (token.price || 0) : 0;

      const monthlyPrice = basePrice + tokenPrice;
      const durationMonths = currentDurationDays / 30; // Pro-rated exact months

      const subtotalBeforeDiscount = basePrice + tokenPrice;
      const isOnSale = sp ? sp.isOnSale : false;
      const discountPercentage = isOnSale ? (sp.salePercentage || 0) : 0;
      const discountAmount = subtotalBeforeDiscount * (discountPercentage / 100);
      const finalTotal = subtotalBeforeDiscount - discountAmount;

      return {
        cartItemId: item.cartItemId,
        basePrice,
        tokenPrice,
        monthlyPrice,
        durationMonths,
        subtotalBeforeDiscount,
        discountAmount,
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

  async function applyPromoCode() {
    console.log("okkkkk");

  }


  ///////////////////////////////////////////////////////////////
  const { getCart } = useContext(CartContext);
  async function DeleteCartItem(cartItemId) {
    try {
      await api.delete(`/Cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      getCartItems();
      getCart();
      toast.success("Cart item deleted successfully.");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while deleting the cart item.",
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



  return (
    <>
      <main className={style['main-content']}>

        <div className={`${style['container-custom']} py-4`}>
          {/* <!-- Content Wrapper --> */}
          <div className=" p-4 rounded-4">
            {/* <!-- Header --> */}
            <div className={`${style['page-header']} d-flex align-items-center mb-4 p-3 ${style['bg-light-gray']}`}>
              <button onClick={() => navigate(-1)} className={`btn btn-back border-0 bg-transparent text-muted  ${style.btnBack}`}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div>
                <h1 className="h4 mb-1 fw-bold">Cart</h1>
                <p className="text-muted mb-0 small" style={{ fontFamily: "'Arimo', sans-serif" }}>Customize your features to optimize your costs</p>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className={style['empty-state-card']}>
                  {/* <!-- Icon Container --> */}
                  <div className="d-flex justify-content-center mb-4">
                    <div className={style['icon-circle']}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M30.0003 3.33301H10.0003C8.15938 3.33301 6.66699 4.82539 6.66699 6.66634V33.333C6.66699 35.174 8.15938 36.6663 10.0003 36.6663H30.0003C31.8413 36.6663 33.3337 35.174 33.3337 33.333V6.66634C33.3337 4.82539 31.8413 3.33301 30.0003 3.33301Z" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.333 10H26.6663" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M26.667 23.333V29.9997" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M26.667 16.667H26.6837" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 16.667H20.0167" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.333 16.667H13.3497" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 23.333H20.0167" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.333 23.333H13.3497" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 30H20.0167" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.333 30H13.3497" stroke="#8A45B2" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* <!-- Heading --> */}
                  <h3 className={`${style['empty-state-heading']} text-center mb-4`}>No items in estimate</h3>

                  {/* <!-- Description --> */}
                  <p className={`${style['empty-state-description']} text-center mb-4`}>Add features to your estimate to calculate costs and proceed with setup.</p>

                  {/* <!-- Action Buttons --> */}
                  <div className="d-flex justify-content-center gap-3">
                    <button onClick={() => navigate('/features')} className={style['btn-primary-gradient']}>Browse Features</button>
                    <button onClick={() => navigate('/pricing')} className={style['btn-secondary-outline']}>View Pricing</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {/* <!-- Left Column: Items --> */}
                <div className="col-lg-8">
                  <div className="d-flex flex-column gap-4">
                    {cartItems.map((item) => {
                      const itTotal = itemTotals.find(it => it.cartItemId === item.cartItemId) || {};
                      return (
                        <div key={item.cartItemId} className={style['pricing-card']}>
                          <div className={style['card-header-custom']}>
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="d-flex gap-3 flex-grow-1">
                                <div className={style['icon-box-gradient']}>
                                  <img src={`https://deebai.runasp.net${item.iconURL}`} alt="" />
                                </div>
                                <div className="flex-grow-1">
                                  <h3 className={style['card-title-custom']}>{item.name}</h3>
                                  <p className={style['card-subtitle-custom']}>{item.subTitle}</p>
                                </div>
                              </div>
                              <button className={style['btn-close-custom']} aria-label="Close" onClick={() => DeleteCartItem(item.cartItemId)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M12 4L4 12" stroke="#302F31" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M4 4L12 12" stroke="#302F31" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className={style['card-body-custom']}>
                            <div className={style['config-section']}>
                              <h4 className={style['section-title-custom']}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="me-2">
                                  <path d="M13.5 1.5H4.5C3.67157 1.5 3 2.17157 3 3V15C3 15.8284 3.67157 16.5 4.5 16.5H13.5C14.3284 16.5 15 15.8284 15 15V3C15 2.17157 14.3284 1.5 13.5 1.5Z" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6 4.5H12" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M12 10.5V13.5" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M12 7.5H12.0075" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M9 7.5H9.0075" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6 7.5H6.0075" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M9 10.5H9.0075" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6 10.5H6.0075" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M9 13.5H9.0075" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M6 13.5H6.0075" stroke="#3D1B6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Configure Your Plan
                              </h4>

                              <div className="row g-3">
                                <div className="col-md-6">
                                  <label className={style['form-label-custom']}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
                                      <path d="M7.99967 14.6663C11.6816 14.6663 14.6663 11.6816 14.6663 7.99967C14.6663 4.31778 11.6816 1.33301 7.99967 1.33301C4.31778 1.33301 1.33301 4.31778 1.33301 7.99967C1.33301 11.6816 4.31778 14.6663 7.99967 14.6663Z" stroke="#8A45B2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M8 4V8L10.6667 9.33333" stroke="#8A45B2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Commitment Duration
                                  </label>
                                  <div className={style['select-wrapper']}>
                                    <select
                                      className={style['form-select-custom']}
                                      value={localSelections[item.cartItemId] || Math.round((item.duration || 0) * 30) || ""}
                                      onChange={(e) => handleDurationChange(item.cartItemId, e.target.value)}
                                    >
                                      {Array.from(new Set(item?.servicePrices?.map(sp => sp.durationInDays)))
                                        .sort((a, b) => a - b)
                                        .map((days) => (
                                          <option key={days} value={days}>
                                            {days} days
                                          </option>
                                        ))}
                                    </select>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={style['select-arrow']}>
                                      <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                                    </svg>
                                  </div>
                                </div>
                                {item?.servicePrices[0]?.tokens.length > 0 && (
                                  <div className="col-md-6">
                                    <label className={style['form-label-custom']}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="me-2">
                                        <path d="M2.66699 9.33377C2.54083 9.3342 2.41714 9.29882 2.31029 9.23175C2.20344 9.16468 2.11781 9.06867 2.06335 8.95487C2.0089 8.84107 1.98785 8.71416 2.00265 8.58887C2.01746 8.46359 2.06751 8.34507 2.14699 8.2471L8.74699 1.4471C8.7965 1.38996 8.86396 1.35134 8.93831 1.33759C9.01266 1.32384 9.08947 1.33578 9.15614 1.37144C9.22281 1.4071 9.27538 1.46437 9.30521 1.53384C9.33504 1.60331 9.34037 1.68087 9.32032 1.75377L8.04032 5.7671C8.00258 5.86812 7.9899 5.97678 8.00338 6.08377C8.01686 6.19076 8.05609 6.29289 8.11771 6.38139C8.17933 6.46988 8.2615 6.54211 8.35717 6.59187C8.45284 6.64164 8.55915 6.66745 8.66699 6.6671H13.3337C13.4598 6.66667 13.5835 6.70205 13.6904 6.76912C13.7972 6.83619 13.8828 6.9322 13.9373 7.046C13.9917 7.1598 14.0128 7.28671 13.998 7.412C13.9832 7.53728 13.9331 7.6558 13.8537 7.75377L7.25365 14.5538C7.20415 14.6109 7.13668 14.6495 7.06233 14.6633C6.98798 14.677 6.91117 14.6651 6.84450 14.6294C6.77783 14.5938 6.72526 14.5365 6.69543 14.467C6.66560 14.3976 6.66027 14.32 6.68032 14.2471L7.96032 10.2338C7.99806 10.1328 8.01074 10.0241 7.99726 9.9171C7.98378 9.81011 7.94455 9.70798 7.88293 9.61948C7.82131 9.53099 7.73914 9.45876 7.64347 9.40899C7.54780 9.35923 7.44149 9.33342 7.33365 9.33377H2.66699Z" stroke="#8A45B2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      Token Allocation
                                    </label>
                                    <div className={style['select-wrapper']}>
                                      <select
                                        className={style['form-select-custom']}
                                        value={selectedTokenIds[item.cartItemId] || ""}
                                        onChange={(e) => handleTokenChange(item.cartItemId, e.target.value)}
                                      >
                                        {item?.servicePrices
                                          ?.filter(sp => sp.durationInDays === (localSelections[item.cartItemId] || Math.round((item.duration || 0) * 30)))
                                          ?.flatMap(sp => sp.tokens || [])
                                          ?.map((token) => (
                                            <option key={token.id} value={token.id}>
                                              {token.amount} Tokens
                                            </option>
                                          ))}
                                      </select>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={style['select-arrow']}>
                                        <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {itTotal.isOnSale && (
                                <div className={style['discount-box']}>
                                  <div className="d-flex align-items-center gap-2">
                                    <div className={style['discount-icon']}>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </div>
                                    <div>
                                      <div className={style['discount-title']}>{itTotal.discountPercentage}% Discount Applied</div>
                                      <div className={style['discount-subtitle']}>
                                        You're saving EGP {(itTotal.discountAmount || 0).toFixed(2)} with your commitment
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className={style['divider-custom']}></div>

                            <div className={style['cost-breakdown-section']}>
                              <h4 className={style['section-title-breakdown']}>Cost Breakdown</h4>
                              <div className={style['cost-item']}>
                                <span className={style['cost-label']}>Duration commitment</span>
                                <span className={style['cost-value']}>
                                  {itTotal.durationMonths.toFixed(2)}
                                  {itTotal.durationMonths === 1 ? ' month' : ' months'}
                                </span>
                              </div>
                              <div className={style['cost-item']}>
                                <span className={style['cost-label']}>Base Service Price</span>
                                <span className={style['cost-value']}>EGP {(itTotal.basePrice || 0).toFixed(2)}</span>
                              </div>
                              <div className={style['cost-item']}>
                                <span className={style['cost-label']}>Token Allocation Price ({itTotal.tokenAmount || 0} tokens)</span>
                                <span className={style['cost-value']}>EGP {(itTotal.tokenPrice || 0).toFixed(2)}</span>
                              </div>
                              <div className={style['cost-divider-thin']}></div>
                              <div className={style['cost-item']}>
                                <span className={style['cost-label']}>Subtotal before discount</span>
                                <span className={style['cost-value']}>EGP {(itTotal.subtotalBeforeDiscount || 0).toFixed(2)}</span>
                              </div>
                              {itTotal.isOnSale && (
                                <div className={`${style['cost-item']} ${style['discount-row']}`}>
                                  <span className={style['cost-label-green']}>Commitment discount ({itTotal.discountPercentage}%)</span>
                                  <span className={style['cost-value-green']}>-EGP {(itTotal.discountAmount || 0).toFixed(2)}</span>
                                </div>
                              )}
                              <div className={style['cost-divider-thick']}></div>
                              <div className={style['total-cost-row']}>
                                <span className={style['total-label']}>Total Cost</span>
                                <div className={style['total-value-wrapper']}>
                                  <div className={style['total-value']}>EGP {(itTotal.finalTotal || 0).toFixed(2)}</div>
                                  <div className={style['total-subtitle']}>for entire period</div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Summary */}
                <div className='col-lg-4'>
                  <div className="col-lg-4 w-100">
                    <div className={`card ${style['summary-card']} border-0 shadow-sm rounded-4`}>
                      <div className={`card-header ${style['bg-light-gray']} border-bottom p-4 rounded-top-4`}>
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-clipboard-data text-muted"></i>
                          <h6 className={`fw-bold mb-0 ${style['text-sm']}`}>Total Estimate</h6>
                        </div>
                      </div>
                      <div className="card-body p-4 bg-white rounded-bottom-4">
                        {cartItems.map((item) => {
                          const itTotal = itemTotals.find(it => it.cartItemId === item.cartItemId) || {};
                          return (
                            <div key={item.cartItemId} className="summary-item mb-3">
                              <div className="d-flex justify-content-between mb-1">
                                <span className={`text-muted ${style['text-sm']}`} style={{ fontFamily: "'Arimo', sans-serif" }}>{item.name}</span>
                                <span className={`fw-bold ${style['text-sm']}`}>EGP {(itTotal.finalTotal || 0).toFixed(2)}</span>
                              </div>
                              <div className="text-muted" style={{ fontSize: '12px' }}>
                                EGP {(itTotal.monthlyPrice || 0).toFixed(2)} × {itTotal.durationMonths.toFixed(2)} {itTotal.durationMonths === 1 ? 'month' : 'months'} {itTotal.isOnSale ? `(Discount applied)` : ''}
                              </div>
                            </div>
                          );
                        })}
                        <hr className={`${style.divider} my-4`} />
                        <div className="d-flex justify-content-between mb-2">
                          <span className={`text-muted ${style['text-sm']}`}>Subtotal</span>
                          <span className={`fw-bold ${style['text-sm']}`}>EGP {(summary.subtotal || 0).toFixed(2)}</span>
                        </div>
                        {(summary.discount || 0) > 0 && (
                          <div className="d-flex justify-content-between mb-4">
                            <span className={`${style['text-green']} ${style['text-sm']}`}>Commitment savings</span>
                            <span className={`fw-bold ${style['text-green']} ${style['text-sm']}`}>-EGP {(summary.discount || 0).toFixed(2)}</span>
                          </div>
                        )}
                        <hr className={`${style.divider} my-4`} />
                        <div className="d-flex justify-content-between align-items-start mb-4">
                          <span className={`fw-bold text-dark ${style['text-sm']}`}>Total</span>
                          <div className="text-end">
                            <div className={`${style['text-purple']} fs-4 fw-bold mb-0`}>EGP {(summary.total || 0).toFixed(2)}</div>
                            <div className="text-muted" style={{ fontSize: '12px' }}>Total for commitment period</div>

                          </div>
                        </div>
                        <div className={`${style['promo-section']} `}>
                          <div className="d-flex gap-2">
                            <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} type="text" className={`${style['promo-input']} `} placeholder="Enter a promo code" />
                            <button disabled={!promoCode.trim()} onClick={applyPromoCode} className={`${style['apply-button']} ${!promoCode.trim() ? style['apply-button-disabled'] : ''}  `}>Apply</button>
                          </div>
                        </div>
                        <hr className={`${style.divider} my-4`} />

                        <button onClick={payment} className={` ${style['btn-gradient']} mb-2 d-flex justify-content-center align-items-center gap-2 p-2 rounded-2`}>
                          Proceed to payment
                        </button>
                        <button onClick={() => navigate('/features')} className={` ${style['btn-outline-custom']} mb-2 d-flex justify-content-center align-items-center gap-2 p-2 rounded-2 text-dark border`}>Add more features</button>
                        <div className="mt-4 pt-3 border-top">
                          <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Final pricing subject to terms. Annual prepayment may be required for certain commitments.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${style.help_card}`}>
                    <h4 className={`${style.help_title}`} >Need Help?</h4>
                    <p className={`${style.help_text}`}>Contact our support team for assistance</p>
                    <button className={`${style.btn_contact}`}>
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* <!-- Imported SVG paths for Support Icon --> */}
                        <path
                          d="M12.7501 6.99387C12.7501 6.71707 12.7501 6.57868 12.7917 6.45548C12.9125 6.09709 13.2317 5.95869 13.5517 5.8131C13.9101 5.6491 14.0893 5.5675 14.2676 5.5531C14.4692 5.5371 14.6716 5.5803 14.8444 5.6771C15.0732 5.8051 15.2332 6.04989 15.3964 6.24828C16.1508 7.16506 16.5284 7.62345 16.666 8.12824C16.778 8.53623 16.778 8.96342 16.666 9.37061C16.4652 10.1082 15.8292 10.7258 15.358 11.2986C15.1172 11.5906 14.9964 11.7369 14.8444 11.8225C14.6687 11.92 14.4679 11.9632 14.2676 11.9465C14.0893 11.9321 13.9101 11.8505 13.5509 11.6866C13.2309 11.541 12.9125 11.4026 12.7917 11.0442C12.7501 10.921 12.7501 10.7826 12.7501 10.5058V6.99387ZM4.75024 6.99387C4.75024 6.64508 4.74064 6.33228 4.45904 6.08749C4.35665 5.99869 4.22065 5.93709 3.94945 5.8131C3.59026 5.6499 3.41106 5.5675 3.23267 5.5531C2.69908 5.5099 2.41188 5.87469 2.10469 6.24908C1.34951 7.16506 0.971913 7.62345 0.833515 8.12904C0.722162 8.53568 0.722162 8.96477 0.833515 9.37141C1.03511 10.1082 1.6719 10.7266 2.14229 11.2986C2.43908 11.6586 2.72308 11.9873 3.23267 11.9465C3.41106 11.9321 3.59026 11.8505 3.94945 11.6866C4.22145 11.5634 4.35665 11.501 4.45904 11.4122C4.74064 11.1674 4.75024 10.8546 4.75024 10.5066V6.99387Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M3.15027 5.54988C3.15027 2.89875 5.65742 0.75 8.75016 0.75C11.8429 0.75 14.3501 2.89875 14.3501 5.54988"
                          stroke="black"
                          strokeLinecap="square"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M14.3501 11.9498V12.5898C14.3501 14.0033 12.9181 15.1497 11.1501 15.1497H9.55015"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span>Contact Support</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
