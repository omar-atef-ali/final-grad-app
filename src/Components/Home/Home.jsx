import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import imag from "../../assets/images/mainImage.jpeg"
import { Layout, Zap, ShieldCheck, TrendingUp, Sparkles, Link, BrainCircuit, Lightbulb, Lock, CheckCircle } from "lucide-react";
import imag2 from "../../assets/images/photo_2026-02-09_20-28-22.jpg"
import api from "../../api";

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userContext } from "../../context/userContext";



export default function Home() {

  const { userToken } = useContext(userContext)

  const [review, setReview] = useState([])
  const [activeTab, setActiveTab] = useState(0);

  const iconMap = {
    Sparkles: Sparkles,
    Layout: Layout,
    Zap: Zap,
    ShieldCheck: ShieldCheck,
    TrendingUp: TrendingUp,
    Link: Link,
    BrainCircuit: BrainCircuit,
    Lightbulb: Lightbulb,
    Lock: Lock,
    CheckCircle: CheckCircle
  };


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let { data } = await api.get("Reviews/landing-page");
        setReview(data);
        // console.log(data);

      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error(
          error.response?.data?.errors[1] ||
          "Error fetching reviews.",
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
    };
    
      fetchReviews();
  
  }, []);

  ///////////////////////////////////////////////////////////////

  const navigate = useNavigate()

  const [feature, setFeature] = useState([])
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data } = await api.get("Services")
        // console.log(data);
        setFeature(data)

      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.errors[1] ||
          "Error fetching reviews.",
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
     // تأكد إن التوكن موجود قبل الطلب لو ضروري
      fetchFeatures()
  

  }, [])





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
                <button onClick={() => navigate("/demo")} className={` ${style.btnPrimaryCustom}`} style={{ fontSize: "14px" }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33333 3.33335C3.33326 3.09874 3.3951 2.86827 3.51259 2.66521C3.63008 2.46214 3.79907 2.29368 4.0025 2.17681C4.20593 2.05995 4.43659 1.99883 4.67119 1.99963C4.9058 2.00042 5.13604 2.06311 5.33867 2.18135L13.3367 6.84668C13.5385 6.9638 13.7061 7.13185 13.8226 7.33402C13.9392 7.53619 14.0006 7.76541 14.0008 7.99877C14.001 8.23213 13.94 8.46146 13.8238 8.66384C13.7076 8.86621 13.5403 9.03455 13.3387 9.15202L5.33867 13.8187C5.13604 13.9369 4.9058 13.9996 4.67119 14.0004C4.43659 14.0012 4.20593 13.9401 4.0025 13.8232C3.79907 13.7064 3.63008 13.5379 3.51259 13.3348C3.3951 13.1318 3.33326 12.9013 3.33333 12.6667V3.33335Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg> Try Free Demo</button>
                <button onClick={() => navigate("/features")} className={` ${style.btnSecondaryCustom}`} style={{ fontSize: "14px" }}>Explore Features</button>
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

          <div className={style.tabsContainer}>
            <div className={`${style.Tabs}`}>
              {(feature && (feature.length || feature.name)) ? (
                // Handle both direct array and object with 'name' property
                (feature.length ? feature : feature.name).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`${style.Tab}  ${activeTab === index ? style.Active : ""}`}
                    // Remove background: transparent inline style to allow CSS class to apply background
                    style={{ border: "none" }}
                  >
                    {item.name || item.title}
                  </button>
                ))
              ) : null}
            </div>
          </div>

          {(feature && (feature.length > 0 || feature.name)) ? (() => {
            const activeFeature = (feature.length ? feature : feature.name)[activeTab];
            return activeFeature ? (
              <div className={style.featureShowcase}>
                <div className="row justify-content-between h-100">
                  <div className="col-lg-5 mb-4 mb-lg-0" style={{ paddingLeft: "64px", paddingTop: "64px" }}>
                    <div className={`${style.featureIconSmall} mb-4`} style={{ margin: "0 0 24px 0" }}>
                      {activeFeature.iconURL && (activeFeature.iconURL.startsWith('/') || activeFeature.iconURL.startsWith('http')) ? (
                        <img
                          src={activeFeature.iconURL.startsWith('http') ? activeFeature.iconURL : `https://deebai.runasp.net${activeFeature.iconURL}`}
                          className={style.featureIcon}
                          alt=""
                        />
                      ) : activeFeature.iconURL && iconMap[activeFeature.iconURL] ? (
                        React.createElement(iconMap[activeFeature.iconURL], {
                          className: style.featureIcon
                        })
                      ) : (
                        <Sparkles className={style.featureIcon} />
                      )}
                    </div>
                    <h3 className="mb-3 fw-bold">{activeFeature.name || activeFeature.title}</h3>
                    <p style={{ marginBottom: "44px" }}>{activeFeature.subTitle}</p>
                    <button onClick={() => navigate(`/feature-details/${activeFeature.id}`)} className={` ${style.btnPrimaryCustom}`} style={{ fontSize: "14px" }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33333 3.33335C3.33326 3.09874 3.3951 2.86827 3.51259 2.66521C3.63008 2.46214 3.79907 2.29368 4.0025 2.17681C4.20593 2.05995 4.43659 1.99883 4.67119 1.99963C4.9058 2.00042 5.13604 2.06311 5.33867 2.18135L13.3367 6.84668C13.5385 6.9638 13.7061 7.13185 13.8226 7.33402C13.9392 7.53619 14.0006 7.76541 14.0008 7.99877C14.001 8.23213 13.94 8.46146 13.8238 8.66384C13.7076 8.86621 13.5403 9.03455 13.3387 9.15202L5.33867 13.8187C5.13604 13.9369 4.9058 13.9996 4.67119 14.0004C4.43659 14.0012 4.20593 13.9401 4.0025 13.8232C3.79907 13.7064 3.63008 13.5379 3.51259 13.3348C3.3951 13.1318 3.33326 12.9013 3.33333 12.6667V3.33335Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> Learn More</button>
                  </div>
                  <div className="col-lg-5 h-100">
                    <div className={`${style.featureImageContainer} overflow-hidden border shadow-sm`}>
                      <img
                        src={activeFeature.image ? activeFeature.image : imag2}
                        alt={activeFeature.name || "Feature Interface"}
                        className={style.featureImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })() : (
            ""
          )}      
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
      {review.length > 0 &&
        <section className={style.testimonials}>
          <div className={review.length > 3 ? "container-fluid" : "container"} style={{ maxWidth: review.length > 3 ? "100%" : "1280px", overflow: "hidden" }}>
            <div className="text-center mb-5">
              <h2 className={style.sectionTitle}>Trusted by Business Owners Worldwide</h2>
              <p className={style.sectionSubtitle}>See what our customers have to say about Namaa</p>
            </div>

            {review.length > 3 ? (
              <div className={style.marqueeContainer}>
                <div className={style.marqueeWrapper}>
                  {/* First Set */}
                  {review.map((review, index) => (
                    <div className={style.testimonialCardMarquee} key={`first-${index}`}>
                      <div className={style.stars}>
                        {[...Array(Number(review.stars))].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className={style.testimonialText}>{review.comment}</p>
                      <div className={style.testimonialAuthor}>
                        {review.imageURL ? <img src={`https://deebai.runasp.net${review.imageURL}`} className={style.reviewImg} style={{ overflow: "hidden", padding: 0 }} alt="" /> : <svg
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
                        </svg>}

                        <div className={style.authorInfo}>
                          <h5>{review.clientName}</h5>
                          <span>{review.position}{review.position && review.companyName ? `,` : ""} {review.companyName}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Second Set (Duplicate) */}
                  {review.map((review, index) => (
                    <div className={style.testimonialCardMarquee} key={`second-${index}`}>
                      <div className={style.stars}>
                        {[...Array(Number(review.stars))].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className={style.testimonialText}>{review.comment}</p>
                      <div className={style.testimonialAuthor}>
                        {review.imageURL ? <img src={`https://deebai.runasp.net${review.imageURL}`} className={style.reviewImg} style={{ overflow: "hidden", padding: 0 }} alt="" /> : <svg
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
                        </svg>}

                        <div className={style.authorInfo}>
                          <h5>{review.clientName}</h5>
                          <span>{review.position}{review.position && review.companyName ? `,` : ""} {review.companyName}</span>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="row justify-content-center">
                {review.map((review, index) => (
                  <div className="col-md-4 mb-5" key={index}>
                    <div className={style.testimonialCard}>
                      <div className={style.stars}>
                        {[...Array(Number(review.stars))].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className={style.testimonialText}>{review.comment}</p>
                      <div className={style.testimonialAuthor}>
                        {review.imageURL ? <img src={`https://deebai.runasp.net${review.imageURL}`} className={style.reviewImg} style={{ overflow: "hidden", padding: 0 }} alt="" /> : <svg
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
                        </svg>}

                        <div className={style.authorInfo}>
                          <h5>{review.clientName}</h5>
                          <span>{review.position}{review.position && review.companyName ? `,` : ""} {review.companyName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      }

      {/* <!-- Footer CTA --> */}
      <section className={style.footerCta}>
        <div className="container" style={{ maxWidth: "950px" }}>
          <div className={style.footerCtaCard}>
            <h2 className="fw-bold mb-4" style={{ fontSize: "36px", color: "var(--text-dark)" }}>Ready to Transform Your Business Data?</h2>
            <p className="mb-5 mx-auto" style={{ maxWidth: "600px", color: "var(--text-gray)", fontSize: "18px" }}>Join 1,000+ businesses using Namaa to make smarter, data-driven decisions today.</p>
            <div className="d-flex justify-content-center gap-3">
              <button onClick={() => navigate("/demo")} className={` ${style.btnPrimaryCustom}`} style={{ fontSize: "14px" }}>Try Free Demo</button>
              <button onClick={() => navigate("/pricing")} className={`${style.btnSecondaryCustom}`} style={{ fontSize: "14px" }}>View Pricing</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
