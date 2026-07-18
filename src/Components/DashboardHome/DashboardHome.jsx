
import React, { useContext, useEffect, useState } from 'react'
import style from "./DashboardHome.module.css"
import { userContext } from '../../context/userContext'
import api from '../../api'
import toast from 'react-hot-toast'

export default function DashboardHome() {
  const { userToken } = useContext(userContext)

  // State trackers
  const [clientPlan, setClientPlan] = useState(null)
  const [billingOverview, setBillingOverview] = useState([])
  const [invoiceHistory, setInvoiceHistory] = useState([])
  const [addOnsData, setAddOnsData] = useState(null)
  const [renewalInfo, setRenewalInfo] = useState({ shouldRetry: false })
  const [isLoading, setIsLoading] = useState(true)
  const [isRetrying, setIsRetrying] = useState(false)

  // Fetch all dashboard data
  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      // 1. Fetch client plan first to extract subscriptionId
      let planData = null
      try {
        const response = await api.get(`/ClientSubscriptions/my-plan`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        planData = response.data
        setClientPlan(planData)
      } catch (err) {
        console.error("Error fetching client plan:", err)
      }

      // 2. Build list of parallel requests for independent endpoints
      const promises = [
        api.get(`/Billing/upcoming-payments`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }).then(res => setBillingOverview(res.data)).catch(err => console.error("Error fetching billing overview:", err)),

        api.get(`/Billing/invoice-history`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }).then(res => setInvoiceHistory(res.data)).catch(err => console.error("Error fetching invoice history:", err)),

        api.get(`/ClientSubscriptions/should-retry-renewal`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }).then(res => setRenewalInfo(res.data)).catch(err => console.error("Error fetching should-retry-renewal:", err))
      ]

      // 3. If subscriptionId was retrieved, query add-ons
      if (planData && planData.subscriptionId) {
        promises.push(
          api.get(`/ClientSubscriptions/my-add-ons/${planData.subscriptionId}`, {
            headers: { Authorization: `Bearer ${userToken}` },
          }).then(res => setAddOnsData(res.data)).catch(err => console.error("Error fetching add-ons:", err))
        )
      }

      await Promise.all(promises)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userToken) {
      fetchAllData()
    }
  }, [userToken])

  // Action handlers
  async function retryrenewal() {
    setIsRetrying(true)
    try {
      const { data } = await api.post(`/ClientSubscriptions/retry-renewal-payment`, null, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      console.log(data)
      toast.success("Payment retry initiated successfully!", {
        position: "top-center"
      })
      fetchAllData() // Refresh details
    } catch (error) {
      console.error(error)
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.title ||
        error.response?.data?.errors?.[0] ||
        "Failed to retry payment. Please check your billing information.",
        {
          position: "top-center",
          duration: 4000,
          style: {
            background: "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: {
            primary: "#FF4D4F",
            secondary: "#ffffff",
          },
        }
      )
    } finally {
      setIsRetrying(false)
    }
  }

  const handleDownloadInvoice = async (downloadUrl, invoiceId) => {
    try {
      const loadToast = toast.loading("Downloading invoice...", { position: "top-center" })
      const response = await api.get(downloadUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        responseType: 'blob',
      })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = fileURL
      link.setAttribute('download', `invoice-${invoiceId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success("Invoice downloaded successfully!", { id: loadToast, position: "top-center" })
    } catch (error) {
      console.error("Failed to download invoice", error)
      toast.error("Failed to download invoice. Please try again.", { position: "top-center" })
    }
  }

  // Helper functions
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    const day = date.getDate().toString().padStart(2, '0')
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  const getGraceDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    date.setDate(date.getDate() + 20)
    return formatDate(date)
  }

  // Data parsing
  const planTypeName = clientPlan?.planType === "CustomizedPlan" ? "Customized Plan" : (clientPlan?.planType || "Plan")
  const featuresList = clientPlan?.includedFeatures || []

  const upcomingItems = billingOverview || []
  const nextChargeTotal = upcomingItems.reduce((acc, item) => acc + (item.nextRenewalPrice || 0), 0)
  const nextChargeDate = upcomingItems.length > 0 ? upcomingItems[0].nextRenewalDate : ''
  const serviceNames = upcomingItems.map(item => item.itemName).join(' + ')

  // Add-on parsing
  let tokenBalance = null
  let daysRemaining = null
  let addOnsList = []
  if (addOnsData) {
    if (Array.isArray(addOnsData)) {
      addOnsList = addOnsData
      tokenBalance = addOnsData[0]?.tokenBalance ?? addOnsData[0]?.balance ?? null
      daysRemaining = addOnsData[0]?.daysRemaining ?? addOnsData[0]?.daysLeft ?? null
    } else {
      tokenBalance = addOnsData.tokenBalance ?? addOnsData.tokensBalance ?? addOnsData.balance ?? null
      daysRemaining = addOnsData.daysRemaining ?? addOnsData.daysRemainingCount ?? addOnsData.daysLeft ?? null
      addOnsList = addOnsData.addOns ?? addOnsData.items ?? addOnsData.features ?? []
    }
  }

  // Find first failed invoice for the error message
  const failedInvoice = invoiceHistory?.find(inv => inv.status?.toLowerCase() === 'failed')
  const failedInvoicePlan = failedInvoice?.plan || ''
  const failedInvoiceDate = failedInvoice?.issuedDate || failedInvoice?.lastRenewalDate || ''
  const failedInvoiceUrl = failedInvoice?.downloadUrl || ''
  const failedInvoiceId = failedInvoice?.invoiceId || ''

  // Section visibility conditions (Hide section if no data)
  const showPlanCard = clientPlan && featuresList.length > 0
  const showBillingOverview = upcomingItems.length > 0
  const showRow1 = showPlanCard || showBillingOverview

  const showAddOns = addOnsData && (tokenBalance !== null || daysRemaining !== null || addOnsList.length > 0)
  const showInvoices = invoiceHistory && invoiceHistory.length > 0
  const showRow2 = showAddOns || showInvoices

  return (
    <div className={style.dashboardContainer}>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <div className={style.spinner}></div>
          <p className={style.loadingText}>Loading dashboard...</p>
        </div>
      ) : (
        <div className={style.mainContent}>
          <div className={style.contentWrapper}>
            {/* Welcome Banner */}
            <div className={style.welcomeSection}>
              <h1 className={style.welcomeTitle}>Welcome back!</h1>
              <p className={style.welcomeSubtitle}>Here's a quick overview of your services.</p>
            </div>

            {/* Payment Failed Warning Banner */}
            {renewalInfo?.shouldRetry && (
              <div className={style.paymentFailedAlert}>
                <div className={style.alertLeft}>
                  <span className={style.alertWarningIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="#EF4444" strokeWidth="2" />
                      <line x1="10" y1="6" x2="10" y2="11" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="10" cy="14" r="1" fill="#EF4444" />
                    </svg>
                  </span>
                  <span className={style.alertText}>
                    {failedInvoicePlan ? (
                      <>Payment failed for <strong>{failedInvoicePlan}</strong>. Access ends on <strong>{getGraceDate(failedInvoiceDate)}</strong> if not resolved.</>
                    ) : (
                      <>Payment failed for your services. Access ends soon if not resolved.</>
                    )}
                  </span>
                </div>
                <div className={style.alertActions}>
                  <button
                    onClick={retryrenewal}
                    disabled={isRetrying}
                    className={style.btnRetryPayment}
                  >
                    <svg
                      className={`${style.retryIcon} ${isRetrying ? style.rotate : ''}`}
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.15 7.5a6.002 6.002 0 0 1 11.23-2m.47 5A6.002 6.002 0 0 1 2.62 12.5M13.5 2.5v3h-3m-8 8v-3h3" />
                    </svg>
                    {isRetrying ? "Retrying..." : "Retry payment"}
                  </button>
                  {/* {failedInvoiceUrl && (
                                        <button 
                                            onClick={() => handleDownloadInvoice(failedInvoiceUrl, failedInvoiceId)}
                                            className={style.linkViewInvoice}
                                        >
                                            View invoice
                                        </button>
                                    )} */}


                </div>
              </div>
            )}

            {/* First Row: Customized Plan & Billing Overview */}
            {showRow1 && (
              <div className={style.cardRow}>
                {/* Plan Details */}
                {showPlanCard && (
                  <div className={style.dashboardCard}>
                    <div className={style.cardHeaderSmall}>
                      <span>{planTypeName}</span>
                    </div>
                    <div className={style.planCardBody}>
                      <h2 className={style.planTitle}>{planTypeName}</h2>
                      <span className={style.planServicesCount}>{featuresList.length} services</span>

                      <div className={style.tableResponsive}>
                        <table className={style.servicesTable}>
                          <thead>
                            <tr>
                              <th>SERVICE</th>
                              <th>STATUS</th>
                              <th>PRICE</th>
                              <th>NEXT RENEWAL</th>
                            </tr>
                          </thead>
                          <tbody>
                            {featuresList.map((feature, idx) => {
                              const isCanceled = feature.subscriptionStatus === 'Canceled'
                              return (
                                <tr key={feature.subscriptionItemId || idx}>
                                  <td className={style.serviceName}>{feature.name}</td>
                                  <td>
                                    <span className={`${style.statusBadge} ${feature.subscriptionStatus === 'Active' ? style.badgeActive :
                                      isCanceled ? style.badgeCanceled : style.badgeFailed
                                      }`}>
                                      {feature.subscriptionStatus}
                                    </span>
                                  </td>
                                  <td className={style.servicePrice}>
                                    {isCanceled ? "—" : `EGP ${feature.price}`}
                                  </td>
                                  <td className={style.serviceRenewal}>
                                    {isCanceled ? "—" : formatDate(feature.nextRenewalDate)}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className={style.planCardFooter}>
                      <span>Next billing cycle: <strong>EGP {nextChargeTotal}</strong></span>
                      <a href="/dashboard/subscription" className={style.cardFooterLink}>Manage plan &gt;</a>
                    </div>
                  </div>
                )}

                {/* Billing Overview */}
                {showBillingOverview && (
                  <div className={style.dashboardCard}>
                    <div className={style.cardHeaderSmall}>
                      <span>Billing overview</span>
                    </div>
                    <div className={style.billingOverviewBody}>
                      <span className={style.nextChargeLabel}>NEXT CHARGE</span>
                      <h2 className={style.nextChargeValue}>EGP {nextChargeTotal.toLocaleString()}</h2>
                      <span className={style.nextChargeDue}>Due {formatDate(nextChargeDate)}</span>
                      <p className={style.nextChargeServices}>{serviceNames}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Second Row: Add-ons & Recent Invoices */}
            {showRow2 && (
              <div className={style.cardRowEqual}>
                {/* Add-ons Card */}
                {showAddOns && (
                  <div className={style.dashboardCard}>
                    <div className={style.addOnsCardHeader}>
                      <h3 className={style.cardTitleBold}>Add-ons</h3>
                    </div>
                    <div className={style.addOnsBody}>
                      {/* Top Stats Divider */}
                      <div className={style.addOnsStats}>
                        <div className={style.statBox}>
                          <span className={style.statLabel}>TOKEN BALANCE</span>
                          <span className={style.statValue}>{tokenBalance?.toLocaleString() ?? "—"}</span>
                        </div>
                        <div className={style.statDivider}></div>
                        <div className={style.statBox}>
                          <span className={style.statLabel}>DAYS REMAINING</span>
                          <span className={style.statValue}>{daysRemaining ?? "—"}</span>
                        </div>
                      </div>

                      {/* Add-ons List */}
                      {addOnsList.length > 0 ? (
                        <div className={style.addOnsList}>
                          {addOnsList.map((addon, idx) => (
                            <div className={style.addOnItem} key={addon.subscriptionItemId || idx}>
                              <div className={style.addOnLeft}>
                                <div className={style.addOnIconWrapper}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
                                  </svg>
                                </div>
                                <div className={style.addOnDetails}>
                                  <h4 className={style.addOnName}>{addon.name || addon.itemName}</h4>
                                  <p className={style.addOnSub}>{addon.details || `+${addon.tokens ?? addon.days ?? ''} - ${formatDate(addon.date || addon.purchasedDate)}`}</p>
                                </div>
                              </div>
                              <span className={style.addOnPrice}>EGP {addon.price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={style.emptySectionText}>No add-ons purchased.</p>
                      )}
                    </div>
                    <div className={style.cardFooterLinkWrapper}>
                      <a href="/dashboard/subscription" className={style.cardFooterLink}>Browse more add-ons &gt;</a>
                    </div>
                  </div>
                )}

                {/* Recent Invoices Card */}
                {showInvoices && (
                  <div className={style.dashboardCard}>
                    <div className={style.invoicesCardHeader}>
                      <h3 className={style.cardTitleBold}>Recent invoices</h3>
                    </div>
                    <div className={style.invoicesBody}>
                      <div className={style.invoicesList}>
                        {invoiceHistory.slice(0, 3).map((invoice) => (
                          <div className={style.invoiceItem} key={invoice.invoiceId}>
                            <div className={style.invoiceLeft}>
                              <h4 className={style.invoiceName}>{invoice.plan}</h4>
                              <p className={style.invoiceSub}>
                                {invoice.type || "Renewal"} - {formatDate(invoice.issuedDate || invoice.lastRenewalDate)}
                              </p>
                            </div>
                            <div className={style.invoiceRight}>
                              <span className={style.invoiceAmount}>EGP {invoice.amount}</span>
                              <div className={style.invoiceStatusRow}>
                                <span className={`${style.invoiceStatusBadge} ${invoice.status === 'Paid' ? style.invoicePaid : style.invoiceFailed
                                  }`}>
                                  {invoice.status}
                                </span>
                                {/* {invoice.downloadUrl && (
                                                                    <button 
                                                                        onClick={() => handleDownloadInvoice(invoice.downloadUrl, invoice.invoiceId)}
                                                                        className={style.btnDownloadInvoice}
                                                                        title="Download PDF"
                                                                    >
                                                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                                                            <path d="M14 10V12.667C14 13.02 13.86 13.36 13.61 13.61C13.36 13.86 13.02 14 12.667 14H3.333C2.98 14 2.64 13.86 2.39 13.61C2.14 13.36 2 13.02 2 12.667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            <path d="M4.666 6.667L8 10L11.333 6.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            <path d="M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                        </svg>
                                                                    </button>
                                                                )} */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={style.cardFooterLinkWrapper}>
                      <a href="/dashboard/billing" className={style.cardFooterLink}>View all invoices &gt;</a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* All empty fallback */}
            {!showRow1 && !showRow2 && !renewalInfo?.shouldRetry && (
              <div className={style.emptyState}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8" />
                </svg>
                <h3>No active services</h3>
                <p>You do not have any active subscriptions, add-ons, or invoices at this time.</p>
                <a href="/dashboard/subscription" className={style.btnGetStarted}>Browse services</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

