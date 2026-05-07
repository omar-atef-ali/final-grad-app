
import React from 'react'
import style from "./DashboardHome.module.css"
import { TriangleAlert, CheckCircle, MessageSquare, Star, BarChart3, ExternalLink, Settings, Plus, TrendingUp, Zap, ShoppingCart, X } from 'lucide-react';

export default function DashboardHome() {
  return <>

    <div className={style.dashboardContainer}>


      {/* <!-- Main Content --> */}
      <main className={`${style.mainContent}`}>

        {/* <!-- Content Area --> */}
        <div className={style.contentWrapper}>
          {/* <!-- Welcome Section --> */}
          <div className={style.welcomeSection}>
            <h1 className={style.welcomeTitle}>Welcome back!</h1>
            <p className={style.welcomeSubtitle}>Here's a quick overview of your services.</p>
          </div>

          {/* <!-- Alert Banner --> */}
          <div className={`${style.alert} ${style.alertWarning} ${style.customAlert}`} role="alert">
            <div className={style.alertIcon}>
              <TriangleAlert size={20} strokeWidth={2.5} />
            </div>
            <div className={style.alertContent}>
              <div className={style.alertTitle}>Your subscription ends in 3 days for AI Recommendation</div>
              <div className={style.alertText}>Renew now to avoid any interruption to your AI services.</div>
            </div>
            <button className={style.btnClose} aria-label="Close">
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="row g-4">
            <div className="col-lg-8">

              {/* <!-- Chart Section --> */}
              <div className={style.chartCard}>
                <div className={style.cardBody}>
                  <div className={style.chartHeader}>
                    <h5 className={style.chartTitle}>Token Usage - Last 7 Days</h5>
                    <div className={style.chartLegend}>
                      <span className={style.legendItem}>
                        <span className={style.legendDot} style={{ backgroundColor: `#3B82F6` }}></span>
                        AI Recommendations
                      </span>
                      <span className={style.legendItem}>
                        <span className={style.legendDot} style={{ backgroundColor: `#8B5CF6` }}></span>
                        Chatbot
                      </span>
                      <span className={style.legendItem}>
                        <span className={style.legendDot} style={{ backgroundColor: `#10B981` }}></span>
                        Dashboard
                      </span>
                      <span className={style.legendItem}>
                        <span className={style.legendDot} style={{ backgroundColor: `#F97316` }}></span>
                        Agentic Chatbot
                      </span>
                    </div>
                  </div>

                  <div className={style.chartContainer}>
                    <div className={style.chartYAxis}>
                      <span>1600</span>
                      <span>1200</span>
                      <span>800</span>
                      <span>400</span>
                      <span>0</span>
                    </div>
                    <div className={style.chartBars}>
                      <div className={style.chartBarWrapper}>
                        <div className={style.chartBar} style={{ height: `55%`, backgroundColor: `#8B5CF6` }}></div>
                        <span className={style.barLabel}>Mon</span>
                      </div>
                      <div className={style.chartBarWrapper}>
                        <div className={style.chartBar} style={{ height: `80%`, backgroundColor: `#3B82F6` }}></div>
                        <span className={style.barLabel}>Tue</span>
                      </div>
                      <div className={style.chartBarWrapper}>
                        <div className={style.chartBar} style={{ height: `50%`, backgroundColor: `#F97316` }}></div>
                        <span className={style.barLabel}>Wed</span>
                      </div>
                      <div className={style.chartBarWrapper}>
                        <div className={style.chartBar} style={{ height: `100%`, backgroundColor: `#10B981` }}></div>
                        <span className={style.barLabel}>Thu</span>
                      </div>
                      <div className={style.chartBarWrapper}>
                        <div className={style.chartBar} style={{ height: `85%`, backgroundColor: `#8B5CF6` }}></div>
                        <span className={style.barLabel}>Fri</span>
                      </div>
                      <div className={style.chartBarWrapper}>
                        <div className={style.chartBar} style={{ height: `50%`, backgroundColor: `#8B5CF6` }}></div>
                        <span className={style.barLabel}>Sat</span>
                      </div>
                      <div className={style.chartBarWrapper}>
                        <div className={style.chartBar} style={{ height: `45%`, backgroundColor: `#8B5CF6` }}></div>
                        <span className={style.barLabel}>Sun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* <!-- Active Features --> */}
              <div className={style.activeFeatures}>
                <div className={style.activeFeaturesHeader}>
                  <h5 className={style.sectionTitle}>Your Active Features</h5>
                  <p className={style.sectionSubtitle}>3 features running · All healthy</p>
                </div>

                <div className="row g-3">
                  <div className="col-md-6 col-lg-4">
                    <div className={` ${style.featureCard}`}>
                      <div className="card-body p-4">
                        <div className={style.featureHeader}>
                          <div className={`${style.featureIcon} ${style.chatbotIcon}`}>
                            <MessageSquare size={22} strokeWidth={2} />
                          </div>
                          <span className={`${style.badge} ${style.badgeActive}`}><div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }}></div> Active</span>
                        </div>
                        <h6 className={style.featureTitle}>AI Chatbot</h6>
                        <p className={style.featureDescription}>Engages customers 24/7 with intelligent, context-aware conversations.</p>
                        <div className={style.featureActions}>
                          <button className={` ${style.btnAction}`}>
                            <ExternalLink size={14} strokeWidth={2} /> Open
                          </button>
                          <button className={` ${style.btnAction}`}>
                            <Settings size={14} strokeWidth={2} /> Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className={` ${style.featureCard}`}>
                      <div className={`card-body p-4 ${style.cardBody}`}>
                        <div className={style.featureHeader}>
                          <div className={`${style.featureIcon} ${style.recommendationsIcon}`}>
                            <Star size={22} strokeWidth={2} />
                          </div>
                          <span className={`${style.badge} ${style.badgeActive}`}><div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }}></div> Active</span>
                        </div>
                        <h6 className={style.featureTitle}>AI Recommendations</h6>
                        <p className={style.featureDescription}>Delivers personalized product suggestions that boost conversions.</p>
                        <div className={style.featureActions}>
                          <button className={` ${style.btnAction}`}>
                            <ExternalLink size={14} strokeWidth={2} /> Open
                          </button>
                          <button className={` ${style.btnAction}`}>
                            <Settings size={14} strokeWidth={2} /> Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className={` ${style.featureCard}`}>
                      <div className={`card-body p-4 ${style.cardBody}`}>
                        <div className={style.featureHeader}>
                          <div className={`${style.featureIcon} ${style.analyticsIcon}`}>
                            <BarChart3 size={22} strokeWidth={2} />
                          </div>
                          <span className={`${style.badge} ${style.badgeActive}`}><div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }}></div> Active</span>
                        </div>
                        <h6 className={style.featureTitle}>Analytics Dashboard</h6>
                        <p className={style.featureDescription}>Real-time insights into your business performance and KPIs.</p>
                        <div className={style.featureActions}>
                          <button className={` ${style.btnAction}`}>
                            <ExternalLink size={14} strokeWidth={2} /> Open
                          </button>
                          <button className={` ${style.btnAction}`}>
                            <Settings size={14} strokeWidth={2} /> Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-4">
                    <div className={` ${style.featureCard} ${style.addFeatureCard}`}>
                      <div className={` ${style.cardBody}`}>
                        <div className={style.addIcon}>
                          <Plus size={24} strokeWidth={2} />
                        </div>

                        <h6 className={style.featureTitle}>Add New Feature</h6>
                        <p className={style.featureUnavailable}>Expand your AI capabilities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* <!-- Right Sidebar --> */}
            <div className="col-lg-4">
              {/* <!-- Workspace Health --> */}
              <div className={` ${style.workspaceHealthCard}`}>
                <div className="card-body p-4">
                  <h5 className={style.sectionTitle}>Workspace Health</h5>
                  <div className={style.healthItems}>
                    <div className={style.healthItem}>
                      <div className="d-flex align-items-center gap-3">
                        <span className={`${style.healthIcon} ${style.healthIconSuccess}`}>
                          <CheckCircle size={18} strokeWidth={2} />
                        </span>
                        <span>Data synced</span>
                      </div>
                      <span className={style.statusOk}>OK</span>
                    </div>
                    <div className={style.healthItem}>
                      <div className="d-flex align-items-center gap-3">
                        <span className={`${style.healthIcon} ${style.healthIconWarning}`}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                        </span>
                        <span>Token level medium</span>
                      </div>
                      <span className={style.statusWarning}>Warning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={` ${style.quickActions}`}>
                <div className="card-body p-4">
                  <h6 className={style.quickActionsTitle}>Quick Actions</h6>
                  <div className="d-grid gap-3 mt-4">
                    <button className={` ${style.btnUpgrade}`}>
                      <TrendingUp size={16} strokeWidth={2} /> Upgrade Plan
                    </button>
                    <button className={` ${style.ActionOutline}`}>
                      <Zap style={{ color: `#3F1C6E` }} size={16} strokeWidth={2} /> Buy Tokens
                    </button>
                    <button className={` ${style.ActionOutline}`}>
                      <ShoppingCart style={{ color: `#3F1C6E` }} size={16} strokeWidth={2} /> Add Feature
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

    </div>

  </>
}
