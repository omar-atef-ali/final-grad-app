import React from 'react'
import style from "./Features.module.css"
export default function Features() {
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
                        <button  style={{ fontSize: "16px" }} href="#" className={` ${style.btnPrimary} d-flex align-items-center gap-2`}>
                            
                            Try Interactive Demo →
                        </button>
                        <a href="#" className={`btn ${style.btnWhite}`}>View Pricing</a>
                    </div>
                </div>
            </header>

            {/* <!-- Features Section --> */}
            <section className={style.featuresSection}>
                <div className={`${style.container} container-xxl`}>
                    <div style={{marginBottom :"25px"}} className={` text-center pb-3`}>
                        <h2 className={`fw-bold ${style.sectionTitle}`}>Core AI Features</h2>
                        <p className={`${style.sectionSubtitle} mx-auto mt-3`}>Powerful features designed to transform how you understand and use your data</p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {/* <!-- Card 1 --> */}
                        <div className="col-md-5">
                            <div className={`${style.featureCard} h-100`}>
                                <div className={style.cardIconPlaceholder}></div>
                                <h3 className={style.cardTitle}>Feature Name</h3>
                                <p className={style.cardText}>Lorem ipsum dolor sit amet consectetur. Feugiat volutpat pretium non curabitur venenatis morbi. Faucibus eget habitasse pharetra massa nulla. Condimentum ultricies faucibus felis senectus mi.</p>
                                <a href="#" className={style.btnViewMore}>
                                    View More 
                                    <div className={`${style.aroow}`}>→</div>
                                </a>
                            </div>
                        </div>
                        {/* <!-- Card 2 --> */}
                        <div className="col-md-5">
                            <div className={`${style.featureCard} h-100`}>
                                <div className={style.cardIconPlaceholder}></div>
                                <h3 className={style.cardTitle}>Feature Name</h3>
                                <p className={style.cardText}>Lorem ipsum dolor sit amet consectetur. Cras sodales purus turpis commodo nec integer nec leo. Magna fringilla pharetra fringilla tortor suspendisse. Vulputate elit nunc in risus tempus viverra lectus id enim.</p>
                                <a href="#" className={style.btnViewMore}>
                                    View More 
                                    <div className={`${style.aroow}`}>→</div>
                                </a>
                            </div>
                        </div>
                        {/* <!-- Card 3 --> */}
                        <div className="col-md-5">
                            <div className={`${style.featureCard} h-100`}>
                                <div className={style.cardIconPlaceholder}></div>
                                <h3 className={style.cardTitle}>Feature Name</h3>
                                <p className={style.cardText}>Lorem ipsum dolor sit amet consectetur. Odio tellus mi id nisl urna leo eget nec. Sit sed id arcu nunc pharetra purus in urna. Mauris risus leo pharetra erat quisque orci duis.</p>
                                <a href="#" className={style.btnViewMore}>
                                    View More 
                                    <div className={`${style.aroow}`}>→</div>
                                </a>
                            </div>
                        </div>
                        {/* <!-- Card 4 --> */}
                        <div className="col-md-5">
                            <div className={`${style.featureCard} h-100`}>
                                <div className={style.cardIconPlaceholder}></div>
                                <h3 className={style.cardTitle}>Feature Name</h3>
                                <p className={style.cardText}>Lorem ipsum dolor sit amet consectetur. Aliquam neque magna tincidunt vitae penatibus dui. In in cras id dictum. Vulputate non aliquet sit neque est.</p>
                                <a href="#" className={style.btnViewMore}>
                                    View More 
                                    <div className={`${style.aroow}`}>→</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Demo Section --> */}

            <section className={style.footerCta}>
                    <div className="container" style={{ maxWidth: "1150px" }}>
                      <div className={style.footerCtaCard}>
                        <h2 className={`${style.textGradient} fw-bold mb-3`}>See It In Action</h2>
                        <p className={`${style.demoText} mb-4 mx-auto`}>Try our interactive demo with real business scenarios. Experience all features with sample data.</p>
                        <div className="d-flex justify-content-center gap-3">
                          <button className={`  ${style.btnPrimary} `} style={{ fontSize: "16px" }}>Launch Free Demo →</button>
                        </div>
                      </div>
                    </div>
                  </section>

            {/* <!-- Bottom CTA --> */}
            <section className={style.ctaSection}>
                <div className={`${style.container} container-xxl text-center`}>
                    <h2 className={`${style.sectionTitle} fw-bold mb-3`}>Ready to Transform Your Business?</h2>
                    <p className={`${style.sectionSubtitle} mx-auto mb-4`}>Start with one feature or get them all. Flexible pricing designed for growing businesses.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <button  style={{ fontSize: "16px" }} className={` ${style.btnPrimary} d-flex align-items-center gap-2`}>
                            View Pricing Plans →
                        </button>
                        <a style={{ backgroundColor : "white" }} href="#" className={`btn ${style.btnWhite}`}>Get Started Free</a>
                    </div>
                </div>
            </section>

        </>
    )
}