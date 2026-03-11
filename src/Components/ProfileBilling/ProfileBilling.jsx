import React from 'react'
import style from './ProfileBilling.module.css'

export default function ProfileBilling() {
  return (

    <div className={`${style.Biling_content}`}>

      {/* <div>
        <div className={`${style.no_Biling_card}`} >
          <h2 className={`${style.no_Biling_title}`} >No Biling Information</h2>
          <p className={`${style.no_Biling_text}`}>Subscribe to a plan to manage billing and payment methods</p>
          <button className={`${style.btn_view_plans}`}>View Plans</button>
        </div>



        <div className={`${style.Biling_img_parent}`}>
          <div className={`${style.img_part}`}>

          </div>
        </div>
      </div> */}

      <div className="container-fluid">
        <div className={`${style.mainWrapper}`}>

          {/* <!-- Current Billing Card --> */}
          <div className={`${style.billingCard}`}>
            <div className={`${style.cardHeaderBilling}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2V22" stroke="#8A45B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#8A45B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Current Billing</span>
            </div>
            <div className={`${style.billingStats}`}>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className={`${style.statCard}`}>
                    <p className={`${style.statLabel}`}>Next Payment</p>
                    <p className={`${style.statValue}`}>EGP 3000</p>
                    <p className={`${style.statDetail}`}>Due April 2, 2026</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`${style.statCard}`}>
                    <p className={`${style.statLabel}`}>Total Spent</p>
                    <p className={`${style.statValue}`}>EGP 15000</p>
                    <p className={`${style.statDetail}`}>Since Oct 2025</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`${style.statCard}`}>
                    <p className={`${style.statLabel}`}>Billing Cycle</p>
                    <p className={`${style.statValue}`}>2 Months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Payment Methods Card --> */}
          <div className={`${style.paymentMethodsCard}`}>
            <div className={`${style.sectionHeader}`}>
              <div className="d-flex align-items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.6666 4.16602H3.33329C2.41282 4.16602 1.66663 4.91221 1.66663 5.83268V14.166C1.66663 15.0865 2.41282 15.8327 3.33329 15.8327H16.6666C17.5871 15.8327 18.3333 15.0865 18.3333 14.166V5.83268C18.3333 4.91221 17.5871 4.16602 16.6666 4.16602Z" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.66663 8.33398H18.3333" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className={`${style.sectionTitle}`}>Payment Methods</span>
              </div>
            </div>
            <div className={`${style.paymentCardItem}`}>
              <div className="d-flex align-items-center gap-3">
                <div className={`${style.paymentIcon}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 4.57422H4C2.89543 4.57422 2 5.46965 2 6.57422V16.5742C2 17.6788 2.89543 18.5742 4 18.5742H20C21.1046 18.5742 22 17.6788 22 16.5742V6.57422C22 5.46965 21.1046 4.57422 20 4.57422Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 9.57422H22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span className={`${style.paymentDate}`}>Added at 10/3/2026</span>
              </div>
              <button className={`${style.removeButton}`}>Remove</button>
            </div>
          </div>

          {/* <!-- Transaction History Card --> */}
          <div className={`${style.transactionCard}`}>
            <div className={`${style.sectionHeader}`}>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12.5 1.66602H5.00004C4.55801 1.66602 4.13409 1.84161 3.82153 2.15417C3.50897 2.46673 3.33337 2.89065 3.33337 3.33268V16.666C3.33337 17.108 3.50897 17.532 3.82153 17.8445C4.13409 18.1571 4.55801 18.3327 5.00004 18.3327H15C15.4421 18.3327 15.866 18.1571 16.1786 17.8445C16.4911 17.532 16.6667 17.108 16.6667 16.666V5.83268L12.5 1.66602Z" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.6666 1.66602V4.99935C11.6666 5.44138 11.8422 5.8653 12.1548 6.17786C12.4673 6.49042 12.8913 6.66602 13.3333 6.66602H16.6666" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.33333 7.5H6.66667" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.3333 10.834H6.66663" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M13.3333 14.166H6.66663" stroke="#8A45B2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span className={`${style.sectionTitle}`}>Transaction History</span>
                </div>
                <p className={`${style.sectionSubtitle}`}>View your past invoices</p>
              </div>
            </div>

            <div className={`${style.transactionList}`}>
              {/* <!-- Transaction 1 --> */}
              <div className={`${style.transactionItem}`}>
                <div className="d-flex align-items-center gap-3">
                  <div className={`${style.transactionIcon}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h4 className={`${style.invoiceNumber}`}>INV-2026-002</h4>
                      <span className={`${style.badgePaid}`}>Paid</span>
                    </div>
                    <p className={`${style.invoiceDetails}`}>Feb 1, 2026 • Professional Bundle</p>
                  </div>
                </div>
                <p className={`${style.invoiceAmount}`}>EGP 3000</p>
              </div>

              {/* <!-- Transaction 2 --> */}
              <div className={`${style.transactionItem}`}>
                <div className="d-flex align-items-center gap-3">
                  <div className={`${style.transactionIcon}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h4 className={`${style.invoiceNumber}`}>INV-2025-012</h4>
                      <span className={`${style.badgePaid}`}>Paid</span>
                    </div>
                    <p className={`${style.invoiceDetails}`}>Dec 1, 2025 • Professional Bundle</p>
                  </div>
                </div>
                <p className={`${style.invoiceAmount}`}>EGP 3000</p>
              </div>

              {/* <!-- Transaction 3 --> */}
              <div className={`${style.transactionItem}`}>
                <div className="d-flex align-items-center gap-3">
                  <div className={`${style.transactionIcon}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h4 className={`${style.invoiceNumber}`}>INV-2025-010</h4>
                      <span className={`${style.badgePaid}`}>Paid</span>
                    </div>
                    <p className={`${style.invoiceDetails}`}>Oct 1, 2025 • Starter Bundle</p>
                  </div>
                </div>
                <p className={`${style.invoiceAmount}`}>EGP 3000</p>
              </div>
            </div>

            <div className={`${style.transactionFooter}`}>
              <p className={`${style.footerText}`}>Showing 3 of 5 invoices</p>
              <button className={`${style.viewAllButton}`}>View All Invoices</button>
            </div>
          </div>

          {/* <!-- Security Info Card --> */}
          <div className={`${style.securityCard}`}>
            <div className="d-flex gap-3">
              <div className={`${style.securityIcon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="#8A45B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className={`${style.securityTitle}`}>Secure & Encrypted Payments</h3>
                <p className={`${style.securityDescription}`}>All payments are processed securely through paymob. We use bank-level encryption and never store your full payment details on our servers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

  )





}
