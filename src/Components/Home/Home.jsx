import React from "react";
import style from "./Home.module.css";
import imag from "../../assets/images/mainImage.jpeg"
import { Layout, Zap, ShieldCheck, TrendingUp, Sparkles, Link, BrainCircuit, Lightbulb, Lock, CheckCircle } from "lucide-react";
import imag2 from "../../assets/images/photo_2026-02-09_20-28-22.jpg"


export default function Home() {
  return (
    <>
      <section className={style.heroSection} style={{ marginTop: "50px" }}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className={style.heroTitle}>
                Turn Your <span className={style.textGradient}>Business Data</span> Into Actionable Insights
              </h1>
              <p className={style.heroSubtitle}>
                Namaa helps you understand your data with AI dashboards and smart assistants—so you can act faster and grow with confidence.
              </p>
              <div className="d-flex gap-3">
                <button className={` ${style.btnPrimaryCustom}`} style={{ fontSize: "16px" }}>Try Free Demo →</button>
                <button className={`btn ${style.btnSecondaryCustom}`}>Explore Features</button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={style.heroImageContainer}>
                <img src={imag} alt="Dashboard Analytics" className={style.heroImage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Small Features Grid --> */}
      <section className={style.featuresSmall}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <h5 className="text-center mb-3 mt-5 fw-bold" style={{ fontSize: "36px" }}>Built for Modern, Data-Driven Teams</h5>
          <p className={` mb-5 text-center`}>Powerful AI features designed specifically for small and medium businesses</p>

          <div className="row g-4">
            <div className="col-md-3">
              <div className={style.featureCardSmall}>
                <div className={style.featureIconSmall}>
                  <Layout className={style.featureIcon} />
                </div>
                <h6 className={style.featureTitleSmall}>Simple Interface</h6>
                <p className={style.featureDescSmall}>Intuitive design anyone can use.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className={style.featureCardSmall}>
                <div className={style.featureIconSmall}>
                  <Zap className={style.featureIcon} />
                </div>
                <h6 className={style.featureTitleSmall}>Fast Setup</h6>
                <p className={style.featureDescSmall}>Get started in minutes, no technical skills required.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className={style.featureCardSmall}>
                <div className={style.featureIconSmall}>
                  <ShieldCheck className={style.featureIcon} />
                </div>
                <h6 className={style.featureTitleSmall}>Secure Platform</h6>
                <p className={style.featureDescSmall}>Built with strong data protection in mind.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className={style.featureCardSmall}>
                <div className={style.featureIconSmall}>
                  <TrendingUp className={style.featureIcon} />
                </div>
                <h6 className={style.featureTitleSmall}>Scalable System</h6>
                <p className={style.featureDescSmall}>Grows with your business needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Main Features --> */}
      <section className={style.mainFeatures} id="features">
        <div className="container" style={{ maxWidth: "1280px" }}>
          <h2 className={style.sectionTitle}>Everything You Need to Make Data-Driven Decisions</h2>
          <p className={style.sectionSubtitle}>Powerful AI features designed specifically for small and medium businesses</p>

          <div className={style.featureTabs}>
            <div className={`${style.featureTab} ${style.active}`}>Personalized Recommendations</div>
            <div className={style.featureTab}>Smart Dashboards</div>
            <div className={style.featureTab}>AI Chatbot</div>
            <div className={style.featureTab}>Seamless Integration</div>
          </div>

          <div className={style.featureShowcase}>
            <div className="row justify-content-between h-100">
              <div className="col-lg-5 mb-4 mb-lg-0" style={{ paddingLeft: "64px", paddingTop: "64px" }}>
                <div className="d-inline-flex align-items-center justify-content-center  rounded-3 bg-light ">
                  <Sparkles style={{ width: "32px", height: "32px", color: "var(--primary-purple)", marginBottom: "24px" }} />
                </div>
                <h3 className="mb-3 fw-bold">Personalized Recommendations</h3>
                <p style={{ marginBottom: "44px" }}>Get AI-driven insights tailored to your business data and goals.</p>
                <button className={` ${style.btnPrimaryCustom}`} style={{ fontSize: "16px" }}>Learn More →</button>
              </div>
              <div className="col-lg-5 h-100">
                <div className={`${style.featureImageContainer}  overflow-hidden border shadow-sm`}>
                  <img src={imag2} alt="Feature Interface" className={style.featureImage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- How It Works --> */}
      <section className={style.howItWorks}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div className="text-center mb-5">
            <h2 className={style.sectionTitle}>How Namaa Works</h2>
            <p className={style.sectionSubtitle}>Get started in three simple steps</p>
          </div>

          <div className="row position-relative mt-5">
            {/* <!-- Connecting Lines (Desktop) --> */}
            <div className="d-none d-lg-block position-absolute" style={{ top: "48px", left: 0, width: "100%", zIndex: 0 }}>
              <div className="d-flex justify-content-between px-5 w-100">
                <div style={{ width: "20%" }}></div>
                <div style={{ height: "2px", background: "var(--border-color)", width: "45%" }}></div>
                <div style={{ height: "2px", background: "var(--border-color)", width: "85%" }}></div>
                <div style={{ width: "30%" }}></div>
              </div>
            </div>

            <div className={`col-lg-4 ${style.stepItem}`}>
              <div className={style.stepIconWrapper}>
                <Link style={{ width: "32px", height: "32px", color: "white" }} />
              </div>
              <h5 className={style.stepTitle}>Connect your data</h5>
              <p className={style.textGray}>Link your data sources securely in no time</p>
            </div>
            <div className={`col-lg-4 ${style.stepItem}`}>
              <div className={style.stepIconWrapper}>
                <BrainCircuit style={{ width: "32px", height: "32px", color: "white" }} />
              </div>
              <h5 className={style.stepTitle}>Analyze with AI</h5>
              <p className={style.textGray}>AI identifies patterns and insights</p>
            </div>
            <div className={`col-lg-4 ${style.stepItem}`}>
              <div className={style.stepIconWrapper}>
                <Lightbulb style={{ width: "32px", height: "32px", color: "white" }} />
              </div>
              <h5 className={style.stepTitle}>Ask on insights</h5>
              <p className={style.textGray}>Turn insights into smarter business decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Why Choose --> */}
      <section className={style.whyChoose}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div className={`row align-items-center ${style.whyChooseInner}`}>
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2 className={`mb-3 ${style.sectionTitle}`} style={{ textAlign: "left" }}>Why Choose Namaa?</h2>
              <p className={`mb-4 ${style.sectionSubtitle}`} style={{ textAlign: "left", margin: "0 0 24px 0" }}>Built for performance. Designed for trust.</p>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-3 text-muted" style={{ fontSize: "16px" }}>
                  <div className={`me-2 ${style.textPurple}`}>•</div> Clear, reliable insights for confident decisions
                </li>
                <li className="d-flex align-items-center mb-3 text-muted" style={{ fontSize: "16px" }}>
                  <div className={`me-2 ${style.textPurple}`}>•</div> Built to scale with your business
                </li>
                <li className="d-flex align-items-center mb-3 text-muted" style={{ fontSize: "16px" }}>
                  <div className={`me-2 ${style.textPurple}`}>•</div> Secure by default, no compromises
                </li>
                <li className="d-flex align-items-center mb-3 text-muted" style={{ fontSize: "16px" }}>
                  <div className={`me-2 ${style.textPurple}`}>•</div> Simple enough for any team to use
                </li>
              </ul>
            </div>
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className={`${style.benefitCard} mb-4`}>
                    <div className={style.benefitIcon}>
                      <Zap />
                    </div>
                    <h5 className={style.benefitTitle}>Performance First</h5>
                    <p className={style.benefitText}>Fast dashboards and real-time updates.</p>
                  </div>
                  <div className={style.benefitCard}>
                    <div className={style.benefitIcon}>
                      <Lock />
                    </div>
                    <h5 className={style.benefitTitle}>Built-in Security</h5>
                    <p className={style.benefitText}>Your data stays protected at every step.</p>
                  </div>
                </div>
                <div className="col-md-6 mt-md-5">
                  <div className={style.benefitCard}>
                    <div className={style.benefitIcon}>
                      <CheckCircle />
                    </div>
                    <h5 className={style.benefitTitle}>Reliable AI</h5>
                    <p className={style.benefitText}>Insights you can trust, every time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Testimonials --> */}
      <section className={style.testimonials}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div className="text-center mb-5">
            <h2 className={style.sectionTitle}>Trusted by Business Owners Worldwide</h2>
            <p className={style.sectionSubtitle}>See what our customers have to say about Namaa</p>
          </div>
          <div className="row justify-content-center">
            {/* <!-- Testimonial 1 --> */}
            <div className="col-md-5 mb-5">
              <div className={style.testimonialCard}>
                <div className={style.stars}>
                  ★★★★★
                </div>
                <p className={style.testimonialText}>"Namaa transformed how we make decisions. The AI recommendations are spot-on and have helped us increase revenue by 32% in just 3 months."</p>
                <div className={style.testimonialAuthor}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div className={style.authorInfo}>
                    <h5>Sarah Hesham</h5>
                    <span>CEO, Acme</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Testimonial 2 --> */}
            <div className="col-md-5 mb-5">
              <div className={style.testimonialCard}>
                <div className={style.stars}>
                  ★★★★★
                </div>
                <p className={style.testimonialText}>"The dashboards are incredibly intuitive. We can finally see all our data in one place without needing a data scientist on staff."</p>
                <div className={style.testimonialAuthor}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>                  <div className={style.authorInfo}>
                    <h5>Ziad Mohamed</h5>
                    <span>CMO, TechFlow</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Testimonial 3 --> */}
            <div className="col-md-5 mb-5">
              <div className={style.testimonialCard}>
                <div className={style.stars}>
                  ★★★★★
                </div>
                <p className={style.testimonialText}>"Integration was seamless with Airbyte. We were up and running in less than an hour. The ROI has been exceptional."</p>
                <div className={style.testimonialAuthor}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>                  <div className={style.authorInfo}>
                    <h5>Mohand Elmesh</h5>
                    <span>Director, RetailCo</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Testimonial 4 --> */}
            <div className="col-md-5 mb-5">
              <div className={style.testimonialCard}>
                <div className={style.stars}>
                  ★★★★★
                </div>
                <p className={style.testimonialText}>"The AI chatbot is like having a business analyst available 24/7. It answers questions instantly and helps us stay agile."</p>
                <div className={style.testimonialAuthor}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>                  <div className={style.authorInfo}>
                    <h5>Omar Atef</h5>
                    <span>COO, LogiCorp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer CTA --> */}
      <section className={style.footerCta}>
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className={style.footerCtaCard}>
            <h2 className="fw-bold mb-4" style={{ fontSize: "36px", color: "var(--text-dark)" }}>Ready to Transform Your Business Data?</h2>
            <p className="mb-5 mx-auto" style={{ maxWidth: "600px", color: "var(--text-gray)", fontSize: "18px" }}>Join 1,000+ businesses using Namaa to make smarter, data-driven decisions today.</p>
            <div className="d-flex justify-content-center gap-3">
              <button className={` ${style.btnPrimaryCustom}`} style={{ fontSize: "16px" }}>Try Free Demo</button>
              <button className={`${style.btnSecondaryCustom}`} style={{ fontSize: "16px" }}>View Pricing</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
