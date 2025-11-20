import React, { useState } from "react";
import style from "./pricing.module.css";

export default function Pricing() {
  const [selected, setSelected] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);

  return (
    <>
      <div className={`${style.pricing_page} container-fluid`}>
        <div className={style.pricing_bg}>
          <div className={`${style.info}`}>
            <h1
              className={`${style.header} totalFont text-white mb-2 text-center`}
            >
              Pricing
            </h1>
            <p className={` totalFont text-white-50 text-center w-75 `}>
              Choose the perfect plan tailored to your needs,Unlock the best
              value for your business simple plans, powerful features, and the
              freedom to upgrade anytime
            </p>
          </div>
        </div>

        <div className="container">
          <div className={`${style.parent_pricing} col-12 col-md-6 col-lg-6`}>
            <div className={`${style.customPricing} col-12 col-md-4 `}>
              <h1>sdada</h1>
            </div>

            <div className={`${style.customPricing} col-12 col-md-4`}>
              <h1>sdada</h1>
            </div>

            <div className={`${style.parent_pricing2} `}>
              <div className={`${style.customPricing2} col-12 col-md-4`}>
                <h1>sdada</h1>
              </div>
            </div>
          </div>
        </div>
        <h4 className={`${style.additions_h4} fs-3  totalFont text-center`}>
          Your additions
        </h4>
        <div className={`${style.additions}`}>
          <div
            className="accordion accordion-flush"
            id="accordionPanelsStayOpenExample"
          >
            <div className="accordion-item bg-transparent">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  className={`${style.accordion_button} accordion-button collapsed totalFont  text-white border-white`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Accordion Item #1
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body text-white totalFont">
                  <div className={style.options_container}>
                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected(1)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected === 1 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>
                        3 months plan (~17% discount)
                      </p>
                    </div>

                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected(2)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected === 2 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>6 months plan</p>
                    </div>

                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected(3)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected === 3 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>
                        12 months plan (~40% discount)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item bg-transparent">
              <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                  className={`${style.accordion_button} accordion-button collapsed  text-white border-white`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Accordion Item #2
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
              >
                <div className="accordion-body text-white totalFont">
                  <div className={style.options_container}>
                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected2(1)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected2 === 1 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>
                        3 months plan (~17% discount)
                      </p>
                    </div>

                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected2(2)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected2 === 2 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>6 months plan</p>
                    </div>

                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected2(3)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected2 === 3 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>
                        12 months plan (~40% discount)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item bg-transparent">
              <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                <button
                  className={`${style.accordion_button} accordion-button collapsed  text-white border-white`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree"
              >
                <div className="accordion-body text-white totalFont">
                  <div className={style.options_container}>
                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected3(1)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected3 === 1 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>
                        3 months plan (~17% discount)
                      </p>
                    </div>

                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected3(2)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected3 === 2 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>6 months plan</p>
                    </div>

                    <div
                      className={`${style.option_wrapper}`}
                      onClick={() => setSelected3(3)}
                    >
                      <div
                        className={`${style.option_dot} ${
                          selected3 === 3 ? style.option_dotActive : ""
                        }`}
                      ></div>
                      <p className={style.option_text}>
                        12 months plan (~40% discount)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`container`} style={{ marginTop: "80px" }}>
          <h3
            className={`${style.header} fs-3 totalFont text-white  text-center`}
          >
            What Our Customers Say
          </h3>
          <div className={`${style.hrStyle}`}></div>
          <div className={`${style.parent_reviews} `}>
            <div className={`${style.customReviews} col-12 col-md-4`}>
              <h1>sdada</h1>
            </div>

            <div className={`${style.customReviews} col-12 col-md-4`}>
              <h1>sdada</h1>
            </div>
            <div className={`${style.customReviews} col-12 col-md-4`}>
              <h1>sdada</h1>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: "60px" }}>
          <div className={`${style.info}`}>
            <h3
              className={`${style.header} fs-3 totalFont text-white mb-2 text-center`}
            >
              Ready to Get Started?
            </h3>
            <p className={` totalFont text-white-50 text-center w-75 `}>
              Join thousands of teams already using DeepAi to streamline their
              operations and boost productivity.
            </p>
            <button className={`${style.headerBtn} btn_deeb totalFont`}>
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
