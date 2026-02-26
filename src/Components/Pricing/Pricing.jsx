import React, { useState } from 'react'
import style from './pricing.module.css'

const bundles = [
  {
    id: 0,
    name: 'Start Bundle',
    discount: '17% OFF',
    description: 'Perfect for small businesses getting started with data analytics',
    save: 'Save EGP 500/mo',
    price: 'EGP 15,500',
    originalPrice: 'EGP 15,000',
    commitment: '6 Month Commitment',
    featured: false,
    features: [
      { icon: 'dashboard', title: 'Smart Dashboards', detailIcon: 'check', detail: 'Unlimited usage' },
      { icon: 'ai', title: 'AI Recommendations', detailIcon: 'token', detail: '100K tokens' },
      { icon: 'support', title: 'Priority Support', detailIcon: 'check', detail: '24/7 access' },
    ],
    btnClass: 'btn_card',
  },
  {
    id: 1,
    name: 'Professional Bundle',
    discount: '23% OFF',
    description: 'Ideal for growing teams needing advanced analytics and automation',
    save: 'Save EGP 900/mo',
    price: 'EGP 11,900',
    originalPrice: 'EGP 15,500',
    commitment: '12 Month Commitment',
    featured: true,
    features: [
      { icon: 'dashboard', title: 'Smart Dashboards', detailIcon: 'check', detail: 'Unlimited usage' },
      { icon: 'ai', title: 'AI Recommendations', detailIcon: 'check', detail: 'Unlimited tokens' },
      { icon: 'code', title: 'Code Automation', detailIcon: 'check', detail: 'Advanced features' },
      { icon: 'support', title: 'Priority Support', detailIcon: 'check', detail: '24/7 access' },
    ],
    btnClass: 'btn_card_primary',
  },
  {
    id: 2,
    name: 'Save Bundle',
    discount: null,
    description: 'Basic features for individuals and freelancers',
    save: null,
    price: 'EGP 14,500',
    originalPrice: null,
    commitment: '3 Month Commitment',
    featured: false,
    features: [
      { icon: 'dashboard', title: 'Basic Dashboards', detailIcon: 'check', detail: 'Limited usage' },
      { icon: 'support', title: 'Email Support', detailIcon: 'check', detail: 'Business hours' },
    ],
    btnClass: 'btn_card',
  },
  {
    id: 3,
    name: 'Start Bundle',
    discount: '17% OFF',
    description: 'Perfect for small businesses getting started with data analytics',
    save: 'Save EGP 500/mo',
    price: 'EGP 13,500',
    originalPrice: 'EGP 15,000',
    commitment: '6 Month Commitment',
    featured: false,
    features: [
      { icon: 'dashboard', title: 'Smart Dashboards', detailIcon: 'check', detail: 'Unlimited usage' },
      { icon: 'ai', title: 'AI Recommendations', detailIcon: 'token', detail: '100K tokens' },
      { icon: 'support', title: 'Priority Support', detailIcon: 'check', detail: '24/7 access' },
    ],
    btnClass: 'btn_card',
  },
]

const icons = {
  dashboard: (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M2.1 2.1V13.3C2.1 13.67 2.25 14.03 2.51 14.29C2.77 14.55 3.13 14.7 3.5 14.7H14.7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6 11.9V6.3M9.1 11.9V3.5M5.6 11.9V9.8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ai: (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M15.4 4.9L9.45 10.85L5.95 7.35L1.4 11.9" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.2 4.9H15.4V9.1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  code: (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M11.25 16.5V13.5C11.35 12.56 11.08 11.62 10.5 10.88C12.75 10.88 15 9.38 15 6.75C15.06 5.81 14.8 4.89 14.25 4.13C14.46 3.26 14.46 2.36 14.25 1.5C14.25 1.5 13.5 1.5 12 2.63C10.02 2.25 7.98 2.25 6 2.63C4.5 1.5 3.75 1.5 3.75 1.5C3.53 2.36 3.53 3.26 3.75 4.13C3.2 4.89 2.94 5.81 3 6.75C3 9.38 5.25 10.88 7.5 10.88C7.21 11.24 6.99 11.66 6.86 12.11C6.74 12.56 6.7 13.04 6.75 13.5V16.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  support: (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M14.7 10.5C14.7 10.87 14.55 11.23 14.29 11.49C14.03 11.75 13.67 11.9 13.3 11.9H4.9L2.1 14.7V3.5C2.1 3.13 2.25 2.77 2.51 2.51C2.77 2.25 3.13 2.1 3.5 2.1H13.3C13.67 2.1 14.03 2.25 14.29 2.51C14.55 2.77 14.7 3.13 14.7 3.5V10.5Z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M10.2 3.06L4.59 8.67L2.04 6.12" stroke="#00A63E" strokeWidth="1.02" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TokenIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2.04 7.14C1.94 7.14 1.85 7.11 1.77 7.06C1.69 7.01 1.62 6.94 1.58 6.85C1.54 6.76 1.52 6.67 1.53 6.57C1.54 6.47 1.58 6.38 1.64 6.31L6.69 1.11C6.73 1.06 6.78 1.03 6.84 1.02C6.89 1.01 6.95 1.02 7 1.05C7.06 1.08 7.1 1.12 7.12 1.17C7.14 1.23 7.15 1.29 7.13 1.34L6.15 4.41C6.12 4.49 6.11 4.57 6.12 4.65C6.13 4.74 6.16 4.81 6.21 4.88C6.26 4.95 6.32 5 6.39 5.04C6.47 5.08 6.55 5.1 6.63 5.1H10.2C10.3 5.1 10.39 5.13 10.47 5.18C10.55 5.23 10.62 5.3 10.66 5.39C10.7 5.48 10.72 5.57 10.71 5.67C10.7 5.77 10.66 5.86 10.6 5.93L5.55 11.13C5.51 11.18 5.46 11.21 5.4 11.22C5.35 11.23 5.29 11.22 5.24 11.19C5.18 11.16 5.14 11.12 5.12 11.07C5.1 11.01 5.09 10.95 5.11 10.9L6.09 7.83C6.12 7.75 6.13 7.67 6.12 7.59C6.11 7.5 6.08 7.43 6.03 7.36C5.98 7.29 5.92 7.24 5.85 7.2C5.77 7.16 5.69 7.14 5.61 7.14H2.04Z" stroke="#8A45B2" strokeWidth="1.02" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Pricing() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goNext = () => setActiveIndex((prev) => (prev + 1) % bundles.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + bundles.length) % bundles.length)

  // نحسب الـ indices اللي هيظهروا: اللي قبل، الحالي، اللي بعد
  const getVisibleIndices = () => {
    const prev = (activeIndex - 1 + bundles.length) % bundles.length
    const next = (activeIndex + 1) % bundles.length
    return [prev, activeIndex, next]
  }

  const visibleIndices = getVisibleIndices()

  return (
    <>
      <section className={`${style.hero_section}`}>
        <div className={`${style.container}`}>
          <div className={`${style.hero_content}`}>
            <div className={`${style.badge}`}>Flexible Pricing</div>
            <h1 className={`${style.hero_title}`}>Pay as you go</h1>
            <p className={`${style.hero_description}`}>Customize your plan based on duration and token usage. No lock-in, cancel anytime.</p>
            <div className={`${style.hero_buttons}`}>
              <button className={`${style.btn} ${style.btn_gradient}`}>
                <span>Build Your Custom Plan</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.33301 8H12.6663" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33333L12.6667 8L8 12.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className={`${style.btn} ${style.btn_outline}`}>Start a Free Trial</button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${style.features_section}`}>
        <div className={`${style.container}`}>
          <div className={`${style.features_grid}`}>
            <div className={`${style.feature_card}`}>
              <div className={`${style.feature_icon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V6C4 5.73478 4.10536 5.48043 4.29289 5.29289C4.48043 5.10536 4.73478 5 5 5C7 5 9.5 3.8 11.24 2.28C11.4519 2.099 11.7214 1.99955 12 1.99955C12.2786 1.99955 12.5481 2.099 12.76 2.28C14.51 3.81 17 5 19 5C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6V13Z" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={`${style.feature_title}`}>Secure & Compliant</h3>
              <p className={`${style.feature_text}`}>Enterprise-grade security</p>
            </div>
            <div className={`${style.feature_card}`}>
              <div className={`${style.feature_icon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={`${style.feature_title}`}>24/7 Support</h3>
              <p className={`${style.feature_text}`}>Always here to help</p>
            </div>
            <div className={`${style.feature_card}`}>
              <div className={`${style.feature_icon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4.00048 14.0002C3.81125 14.0008 3.62571 13.9477 3.46543 13.8471C3.30516 13.7465 3.17671 13.6025 3.09503 13.4318C3.01335 13.2611 2.98177 13.0707 3.00398 12.8828C3.02619 12.6949 3.10126 12.5171 3.22048 12.3702L13.1205 2.17016C13.1947 2.08444 13.2959 2.02652 13.4075 2.0059C13.519 1.98527 13.6342 2.00318 13.7342 2.05667C13.8342 2.11016 13.9131 2.19606 13.9578 2.30027C14.0026 2.40448 14.0106 2.52081 13.9805 2.63016L12.0605 8.65016C12.0039 8.80169 11.9849 8.96468 12.0051 9.12517C12.0253 9.28566 12.1766 9.43884 12.1766 9.57159C12.269 9.70434 12.3923 9.81268 12.5358 9.88732C12.6793 9.96197 12.8387 10.0007 13.0005 10.0002H20.0005C20.1897 9.99952 20.3752 10.0526 20.5355 10.1532C20.6958 10.2538 20.8242 10.3978 20.9059 10.5685C20.9876 10.7392 21.0192 10.9296 20.997 11.1175C20.9748 11.3054 20.8997 11.4832 20.7805 11.6302L10.8805 21.8302C10.8062 21.9159 10.705 21.9738 10.5935 21.9944C10.482 22.0151 10.3668 21.9972 10.2668 21.9437C10.1667 21.8902 10.0879 21.8043 10.0431 21.7001C9.9984 21.5958 9.9904 21.4795 10.0205 21.3702L11.9405 15.3502C11.9971 15.1986 12.0161 15.0356 11.9959 14.8752C11.9757 14.7147 11.9168 14.5615 11.8244 14.4287C11.732 14.296 11.6087 14.1876 11.4652 14.113C11.3217 14.0384 11.1622 13.9996 11.0005 14.0002H4.00048Z" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={`${style.feature_title}`}>Instant Setup</h3>
              <p className={`${style.feature_text}`}>Get started in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BUNDLES CAROUSEL ===================== */}
      <section className={`${style.bundles_section}`}>
        <div className={`${style.container}`}>
          <div className={`${style.section_header}`}>
            <h2 className={`${style.section_title}`}>Bundle & Save</h2>
            <p className={`${style.section_description}`}>Best value for growing teams</p>
          </div>

          <div className={style.carousel_wrapper}>

            {/* Arrow Left */}
            <button className={style.carousel_arrow} onClick={goPrev} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* 3 visible cards */}
            <div className={style.carousel_track}>
              {visibleIndices.map((bundleIdx, position) => {
                const bundle = bundles[bundleIdx]
                const isCenter = position === 1
                return (
                  <div
                    key={bundleIdx}
                    className={`${style.pricing_card} ${bundle.featured ? style.featured : ''} ${isCenter ? style.carousel_card_active : style.carousel_card_side}`}
                    onClick={() => !isCenter && setActiveIndex(bundleIdx)}
                  >
                    {bundle.featured && <div className={style.featured_badge}>POPULAR</div>}

                    <div className={style.pricing_header}>
                      <div className={style.pricing_title_row}>
                        <h3 className={style.pricing_name}>{bundle.name}</h3>
                        {bundle.discount && <span className={style.discount_badge}>{bundle.discount}</span>}
                      </div>
                      <p className={style.pricing_description}>{bundle.description}</p>
                      {bundle.save && <span className={style.save_badge}>{bundle.save}</span>}
                    </div>

                    <div className={style.pricing_amount}>
                      <div className={style.price}>
                        <span className={style.price_value}>{bundle.price}</span>
                        {bundle.originalPrice && <span className={style.price_original}>{bundle.originalPrice}</span>}
                      </div>
                      <div className={style.commitment}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <circle cx="8.5" cy="8.5" r="7" stroke="#3D1B6A" strokeWidth="1.36"/>
                          <path d="M8.16 4.08V8.16L10.88 9.52" stroke="#3D1B6A" strokeWidth="1.36" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{bundle.commitment}</span>
                      </div>
                    </div>

                    <div className={style.pricing_features}>
                      <h4 className={style.features_title}>Includes:</h4>
                      {bundle.features.map((feat, i) => (
                        <div key={i} className={style.feature_item}>
                          <div className={style.feature_item_icon}>{icons[feat.icon]}</div>
                          <div className={style.feature_item_content}>
                            <div className={style.feature_item_title}>{feat.title}</div>
                            <div className={style.feature_item_detail}>
                              {feat.detailIcon === 'check' ? <CheckIcon /> : <TokenIcon />}
                              <span>{feat.detail}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className={`${style.btn} ${style[bundle.btnClass]}`}>Choose Plan</button>
                  </div>
                )
              })}
            </div>

            {/* Arrow Right */}
            <button className={style.carousel_arrow} onClick={goNext} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>

          {/* Dot Indicators - 3 dots دايماً */}
          <div className={style.carousel_dots}>
            {bundles.map((_, i) => (
              <button
                key={i}
                className={`${style.carousel_dot} ${i === activeIndex ? style.carousel_dot_active : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Plan ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>
      {/* ===================== END BUNDLES CAROUSEL ===================== */}

      <section className={`${style.individual_features_section}`}>
        <div className={`${style.container}`}>
          <div className={`${style.section_header}`}>
            <h2 className={`${style.section_title}`}>Individual Features</h2>
            <p className={`${style.section_description}`}>Pick and choose the features you need</p>
          </div>
          <div className={`${style.individual_grid}`}>
            {[0,1,2,3].map((i) => (
              <div key={i} className={`${style.individual_card}`}>
                {i === 1 && <div className={`${style.individual_badge}`}>Best Value</div>}
                <div className={`${style.individual_icon}`}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M2.1 2.1V13.3C2.1 13.67 2.25 14.03 2.51 14.29C2.77 14.55 3.13 14.7 3.5 14.7H14.7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.6 11.9V6.3M9.1 11.9V3.5M5.6 11.9V9.8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={`${style.individual_content}`}>
                  <h3 className={`${style.individual_name}`}>Smart Dashboards</h3>
                  <span className={`${style.individual_description}`}>Visualize your business data</span>
                  <div className={`${style.individual_price}`}>
                    <span className={`${style.individual_price_value}`}>EGP 500</span>
                    <span className={`${style.individual_price_period}`}>/month</span>
                  </div>
                  <ul className={`${style.individual_features}`}>
                    <li>Customizable dashboards</li>
                    <li>Real-time data</li>
                    <li>Multiple visualizations</li>
                    <li>Export capabilities</li>
                  </ul>
                  <button className={`${style.btn} ${style.btn_individual}`}>Add Feature</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${style.comparison_section}`}>
        <div className={`${style.container}`}>
          <div className={`${style.section_header}`}>
            <h2 className={`${style.section_title}`}>Compare Features</h2>
            <p className={`${style.section_description}`}>See what's included in each plan</p>
          </div>
          <div className={`${style.comparison_table_wrapper}`}>
            <table className={`${style.comparison_table}`}>
              <thead>
                <tr>
                  <th>Feature</th><th>Start Bundle</th><th>Professional</th><th>Save Bundle</th><th>Individual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style.feature_name}>Smart Dashboards</td>
                  <td><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></td>
                  <td><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></td>
                  <td><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></td>
                  <td><span className={style.text_muted}>Add-on</span></td>
                </tr>
                <tr>
                  <td className={style.feature_name}>AI Recommendations</td>
                  <td><span className={style.text_muted}>100K tokens</span></td>
                  <td><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></td>
                  <td>-</td>
                  <td><span className={style.text_muted}>Add-on</span></td>
                </tr>
                <tr>
                  <td className={style.feature_name}>Code Automation</td>
                  <td>-</td>
                  <td><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></td>
                  <td>-</td>
                  <td><span className={style.text_muted}>Add-on</span></td>
                </tr>
                <tr>
                  <td className={style.feature_name}>Priority Support</td>
                  <td><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></td>
                  <td><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></td>
                  <td>-</td>
                  <td><span className={style.text_muted}>Add-on</span></td>
                </tr>
                <tr>
                  <td className={style.feature_name}>Usage Limits</td>
                  <td>Unlimited</td><td>Unlimited</td><td>Limited</td><td>Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`${style.faq_section}`}>
        <div className={`${style.container}`}>
          <div className={`${style.section_header}`}>
            <h2 className={`${style.section_title}`}>Frequently Asked Questions</h2>
            <p className={`${style.section_description}`}>Find answers to common questions about pricing</p>
          </div>
          <div className={`${style.faq_list}`}>
            {[1,2,3,4].map((_, i) => (
              <div key={i} className={`${style.faq_item}`}>
                <div className={`${style.faq_question}`}>
                  <h3>Can I switch between plans?</h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 9L12 16L5 9" stroke="#3D1B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
