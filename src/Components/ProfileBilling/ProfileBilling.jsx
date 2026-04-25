import React from 'react'
import style from './ProfileBilling.module.css'

export default function ProfileBilling() {
  return (

    // <div className={`${style.Biling_content}`}>

    //   <div>
    //     <div className={`${style.no_Biling_card}`} >
    //       <h2 className={`${style.no_Biling_title}`} >No Biling Information</h2>
    //       <p className={`${style.no_Biling_text}`}>Subscribe to a plan to manage billing and payment methods</p>
    //       <button onClick={()=>navigate('/pricing')} className={`${style.btn_view_plans}`}>View Plans</button>
    //     </div>


    //     <div className={`${style.Biling_img_parent}`}>
    //       <div className={`${style.img_part}`}>

    //       </div>
    //     </div>
    //   </div>

    //   <div className="container-fluid">
    //     <div className={`${style.mainWrapper}`}>

    //       {/* <!-- Current Billing Card --> */}
    //       <div className={`${style.billingCard}`}>
    //         <div className={`${style.cardHeaderBilling}`}>
    //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    //                     <path d="M12 2V22" stroke="#8A45B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //                     <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#8A45B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //           </svg>
    //           <span>Current Billing</span>
    //         </div>
    //         <div className={`${style.billingStats}`}>
    //           <div className="row g-3">
    //             <div className="col-md-4">
    //               <div className={`${style.statCard}`}>
    //                 <p className={`${style.statLabel}`}>Next Payment</p>
    //                 <p className={`${style.statValue}`}>EGP 3000</p>
    //                 <p className={`${style.statDetail}`}>Due April 2, 2026</p>
    //               </div>
    //             </div>
    //             <div className="col-md-4">
    //               <div className={`${style.statCard}`}>
    //                 <p className={`${style.statLabel}`}>Total Spent</p>
    //                 <p className={`${style.statValue}`}>EGP 15000</p>
    //                 <p className={`${style.statDetail}`}>Since Oct 2025</p>
    //               </div>
    //             </div>
    //             <div className="col-md-4">
    //               <div className={`${style.statCard}`}>
    //                 <p className={`${style.statLabel}`}>Billing Cycle</p>
    //                 <p className={`${style.statValue}`}>2 Months</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* <!-- Payment Methods Card --> */}
    //       <div className={`${style.paymentMethodsCard}`}>
    //         <div className={`${style.sectionHeader}`}>
    //           <div className="d-flex align-items-center gap-2">
    //             <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    //                         <path d="M16.6666 4.16602H3.33329C2.41282 4.16602 1.66663 4.91221 1.66663 5.83268V14.166C1.66663 15.0865 2.41282 15.8327 3.33329 15.8327H16.6666C17.5871 15.8327 18.3333 15.0865 18.3333 14.166V5.83268C18.3333 4.91221 17.5871 4.16602 16.6666 4.16602Z" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                         <path d="M1.66663 8.33398H18.3333" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //             </svg>
    //             <span className={`${style.sectionTitle}`}>Payment Methods</span>
    //           </div>
    //         </div>
    //         <div className={`${style.paymentCardItem}`}>
    //           <div className="d-flex align-items-center gap-3">
    //             <div className={`${style.paymentIcon}`}>
    //               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    //                             <path d="M20 4.57422H4C2.89543 4.57422 2 5.46965 2 6.57422V16.5742C2 17.6788 2.89543 18.5742 4 18.5742H20C21.1046 18.5742 22 17.6788 22 16.5742V6.57422C22 5.46965 21.1046 4.57422 20 4.57422Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //                             <path d="M2 9.57422H22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //               </svg>
    //             </div>
    //             <span className={`${style.paymentDate}`}>Added at 10/3/2026</span>
    //           </div>
    //           <button className={`${style.removeButton}`}>Remove</button>
    //         </div>
    //       </div>

    //       {/* <!-- Transaction History Card --> */}
    //       <div className={`${style.transactionCard}`}>
    //         <div className={`${style.sectionHeader}`}>
    //           <div className="d-flex flex-column">
    //             <div className="d-flex align-items-center gap-2">
    //               <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    //                             <path d="M12.5 1.66602H5.00004C4.55801 1.66602 4.13409 1.84161 3.82153 2.15417C3.50897 2.46673 3.33337 2.89065 3.33337 3.33268V16.666C3.33337 17.108 3.50897 17.532 3.82153 17.8445C4.13409 18.1571 4.55801 18.3327 5.00004 18.3327H15C15.4421 18.3327 15.866 18.1571 16.1786 17.8445C16.4911 17.532 16.6667 17.108 16.6667 16.666V5.83268L12.5 1.66602Z" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                             <path d="M11.6666 1.66602V4.99935C11.6666 5.44138 11.8422 5.8653 12.1548 6.17786C12.4673 6.49042 12.8913 6.66602 13.3333 6.66602H16.6666" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                             <path d="M8.33333 7.5H6.66667" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                             <path d="M13.3333 10.834H6.66663" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                             <path d="M13.3333 14.166H6.66663" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //               </svg>
    //               <span className={`${style.sectionTitle}`}>Transaction History</span>
    //             </div>
    //             <p className={`${style.sectionSubtitle}`}>View your past invoices</p>
    //           </div>
    //         </div>

    //         <div className={`${style.transactionList}`}>
    //           {/* <!-- Transaction 1 --> */}
    //           <div className={`${style.transactionItem}`}>
    //             <div className="d-flex align-items-center gap-3">
    //               <div className={`${style.transactionIcon}`}>
    //                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    //                                 <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                                 <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                 </svg>
    //               </div>
    //               <div>
    //                 <div className="d-flex align-items-center gap-2 mb-1">
    //                   <h4 className={`${style.invoiceNumber}`}>INV-2026-002</h4>
    //                   <span className={`${style.badgePaid}`}>Paid</span>
    //                 </div>
    //                 <p className={`${style.invoiceDetails}`}>Feb 1, 2026 • Professional Bundle</p>
    //               </div>
    //             </div>
    //             <p className={`${style.invoiceAmount}`}>EGP 3000</p>
    //           </div>

    //           {/* <!-- Transaction 2 --> */}
    //           <div className={`${style.transactionItem}`}>
    //             <div className="d-flex align-items-center gap-3">
    //               <div className={`${style.transactionIcon}`}>
    //                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    //                                 <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                                 <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                 </svg>
    //               </div>
    //               <div>
    //                 <div className="d-flex align-items-center gap-2 mb-1">
    //                   <h4 className={`${style.invoiceNumber}`}>INV-2025-012</h4>
    //                   <span className={`${style.badgePaid}`}>Paid</span>
    //                 </div>
    //                 <p className={`${style.invoiceDetails}`}>Dec 1, 2025 • Professional Bundle</p>
    //               </div>
    //             </div>
    //             <p className={`${style.invoiceAmount}`}>EGP 3000</p>
    //           </div>

    //           {/* <!-- Transaction 3 --> */}
    //           <div className={`${style.transactionItem}`}>
    //             <div className="d-flex align-items-center gap-3">
    //               <div className={`${style.transactionIcon}`}>
    //                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    //                                 <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                                 <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    //                 </svg>
    //               </div>
    //               <div>
    //                 <div className="d-flex align-items-center gap-2 mb-1">
    //                   <h4 className={`${style.invoiceNumber}`}>INV-2025-010</h4>
    //                   <span className={`${style.badgePaid}`}>Paid</span>
    //                 </div>
    //                 <p className={`${style.invoiceDetails}`}>Oct 1, 2025 • Starter Bundle</p>
    //               </div>
    //             </div>
    //             <p className={`${style.invoiceAmount}`}>EGP 3000</p>
    //           </div>
    //         </div>

    //         <div className={`${style.transactionFooter}`}>
    //           <p className={`${style.footerText}`}>Showing 3 of 5 invoices</p>
    //           <button className={`${style.viewAllButton}`}>View All Invoices</button>
    //         </div>
    //       </div>

    //       {/* <!-- Security Info Card --> */}
    //       <div className={`${style.securityCard}`}>
    //         <div className="d-flex gap-3">
    //           <div className={`${style.securityIcon}`}>
    //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    //                         <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="#8A45B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //             </svg>
    //           </div>
    //           <div>
    //             <h3 className={`${style.securityTitle}`}>Secure & Encrypted Payments</h3>
    //             <p className={`${style.securityDescription}`}>All payments are processed securely through paymob. We use bank-level encryption and never store your full payment details on our servers.</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>


    // </div>

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
                <div className="col-md-6">
                  <div className={`${style.creditCard} ${style.primaryCard}`}>
                    <div className={`${style.cardVisual} ${style.purpleGradient}`}>
                      <div className={`${style.cardBackgroundCircle} ${style.circle1}`}></div>
                      <div className={`${style.cardBackgroundCircle} ${style.circle2}`}></div>
                      <span className={`${style.cardBadge} ${style.primaryBadge}`}>Primary</span>

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

                        <div className={`${style.cardNumber}`}>**** **** **** 4242</div>

                        <div className={`${style.cardDetailsRow}`}>
                          <div className={`${style.cardDetail}`}>
                            <div className={`${style.cardLabel}`}>CARD HOLDER</div>
                            <div className={`${style.cardValue}`}>SARAH HESHAM</div>
                          </div>
                          <div className={`${style.cardDetail}`}>
                            <div className={`${style.cardLabel}`}>EXPIRES</div>
                            <div className={`${style.cardValue}`}>08/28</div>
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
                          <div className={`${style.cardName}`}>Mastercard ••4242</div>
                          <div className={`${style.cardBank}`}>CIB Bank</div>
                        </div>
                        <span className={`${style.badgePrimary}`}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M5.7634 1.14745C5.78531 1.10318 5.81916 1.06591 5.86113 1.03986C5.90309 1.01381 5.9515 1 6.0009 1C6.0503 1 6.09871 1.01381 6.14067 1.03986C6.18264 1.06591 6.21649 1.10318 6.2384 1.14745L7.3934 3.48695C7.46949 3.64093 7.58181 3.77415 7.72071 3.87517C7.85962 3.9762 8.02096 4.042 8.1909 4.06695L10.7739 4.44495C10.8228 4.45204 10.8688 4.47268 10.9066 4.50455C10.9445 4.53641 10.9726 4.57822 10.9879 4.62525C11.0032 4.67228 11.005 4.72265 10.9932 4.77066C10.9814 4.81868 10.9563 4.86242 10.9209 4.89695L9.0529 6.71595C8.92971 6.836 8.83754 6.98419 8.78432 7.14776C8.7311 7.31133 8.71843 7.48539 8.7474 7.65495L9.1884 10.2249C9.19704 10.2739 9.19176 10.3242 9.17315 10.3703C9.15454 10.4163 9.12336 10.4563 9.08317 10.4854C9.04298 10.5146 8.99539 10.5319 8.94583 10.5354C8.89628 10.5388 8.84675 10.5283 8.8029 10.5049L6.4939 9.29095C6.34176 9.21106 6.17249 9.16932 6.00065 9.16932C5.82881 9.16932 5.65954 9.21106 5.5074 9.29095L3.1989 10.5049C3.15507 10.5282 3.1056 10.5386 3.05613 10.5351C3.00665 10.5316 2.95916 10.5142 2.91905 10.4851C2.87894 10.4559 2.84782 10.416 2.82923 10.3701C2.81064 10.3241 2.80533 10.2738 2.8139 10.2249L3.2544 7.65545C3.2835 7.48581 3.27089 7.31165 3.21767 7.14797C3.16445 6.98429 3.0722 6.83602 2.9489 6.71595L1.0809 4.89745C1.0452 4.86296 1.0199 4.81914 1.00788 4.77098C0.995866 4.72282 0.997618 4.67226 1.01294 4.62504C1.02826 4.57783 1.05653 4.53587 1.09454 4.50394C1.13254 4.47201 1.17875 4.4514 1.2279 4.44445L3.8104 4.06695C3.98053 4.0422 4.14209 3.97648 4.28119 3.87544C4.42029 3.77441 4.53275 3.64108 4.6089 3.48695L5.7634 1.14745Z" fill="#8A45B2" stroke="#8A45B2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Primary
                        </span>
                      </div>
                      <div className={`${style.cardActions}`}>
                        <button className={`${style.btnCardAction}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H11.0833C11.3928 12.25 11.6895 12.1271 11.9083 11.9083C12.1271 11.6895 12.25 11.3928 12.25 11.0833V7" stroke="#4A5565" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.7185 1.53138C10.9505 1.29932 11.2653 1.16895 11.5935 1.16895C11.9217 1.16895 12.2364 1.29932 12.4685 1.53138C12.7005 1.76345 12.8309 2.07819 12.8309 2.40638C12.8309 2.73457 12.7005 3.04932 12.4685 3.28138L7.2109 8.53955C7.07238 8.67794 6.90127 8.77925 6.71331 8.83413L5.0374 9.32413C4.9872 9.33877 4.93399 9.33965 4.88334 9.32667C4.83269 9.3137 4.78646 9.28734 4.74949 9.25037C4.71252 9.2134 4.68616 9.16717 4.67319 9.11652C4.66021 9.06587 4.66109 9.01266 4.67573 8.96247L5.16573 7.28655C5.22087 7.09874 5.32237 6.92783 5.4609 6.78955L10.7185 1.53138Z" stroke="#4A5565" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Update
                        </button>
                        <button className={`${style.btnCardAction} ${style.danger}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1.75 3.5H12.25" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.0827 3.5V11.6667C11.0827 12.25 10.4993 12.8333 9.91602 12.8333H4.08268C3.49935 12.8333 2.91602 12.25 2.91602 11.6667V3.5" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.66602 3.49935V2.33268C4.66602 1.74935 5.24935 1.16602 5.83268 1.16602H8.16602C8.74935 1.16602 9.33268 1.74935 9.33268 2.33268V3.49935" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83398 6.41602V9.91602" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.16602 6.41602V9.91602" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Card 2 - Expired (Visa) --> */}
                <div className="col-md-6">
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
                            <path d="M5.7634 1.14745C5.78531 1.10318 5.81916 1.06591 5.86113 1.03986C5.90309 1.01381 5.9515 1 6.0009 1C6.0503 1 6.09871 1.01381 6.14067 1.03986C6.18264 1.06591 6.21649 1.10318 6.2384 1.14745L7.3934 3.48695C7.46949 3.64093 7.58181 3.77415 7.72071 3.87517C7.85962 3.9762 8.02096 4.042 8.1909 4.06695L10.7739 4.44495C10.8228 4.45204 10.8688 4.47268 10.9066 4.50455C10.9445 4.53641 10.9726 4.57822 10.9879 4.62525C11.0032 4.67228 11.005 4.72265 10.9932 4.77066C10.9814 4.81868 10.9563 4.86242 10.9209 4.89695L9.0529 6.71595C8.92971 6.836 8.83754 6.98419 8.78432 7.14776C8.7311 7.31133 8.71843 7.48539 8.7474 7.65495L9.1884 10.2249C9.19704 10.2739 9.19176 10.3242 9.17315 10.3703C9.15454 10.4163 9.12336 10.4563 9.08317 10.4854C9.04298 10.5146 8.99539 10.5319 8.94583 10.5354C8.89628 10.5388 8.84675 10.5283 8.8029 10.5049L6.4939 9.29095C6.34176 9.21106 6.17249 9.16932 6.00065 9.16932C5.82881 9.16932 5.65954 9.21106 5.5074 9.29095L3.1989 10.5049C3.15507 10.5282 3.1056 10.5386 3.05613 10.5351C3.00665 10.5316 2.95916 10.5142 2.91905 10.4851C2.87894 10.4559 2.84782 10.416 2.82923 10.3701C2.81064 10.3241 2.80533 10.2738 2.8139 10.2249L3.2544 7.65545C3.2835 7.48581 3.27089 7.31165 3.21767 7.14797C3.16445 6.98429 3.0722 6.83602 2.9489 6.71595L1.0809 4.89745C1.0452 4.86296 1.0199 4.81914 1.00788 4.77098C0.995866 4.72282 0.997618 4.67226 1.01294 4.62504C1.02826 4.57783 1.05653 4.53587 1.09454 4.50394C1.13254 4.47201 1.17875 4.4514 1.2279 4.44445L3.8104 4.06695C3.98053 4.0422 4.14209 3.97648 4.28119 3.87544C4.42029 3.77441 4.53275 3.64108 4.6089 3.48695L5.7634 1.14745Z" stroke="#6A7282" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Default
                        </span>
                      </div>
                      <div className={`${style.cardActions}`}>
                        <button className={`${style.btnCardAction}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H11.0833C11.3928 12.25 11.6895 12.1271 11.9083 11.9083C12.1271 11.6895 12.25 11.3928 12.25 11.0833V7" stroke="#4A5565" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.7185 1.53138C10.9505 1.29932 11.2653 1.16895 11.5935 1.16895C11.9217 1.16895 12.2364 1.29932 12.4685 1.53138C12.7005 1.76345 12.8309 2.07819 12.8309 2.40638C12.8309 2.73457 12.7005 3.04932 12.4685 3.28138L7.2109 8.53955C7.07238 8.67794 6.90127 8.77925 6.71331 8.83413L5.0374 9.32413C4.9872 9.33877 4.93399 9.33965 4.88334 9.32667C4.83269 9.3137 4.78646 9.28734 4.74949 9.25037C4.71252 9.2134 4.68616 9.16717 4.67319 9.11652C4.66021 9.06587 4.66109 9.01266 4.67573 8.96247L5.16573 7.28655C5.22087 7.09874 5.32237 6.92783 5.4609 6.78955L10.7185 1.53138Z" stroke="#4A5565" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Update
                        </button>
                        <button className={`${style.btnCardAction} ${style.danger}`}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1.75 3.5H12.25" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.0827 3.5V11.6667C11.0827 12.25 10.4993 12.8333 9.91602 12.8333H4.08268C3.49935 12.8333 2.91602 12.25 2.91602 11.6667V3.5" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.66602 3.49935V2.33268C4.66602 1.74935 5.24935 1.16602 5.83268 1.16602H8.16602C8.74935 1.16602 9.33268 1.74935 9.33268 2.33268V3.49935" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83398 6.41602V9.91602" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.16602 6.41602V9.91602" stroke="#FB2C36" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Card 3 - Add New Card --> */}
                <div className="col-md-6">
                  <div className={`${style.emptyCardBox}`}>
                    <div className={`${style.emptyCardIcon}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <span className={`${style.emptyCardText}`}>Add New Card</span>
                  </div>
                </div>
              </div>

              <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: '#6A7282', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#9CA3AF" stroke-width="1.2" />
                    <path d="M8 4V8" stroke="#9CA3AF" stroke-width="1.2" stroke-linecap="round" />
                    <circle cx="8" cy="11.5" r="1" fill="#9CA3AF" />
                  </svg>
                  Your primary card is charged automatically on your billing date. You can change the primary card at any time.
                </span>
                <span style={{ fontSize: '13px', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M14.4866 12.0005L9.15329 2.66714C9.037 2.46194 8.86836 2.29127 8.66457 2.17252C8.46078 2.05378 8.22915 1.99121 7.99329 1.99121C7.75743 1.99121 7.52579 2.05378 7.322 2.17252C7.11822 2.29127 6.94958 2.46194 6.83329 2.66714L1.49995 12.0005C1.38241 12.204 1.32077 12.4351 1.32129 12.6701C1.32181 12.9052 1.38447 13.136 1.50292 13.339C1.62136 13.5421 1.79138 13.7102 1.99575 13.8264C2.20011 13.9425 2.43156 14.0026 2.66662 14.0005H13.3333C13.5672 14.0002 13.797 13.9385 13.9995 13.8213C14.202 13.7042 14.3701 13.5359 14.487 13.3332C14.6038 13.1306 14.6653 12.9007 14.6653 12.6668C14.6652 12.4329 14.6036 12.2031 14.4866 12.0005Z" stroke="#DC2626" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 6V8.66667" stroke="#DC2626" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 11.333H8.00667" stroke="#DC2626" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Expired cards may cause failed payments.
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            {/* <!-- Payment Failed Panel --> */}
            <div className={`${style.sidePanel} ${style.errorPanel}`}>
              <div className={`${style.panelHeader}`}>
                <h3 className={`${style.panelTitle}`}>Payment Failed</h3>
                <span className={`${style.panelBadge} ${style.error}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 3.99967V5.99967" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6 8H6.005" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <div className={`${style.panelButtons}`}>
                <button className={`${style.panelBtn} ${style.primary}`}>Retry Payment</button>
                <button className={`${style.panelBtn} ${style.outline}`}>Update Method</button>
              </div>
            </div>

            {/* <!-- Next Upcoming Charges --> */}
            <div className={`${style.sidePanel} mt-3`}>
              <h3 className={`${style.panelTitle}`}>Next Upcoming Charges</h3>
              <div className={`${style.chargeItem}`}>
                <span className={`${style.chargeLabel}`}>Professional Bundle</span>
                <span className={`${style.chargeAmount}`}>EGP 3,950</span>
              </div>
            </div>

            {/* <!-- Quick Links --> */}

            <div className={`${style.sidePanel} ${style.quickLinksContainer} mt-3`}>
              <h3 className={`${style.panelTitle}`}>Quick Links</h3>
              <a href="#" className={`${style.quickLink}`}>
                <span>Manage Subscription</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
              <a href="#" className={`${style.quickLink}`}>
                <span>Upgrade Plan</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
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
                      <th>Invoice</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>download</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={`${style.invoiceId}`}>INV-2025-004</td>
                      <td>2025-03-01</td>
                      <td>Professional Bundle</td>
                      <td className={`${style.amount}`}>EGP 3,950</td>
                      <td><span className={`${style.statusBadge} ${style.paid}`}>Paid</span></td>
                      <td>
                        <button className={`${style.btnIconAction}`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.66602 6.66699L7.99935 10.0003L11.3327 6.66699" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 10V2" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className={`${style.invoiceId}`}>INV-2025-003</td>
                      <td>2025-02-01</td>
                      <td>Professional Bundle</td>
                      <td className={`${style.amount}`}>EGP 3,950</td>
                      <td><span className={`${style.statusBadge} ${style.paid}`}>Paid</span></td>
                      <td>
                        <button className={`${style.btnIconAction}`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.66602 6.66699L7.99935 10.0003L11.3327 6.66699" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 10V2" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className={`${style.invoiceId}`}>INV-2025-002</td>
                      <td>2025-12-01</td>
                      <td>Starter Consultation Combo</td>
                      <td className={`${style.amount}`}>EGP 3,950</td>
                      <td><span className={`${style.statusBadge} ${style.paid}`}>Paid</span></td>
                      <td>
                        <button className={`${style.btnIconAction}`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.66602 6.66699L7.99935 10.0003L11.3327 6.66699" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 10V2" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className={`${style.invoiceId}`}>INV-2025-001</td>
                      <td>2025-10-01</td>
                      <td>Starter Bundle</td>
                      <td className={`${style.amount}`}>EGP 1,850</td>
                      <td><span className={`${style.statusBadge} ${style.paid}`}>Paid</span></td>
                      <td>
                        <button className={`${style.btnIconAction}`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.66602 6.66699L7.99935 10.0003L11.3327 6.66699" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 10V2" stroke="#6A7282" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`${style.tableFooter}`}>
                <button className={`${style.btnDownloadAll}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#8A45B2" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.66602 6.66699L7.99935 10.0003L11.3327 6.66699" stroke="#8A45B2" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 10V2" stroke="#8A45B2" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
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
