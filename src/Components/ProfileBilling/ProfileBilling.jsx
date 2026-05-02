import React, { useContext, useEffect, useState } from 'react'
import style from './ProfileBilling.module.css'
import api from '../../api';
import { userContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function ProfileBilling() {

  let { userToken, loading } = useContext(userContext);

  const [savedCards, setSavedCards] = useState();
  const [upcomingCharges, setUpcomingCharges] = useState([]);
  const [invoiceHistory, setInvoiceHistory] = useState([]);

  async function getPaymentCards() {
    try {
      let { data } = await api.get('/SavedCards', {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      });
      // console.log(data);
      setSavedCards(data);

    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong, can't get payment cards",
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
            height: "60px",
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

  async function addNewCard() {
    try {
      let { data } = await api.post('/SavedCards/enroll', {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      });
      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, '_blank');
        getPaymentCards();
        console.log(savedCards);

      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong, can't add new card",
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
            height: "60px",
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

  async function deleteSavedCard(cardId) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this card?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FB2C36",
      cancelButtonColor: "#6A7282",
      confirmButtonText: "Yes, remove it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let { data } = await api.delete(`/SavedCards/${cardId}`, {
            headers: {
              "Authorization": `Bearer ${userToken}`
            }
          });
          // console.log(data);
          toast.success("Card deleted successfully!");
          getPaymentCards();
        } catch (error) {
          console.log(error);
          toast.error(
            error.response?.data?.errors[1] ||
            "Something went wrong, can't delete this card",
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
                height: "60px",
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
    });
  }

  async function setDefaultCard(cardId) {
    try {
      let { data } = await api.put(`/SavedCards/${cardId}/set-default`,
        {
          headers: {
            "Authorization": `Bearer ${userToken}`
          }
        });
      // console.log(data);
      toast.success("Card set as default successfully!");
      getPaymentCards();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong, can't set default card",
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
            height: "60px",
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

  async function getUpcomingCharges() {
    try {
      let { data } = await api.get('/Billing/upcoming-payments', {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      });
      // console.log(data);
      setUpcomingCharges(data);
    } catch (error) {
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong, can't get upcoming charges",
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
            height: "60px",
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

  async function getInvoiceHistory() {
    try {
      let { data } = await api.get('/Billing/invoice-history', {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      });
      // console.log(data);
      setInvoiceHistory(data);
    } catch (error) {
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong, can't get invoices",
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
            height: "60px",
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
      getPaymentCards();
      getUpcomingCharges();
      getInvoiceHistory();
    }

    const handleFocus = () => {
      if (userToken) {
        getPaymentCards();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [userToken])

  return (


    <div>
      {/* <!-- Page Content --> */}
      <div className={`${style.pageContent}`}>
        {/* <!-- Page Title --> */}
        <div className={`${style.pageTitleSection}`}>
          <h1 className={`${style.pageTitle}`}>Billing</h1>
          <p className={`${style.pageSubtitle}`}>Manage your payment methods and invoices</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className={`${style.paymentSection}`}>
              {/* <!-- Payment Method Section --> */}
              <div className={`${style.sectionHeader}`}>
                <div>
                  <h2 className={`${style.sectionTitle}`}>Payment Method</h2>
                  <p className={`${style.sectionDescription}`}>Your saved payment information</p>
                </div>

              </div>

              <div className="row g-4">
                {/* <!-- Card 1 - Primary (Mastercard) --> */}
                {savedCards?.map((card) => (
                  <div key={card.id} className={`col-md-6 ${card.isDefault ? "order-0" : ''}`}>
                    <div className={`${style.creditCard} ${card.isDefault ? style.primaryCard : ""}`}>
                      <div className={`${style.cardVisual} ${style.purpleGradient}`}>
                        <div className={`${style.cardBackgroundCircle} ${style.circle1}`}></div>
                        <div className={`${style.cardBackgroundCircle} ${style.circle2}`}></div>
                        {card.isDefault ? <span className={`${style.cardBadge} ${style.primaryBadge}`}>Primary</span>
                          : ""}

                        <div className={`${style.cardContent}`}>
                          <div className={`${style.cardHeaderRow}`}>
                            <div className={`${style.cardChip}`}>
                              <div className={`${style.chipGrid}`}>
                                <span></span><span></span>
                                <span></span><span></span>
                              </div>
                            </div>
                            <svg className={`${style.cardIcon}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="4" fill="white" opacity="0.65" />
                            </svg>
                          </div>

                          <div className={`${style.cardNumber}`}>{card.maskedPan}</div>

                          <div className={`${style.cardDetailsRow}`}>
                            <div className={`${style.cardDetail}`}>
                              <div className={`${style.cardLabel}`}>CARD HOLDER</div>
                              {/* <div className={`${style.cardValue}`}>SARAH HESHAM</div> */}
                            </div>
                            <div className={`${style.cardDetail}`}>
                              <div className={`${style.cardLabel}`}>EXPIRES</div>
                              {/* <div className={`${style.cardValue}`}>08/28</div> */}
                            </div>
                            <div className={`${style.mastercardLogo}`}>
                              <span className={`${style.circle}`}></span>
                              <span className={`${style.circle}`} style={{ backgroundColor: 'yellow' }}></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`${style.cardInfo}`}>
                        <div className={`${style.cardInfoHeader}`}>
                          <div>
                            <div className={`${style.cardName}`}>{card.cardBrand}</div>
                          </div>
                          {card.isDefault ? <span className={`${style.badgePrimary}`}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M5.7634 1.14745C5.78531 1.10318 5.81916 1.06591 5.86113 1.03986C5.90309 1.01381 5.9515 1 6.0009 1C6.0503 1 6.09871 1.01381 6.14067 1.03986C6.18264 1.06591 6.21649 1.10318 6.2384 1.14745L7.3934 3.48695C7.46949 3.64093 7.58181 3.77415 7.72071 3.87517C7.85962 3.9762 8.02096 4.042 8.1909 4.06695L10.7739 4.44495C10.8228 4.45204 10.8688 4.47268 10.9066 4.50455C10.9445 4.53641 10.9726 4.57822 10.9879 4.62525C11.0032 4.67228 11.005 4.72265 10.9932 4.77066C10.9814 4.81868 10.9563 4.86242 10.9209 4.89695L9.0529 6.71595C8.92971 6.836 8.83754 6.98419 8.78432 7.14776C8.7311 7.31133 8.71843 7.48539 8.7474 7.65495L9.1884 10.2249C9.19704 10.2739 9.19176 10.3242 9.17315 10.3703C9.15454 10.4163 9.12336 10.4563 9.08317 10.4854C9.04298 10.5146 8.99539 10.5319 8.94583 10.5354C8.89628 10.5388 8.84675 10.5283 8.8029 10.5049L6.4939 9.29095C6.34176 9.21106 6.17249 9.16932 6.00065 9.16932C5.82881 9.16932 5.65954 9.21106 5.5074 9.29095L3.1989 10.5049C3.15507 10.5282 3.1056 10.5386 3.05613 10.5351C3.00665 10.5316 2.95916 10.5142 2.91905 10.4851C2.87894 10.4559 2.84782 10.416 2.82923 10.3701C2.81064 10.3241 2.80533 10.2738 2.8139 10.2249L3.2544 7.65545C3.2835 7.48581 3.27089 7.31165 3.21767 7.14797C3.16445 6.98429 3.0722 6.83602 2.9489 6.71595L1.0809 4.89745C1.0452 4.86296 1.0199 4.81914 1.00788 4.77098C0.995866 4.72282 0.997618 4.67226 1.01294 4.62504C1.02826 4.57783 1.05653 4.53587 1.09454 4.50394C1.13254 4.47201 1.17875 4.4514 1.2279 4.44445L3.8104 4.06695C3.98053 4.0422 4.14209 3.97648 4.28119 3.87544C4.42029 3.77441 4.53275 3.64108 4.6089 3.48695L5.7634 1.14745Z" fill="#8A45B2" stroke="#8A45B2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Default
                          </span> : <button onClick={() => setDefaultCard(card.id)} className={` ${style.badgeDefault}`}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M5.7634 1.14745C5.78531 1.10318 5.81916 1.06591 5.86113 1.03986C5.90309 1.01381 5.9515 1 6.0009 1C6.0503 1 6.09871 1.01381 6.14067 1.03986C6.18264 1.06591 6.21649 1.10318 6.2384 1.14745L7.3934 3.48695C7.46949 3.64093 7.58181 3.77415 7.72071 3.87517C7.85962 3.9762 8.02096 4.042 8.1909 4.06695L10.7739 4.44495C10.8228 4.45204 10.8688 4.47268 10.9066 4.50455C10.9445 4.53641 10.9726 4.57822 10.9879 4.62525C11.0032 4.67228 11.005 4.72265 10.9932 4.77066C10.9814 4.81868 10.9563 4.86242 10.9209 4.89695L9.0529 6.71595C8.92971 6.836 8.83754 6.98419 8.78432 7.14776C8.7311 7.31133 8.71843 7.48539 8.7474 7.65495L9.1884 10.2249C9.19704 10.2739 9.19176 10.3242 9.17315 10.3703C9.15454 10.4163 9.12336 10.4563 9.08317 10.4854C9.04298 10.5146 8.99539 10.5319 8.94583 10.5354C8.89628 10.5388 8.84675 10.5283 8.8029 10.5049L6.4939 9.29095C6.34176 9.21106 6.17249 9.16932 6.00065 9.16932C5.82881 9.16932 5.65954 9.21106 5.5074 9.29095L3.1989 10.5049C3.15507 10.5282 3.1056 10.5386 3.05613 10.5351C3.00665 10.5316 2.95916 10.5142 2.91905 10.4851C2.87894 10.4559 2.84782 10.416 2.82923 10.3701C2.81064 10.3241 2.80533 10.2738 2.8139 10.2249L3.2544 7.65545C3.2835 7.48581 3.27089 7.31165 3.21767 7.14797C3.16445 6.98429 3.0722 6.83602 2.9489 6.71595L1.0809 4.89745C1.0452 4.86296 1.0199 4.81914 1.00788 4.77098C0.995866 4.72282 0.997618 4.67226 1.01294 4.62504C1.02826 4.57783 1.05653 4.53587 1.09454 4.50394C1.13254 4.47201 1.17875 4.4514 1.2279 4.44445L3.8104 4.06695C3.98053 4.0422 4.14209 3.97648 4.28119 3.87544C4.42029 3.77441 4.53275 3.64108 4.6089 3.48695L5.7634 1.14745Z" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Set As Default
                          </button>}

                        </div>
                        <div onClick={() => deleteSavedCard(card.id)} className={`${style.cardActions}`}>
                          <button className={`${style.btnCardAction} ${style.danger}`}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M1.75 3.5H12.25" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M11.0827 3.5V11.6667C11.0827 12.25 10.4993 12.8333 9.91602 12.8333H4.08268C3.49935 12.8333 2.91602 12.25 2.91602 11.6667V3.5" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4.66602 3.49935V2.33268C4.66602 1.74935 5.24935 1.16602 5.83268 1.16602H8.16602C8.74935 1.16602 9.33268 1.74935 9.33268 2.33268V3.49935" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5.83398 6.41602V9.91602" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M8.16602 6.41602V9.91602" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}


                {/* <!-- Card 2 - Expired (Visa) --> */}
                {/* <div className="col-md-6">
                  <div className={`${style.creditCard}`}>
                    <div className={`${style.cardVisual} ${style.darkGradient}`}>
                      <div className={`${style.cardBackgroundCircle} ${style.circle1}`}></div>
                      <div className={`${style.cardBackgroundCircle} ${style.circle2}`}></div>
                      <span className={`${style.cardBadge} ${style.expiredBadge}`}>Expired</span>

                      <div className={`${style.cardContent}`}>
                        <div className={`${style.cardHeaderRow}`}>
                          <div className={`${style.cardChip}`}>
                            <div className={`${style.chipGrid}`}>
                              <span></span><span></span>
                              <span></span><span></span>
                            </div>
                          </div>
                          <svg className={`${style.cardIcon}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="4" fill="white" opacity="0.65" />
                          </svg>
                        </div>

                        <div className={`${style.cardNumber}`}>**** **** **** 7890</div>

                        <div className={`${style.cardDetailsRow}`}>
                          <div className={`${style.cardDetail}`}>
                            <div className={`${style.cardLabel}`}>CARD HOLDER</div>
                            <div className={`${style.cardValue}`}>SARA HESHAM</div>
                          </div>
                          <div className={`${style.cardDetail}`}>
                            <div className={`${style.cardLabel}`}>EXPIRES</div>
                            <div className={`${style.cardValue}`}>1/26</div>
                          </div>
                          <div className={`${style.visaLogo}`}>VISA</div>
                        </div>
                      </div>
                    </div>

                    <div className={`${style.cardInfo}`}>
                      <div className={`${style.cardInfoHeader}`}>
                        <div>
                          <div className={`${style.cardName}`}>Visa ••7890</div>
                          <div className={`${style.cardBank}`}>NBE Bank</div>
                        </div>
                        <span className={`${style.badgeDefault}`}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M5.7634 1.14745C5.78531 1.10318 5.81916 1.06591 5.86113 1.03986C5.90309 1.01381 5.9515 1 6.0009 1C6.0503 1 6.09871 1.01381 6.14067 1.03986C6.18264 1.06591 6.21649 1.10318 6.2384 1.14745L7.3934 3.48695C7.46949 3.64093 7.58181 3.77415 7.72071 3.87517C7.85962 3.9762 8.02096 4.042 8.1909 4.06695L10.7739 4.44495C10.8228 4.45204 10.8688 4.47268 10.9066 4.50455C10.9445 4.53641 10.9726 4.57822 10.9879 4.62525C11.0032 4.67228 11.005 4.72265 10.9932 4.77066C10.9814 4.81868 10.9563 4.86242 10.9209 4.89695L9.0529 6.71595C8.92971 6.836 8.83754 6.98419 8.78432 7.14776C8.7311 7.31133 8.71843 7.48539 8.7474 7.65495L9.1884 10.2249C9.19704 10.2739 9.19176 10.3242 9.17315 10.3703C9.15454 10.4163 9.12336 10.4563 9.08317 10.4854C9.04298 10.5146 8.99539 10.5319 8.94583 10.5354C8.89628 10.5388 8.84675 10.5283 8.8029 10.5049L6.4939 9.29095C6.34176 9.21106 6.17249 9.16932 6.00065 9.16932C5.82881 9.16932 5.65954 9.21106 5.5074 9.29095L3.1989 10.5049C3.15507 10.5282 3.1056 10.5386 3.05613 10.5351C3.00665 10.5316 2.95916 10.5142 2.91905 10.4851C2.87894 10.4559 2.84782 10.416 2.82923 10.3701C2.81064 10.3241 2.80533 10.2738 2.8139 10.2249L3.2544 7.65545C3.2835 7.48581 3.27089 7.31165 3.21767 7.14797C3.16445 6.98429 3.0722 6.83602 2.9489 6.71595L1.0809 4.89745C1.0452 4.86296 1.0199 4.81914 1.00788 4.77098C0.995866 4.72282 0.997618 4.67226 1.01294 4.62504C1.02826 4.57783 1.05653 4.53587 1.09454 4.50394C1.13254 4.47201 1.17875 4.4514 1.2279 4.44445L3.8104 4.06695C3.98053 4.0422 4.14209 3.97648 4.28119 3.87544C4.42029 3.77441 4.53275 3.64108 4.6089 3.48695L5.7634 1.14745Z" stroke="#6A7282" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Default
                        </span>
                      </div>
                      <div className={`${style.cardActions}`}>
                        <button className={`${style.btnCardAction}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H11.0833C11.3928 12.25 11.6895 12.1271 11.9083 11.9083C12.1271 11.6895 12.25 11.3928 12.25 11.0833V7" stroke="#4A5565" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.7185 1.53138C10.9505 1.29932 11.2653 1.16895 11.5935 1.16895C11.9217 1.16895 12.2364 1.29932 12.4685 1.53138C12.7005 1.76345 12.8309 2.07819 12.8309 2.40638C12.8309 2.73457 12.7005 3.04932 12.4685 3.28138L7.2109 8.53955C7.07238 8.67794 6.90127 8.77925 6.71331 8.83413L5.0374 9.32413C4.9872 9.33877 4.93399 9.33965 4.88334 9.32667C4.83269 9.3137 4.78646 9.28734 4.74949 9.25037C4.71252 9.2134 4.68616 9.16717 4.67319 9.11652C4.66021 9.06587 4.66109 9.01266 4.67573 8.96247L5.16573 7.28655C5.22087 7.09874 5.32237 6.92783 5.4609 6.78955L10.7185 1.53138Z" stroke="#4A5565" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Update
                        </button>
                        <button className={`${style.btnCardAction} ${style.danger}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1.75 3.5H12.25" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.0827 3.5V11.6667C11.0827 12.25 10.4993 12.8333 9.91602 12.8333H4.08268C3.49935 12.8333 2.91602 12.25 2.91602 11.6667V3.5" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.66602 3.49935V2.33268C4.66602 1.74935 5.24935 1.16602 5.83268 1.16602H8.16602C8.74935 1.16602 9.33268 1.74935 9.33268 2.33268V3.49935" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.83398 6.41602V9.91602" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.16602 6.41602V9.91602" stroke="#FB2C36" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <!-- Card 3 - Add New Card --> */}
                <div className="col-md-6">
                  <div onClick={addNewCard} className={`${style.emptyCardBox}`}>
                    <div className={`${style.emptyCardIcon}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className={`${style.emptyCardText}`}>Add New Card</span>
                  </div>
                </div>
              </div>

              <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: '#6A7282', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.2" />
                    <path d="M8 4V8" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="8" cy="11.5" r="1" fill="#9CA3AF" />
                  </svg>
                  Your primary card is charged automatically on your billing date. You can change the primary card at any time.
                </span>
                <span style={{ fontSize: '13px', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M14.4866 12.0005L9.15329 2.66714C9.037 2.46194 8.86836 2.29127 8.66457 2.17252C8.46078 2.05378 8.22915 1.99121 7.99329 1.99121C7.75743 1.99121 7.52579 2.05378 7.322 2.17252C7.11822 2.29127 6.94958 2.46194 6.83329 2.66714L1.49995 12.0005C1.38241 12.204 1.32077 12.4351 1.32129 12.6701C1.32181 12.9052 1.38447 13.136 1.50292 13.339C1.62136 13.5421 1.79138 13.7102 1.99575 13.8264C2.20011 13.9425 2.43156 14.0026 2.66662 14.0005H13.3333C13.5672 14.0002 13.797 13.9385 13.9995 13.8213C14.202 13.7042 14.3701 13.5359 14.487 13.3332C14.6038 13.1306 14.6653 12.9007 14.6653 12.6668C14.6652 12.4329 14.6036 12.2031 14.4866 12.0005Z" stroke="#DC2626" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6V8.66667" stroke="#DC2626" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 11.333H8.00667" stroke="#DC2626" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Expired cards may cause failed payments.
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            {/* <!-- Payment Failed Panel --> */}
            {/* <div className={`${style.sidePanel} ${style.errorPanel}`}>
              <div className={`${style.panelHeader}`}>
                <h3 className={`${style.panelTitle}`}>Payment Failed</h3>
                <span className={`${style.panelBadge} ${style.error}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.99967V5.99967" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 8H6.005" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className={`${style.panelButtons}`}>
                <button className={`${style.panelBtn} ${style.primary}`}>Retry Payment</button>
                <button className={`${style.panelBtn} ${style.outline}`}>Update Method</button>
              </div>
            </div> */}

            {/* <!-- Next Upcoming Charges --> */}
            <div className={`${style.sidePanel} mt-3`} style={{ position: 'relative' }}>
              {/* Calendar Icon - top right */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className={`${style.panelTitle}`}>Next Upcoming Charges</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              {upcomingCharges.map((item, index) => (
                <div className={`${style.chargeItem}`} key={index}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className={`${style.chargeLabel}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#2765a3ff',
                        display: 'inline-block',
                        flexShrink: 0
                      }} />
                      {item.itemName}
                    </span>
                    {/* Date below package name */}
                    <span style={{ fontSize: '12px', color: '#9CA3AF', paddingLeft: '18px' }}>
                      {item.nextRenewalDate}
                    </span>
                  </div>
                  <span className={`${style.chargeAmount}`}>EGP {item.nextRenewalPrice}</span>
                </div>
              ))}

            </div>

            {/* <!-- Quick Links --> */}

            <div className={`${style.sidePanel} ${style.quickLinksContainer} mt-3`}>
              <h3 className={`${style.panelTitle}`}>Quick Links</h3>
              <a href="/dashboard/subscription" className={`${style.quickLink}`}>
                <span>Manage Subscription</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="/dashboard/subscription" className={`${style.quickLink}`}>
                <span>Upgrade Plan</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* <!-- Right Side Panels Row --> */}
        <div className="row mt-4">
          <div className="col-12">
            {/* <!-- Invoice History --> */}
            <div className={`${style.invoiceSection}`}>
              <div className={`${style.invoiceHeader}`}>
                <h2 className={`${style.sectionTitle}`}>Invoice History</h2>
                <p className={`${style.sectionDescription}`}>All your past invoices and receipts</p>
              </div>

              <div className={`${style.invoiceTableWrapper}`}>
                <table className={`${style.invoiceTable}`}>
                  <thead>
                    <tr>
                      <th>Invoice id</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...invoiceHistory]
                      .sort((a, b) => new Date(b.lastRenewalDate) - new Date(a.lastRenewalDate))
                      .map((invoice) => (
                        <tr key={invoice.invoiceId}>
                          <td className={`${style.invoiceId}`}>{invoice.invoiceId}</td>
                          <td>{invoice.lastRenewalDate}</td>

                          <td style={{ maxWidth: '160px', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.4' }}>
                            {invoice.plan}
                          </td>

                          <td className={`${style.amount}`}>EGP {invoice.amount}</td>

                          <td>
                            <span className={`${style.statusBadge} ${invoice.status === 'Failed' ? style.failed :
                              invoice.status === 'Pending' ? style.pending :
                                style.paid
                              }`}>
                              {invoice.status}
                            </span>
                          </td>

                          {/* Download / Retry icon */}
                          <td>
                            {invoice.downloadUrl === null ? (
                              // Retry icon - red (Failed / no download)
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.5 2.5v3h-3" stroke="#EF4444" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.48 5.5A6 6 0 1 1 11 3.07" stroke="#EF4444" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              // Download icon - gray (Paid)
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.66602 6.66699L7.99935 10.0003L11.3327 6.66699" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 10V2" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className={`${style.tableFooter}`}>
                <button className={`${style.btnDownloadAll}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#8A45B2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.66602 6.66699L7.99935 10.0003L11.3327 6.66699" stroke="#8A45B2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10V2" stroke="#8A45B2" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download All
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>


  )





}
