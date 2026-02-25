import React, { useContext, useEffect, useState } from 'react'
import style from "./Features.module.css"
import api from '../../api'
import { userContext } from '../../context/userContext'


export default function Features() {

    const [feature, setFeature] = useState([])
    const { userToken } = useContext(userContext)
    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const { data } = await api.get("Services", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                console.log(data);
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
        if (userToken) { // تأكد إن التوكن موجود قبل الطلب لو ضروري
            fetchFeatures()
        }

    }, [userToken])

    return (
        <>



            <header className={`${style.heroSection} text-center d-flex flex-column align-items-center justify-content-center`}>
                <div className={`${style.container} container-xxl`}>
                    <h1 className={`display-3 fw-bold ${style.heroTitle} mb-0`}>
                        <span className={`d-block ${style.textGradient}`}>Powerful features built</span>
                        <span className={`d-block ${style.textGradient}`}>for growing businesses</span>
                    </h1>
                    <p className={`${style.heroSubtitle} mt-4 mx-auto`}>
                        Choose individual features or bundle them together. Add more as you scale. Only pay for what you need.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-4 pt-2">
                        <button style={{ fontSize: "14px" }} href="#" className={` ${style.btnPrimary} d-flex align-items-center gap-2`}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33333 3.33335C3.33326 3.09874 3.3951 2.86827 3.51259 2.66521C3.63008 2.46214 3.79907 2.29368 4.0025 2.17681C4.20593 2.05995 4.43659 1.99883 4.67119 1.99963C4.9058 2.00042 5.13604 2.06311 5.33867 2.18135L13.3367 6.84668C13.5385 6.9638 13.7061 7.13185 13.8226 7.33402C13.9392 7.53619 14.0006 7.76541 14.0008 7.99877C14.001 8.23213 13.94 8.46146 13.8238 8.66384C13.7076 8.86621 13.5403 9.03455 13.3387 9.15202L5.33867 13.8187C5.13604 13.9369 4.9058 13.9996 4.67119 14.0004C4.43659 14.0012 4.20593 13.9401 4.0025 13.8232C3.79907 13.7064 3.63008 13.5379 3.51259 13.3348C3.3951 13.1318 3.33326 12.9013 3.33333 12.6667V3.33335Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Try Interactive Demo
                        </button>
                        <a href="#" style={{ fontSize: "14px" }} className={`btn ${style.btnWhite}`}>View Pricing</a>
                    </div>
                </div>
            </header>

            {/* <!-- Features Section --> */}
            {feature.length > 0 && <section className={style.featuresSection}>
                <div className={`${style.container} container-xxl`}>
                    <div style={{ marginBottom: "25px" }} className={` text-center pb-3`}>
                        <h2 className={`fw-bold ${style.sectionTitle}`}>Core AI Features</h2>
                        <p className={`${style.sectionSubtitle} mx-auto mt-3`}>Powerful features designed to transform how you understand and use your data</p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {feature.map((feature) => (
                            <div className="col-md-5" key={feature.id} order={feature.displayPriority}>
                                <div className={`${style.featureCard} h-100`}>
                                    <div className={style.cardIconPlaceholder}>
                                        <img
                                            src={`https://deebai.runasp.net/${feature.iconURL?.split('\\').join('/')}`}
                                            onError={(e) => {
                                                const target = e.target;
                                                target.onerror = null;
                                                if (!target.src.includes("/api/")) {
                                                    target.src = `https://deebai.runasp.net/api/${feature.imageURL?.split('\\').join('/')}`;
                                                } else {
                                                    // Optional: You could set a placeholder here if both fail
                                                    // target.src = "https://placehold.co/600x400?text=No+Image";
                                                }
                                            }}
                                            alt={feature.name}
                                        />
                                    </div>
                                    <h3 className={style.cardTitle}>{feature.name}</h3>
                                    <p className={style.cardText}>{feature.description}</p>
                                    <a href={`/feature-details/${feature.id}`} className={style.btnViewMore}>
                                        View More
                                        <div className={`${style.aroow}`}>→</div>
                                    </a>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>}


            {/* <!-- Bottom CTA --> */}
            <section className={style.ctaSection}>
                <div className={`${style.container} container-xxl text-center`}>
                    <h2 className={`${style.sectionTitle} fw-bold mb-3`}>Ready to Transform Your Business?</h2>
                    <p className={`${style.sectionSubtitle} mx-auto mb-4`}>Start with one feature or get them all. Flexible pricing designed for growing businesses.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <button style={{ fontSize: "14px" }} className={` ${style.btnPrimary} d-flex align-items-center gap-2`}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33333 3.33335C3.33326 3.09874 3.3951 2.86827 3.51259 2.66521C3.63008 2.46214 3.79907 2.29368 4.0025 2.17681C4.20593 2.05995 4.43659 1.99883 4.67119 1.99963C4.9058 2.00042 5.13604 2.06311 5.33867 2.18135L13.3367 6.84668C13.5385 6.9638 13.7061 7.13185 13.8226 7.33402C13.9392 7.53619 14.0006 7.76541 14.0008 7.99877C14.001 8.23213 13.94 8.46146 13.8238 8.66384C13.7076 8.86621 13.5403 9.03455 13.3387 9.15202L5.33867 13.8187C5.13604 13.9369 4.9058 13.9996 4.67119 14.0004C4.43659 14.0012 4.20593 13.9401 4.0025 13.8232C3.79907 13.7064 3.63008 13.5379 3.51259 13.3348C3.3951 13.1318 3.33326 12.9013 3.33333 12.6667V3.33335Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> Try Free Demo
                        </button>
                        <a style={{ backgroundColor: "white", fontSize: "14px" }} href="#" className={`btn ${style.btnWhite}`}>View Pricing</a>
                    </div>
                </div>
            </section>

        </>
    )
}