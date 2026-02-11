import React, { useContext, useEffect, useState } from 'react'
import style from "./FeatureDetails.module.css"
import imghero from "../../assets/images/piling.jpeg"
import api from "../../api";
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { userContext } from '../../context/userContext';
export default function FeatureDetails() {

  const {id } = useParams()
  const { userToken } = useContext(userContext)
  const [featureDetails,setfeatureDetails]=useState({})
  const navigate=useNavigate()
  async function getFeatureeDetails() {
    
    try {
      let {data} = await api.get(`/Services/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      console.log(data);
      setfeatureDetails(data)
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while registration.",
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
            height: "60px",
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
  useEffect(() => {
    if (id && userToken) {
      getFeatureeDetails();
    }
  }, [id, userToken]);



// import { useNavigate } from 'react-router-dom'
// export default function FeatureDetails() {
//   let navigate = useNavigate()

  return (
    <>


      <main>
        <div className="container-fluid px-5 mt-4">
          <button className={`${style.back_btn}`} onClick={() => navigate("/features")}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12.6667L3.33333 8L8 3.33333" stroke="#86808E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.6667 8H3.33333" stroke="#86808E" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Features
          </button>
        </div>
        <section className={`${style.feature_detail_section}`}>
          <div className="container">
            <div className={`${style.feature_card}`}>
              <div className="row d-flex g-0">
                <div className="col-lg-6">
                  <div className={style.image_area}>

                    <img
                      src={featureDetails?.imageURL}
                      alt="dashboard preview"
                      className={style.main_image}
                    />

                    <div className={style.stats_container}>
                      <div className={style.stat_card}>
                        <div className={style.stat_value}>50+</div>
                        <div className={style.stat_label}>Chart Types</div>
                      </div>
                      <div className={style.stat_card}>
                        <div className={style.stat_value}>&lt;1s</div>
                        <div className={style.stat_label}>Load Time</div>
                      </div>
                      <div className={style.stat_card}>
                        <div className={style.stat_value}>∞</div>
                        <div className={style.stat_label}>Custom Views</div>
                      </div>
                    </div>

                  </div>
                </div>


                <div className="col-lg-6">
                  <div className={`${style.content_area}`}>
                    <div className={`${style.content_header}`}>
                      <h1 className={`${style.content_title}`}>{featureDetails.name}</h1>
                      <p className={`${style.content_subtitle}`}>Visualize what matters most</p>
                    </div>
                    <p className={`${style.content_description}`}>
                       {featureDetails.description}
                    </p>
                    <div className={`${style.key_benefits}`}>
                      <h3 className={`${style.benefits_title}`}>Key Benefits</h3>
                      <div className={`${style.benefit_item}`}>
                        <div className={`${style.benefit_icon}`}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className={`${style.benefit_text}`}>Lorem ipsum dolor sit amet consectetur.</span>
                      </div>
                      <div className={`${style.benefit_item}`}>
                        <div className={`${style.benefit_icon}`}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className={`${style.benefit_text}`}>Lorem ipsum dolor sit amet consectetur.</span>
                      </div>
                      <div className={`${style.benefit_item}`}>
                        <div className={`${style.benefit_icon}`}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className={`${style.benefit_text}`}>Lorem ipsum dolor sit amet consectetur.</span>
                      </div>
                      <div className={`${style.benefit_item}`}>
                        <div className={`${style.benefit_icon}`}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 10L9.16667 11.6667L12.5 8.33333" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className={`${style.benefit_text}`}>Lorem ipsum dolor sit amet consectetur.</span>
                      </div>
                    </div>
                    <div className={`${style.action_buttons}`}>
                      <button className={`${style.btn_try_feature}`}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.33333 3.33335C3.33326 3.09874 3.3951 2.86827 3.51259 2.66521C3.63008 2.46214 3.79907 2.29368 4.0025 2.17681C4.20593 2.05995 4.43659 1.99883 4.67119 1.99963C4.9058 2.00042 5.13604 2.06311 5.33867 2.18135L13.3367 6.84668C13.5385 6.9638 13.7061 7.13185 13.8226 7.33402C13.9392 7.53619 14.0006 7.76541 14.0008 7.99877C14.001 8.23213 13.94 8.46146 13.8238 8.66384C13.7076 8.86621 13.5403 9.03455 13.3387 9.15202L5.33867 13.8187C5.13604 13.9369 4.9058 13.9996 4.67119 14.0004C4.43659 14.0012 4.20593 13.9401 4.0025 13.8232C3.79907 13.7064 3.63008 13.5379 3.51259 13.3348C3.3951 13.1318 3.33326 12.9013 3.33333 12.6667V3.33335Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Try This Feature
                      </button>
                      <button className={`${style.btn_see_pricing}`}>See Pricing</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className="container mt-4">
          <section className={`${style.use_cases_section}`}>
            <div className="container-fluid">
              <div className={`${style.section_header}`}>
                <h2 className={`${style.section_title}`}>Real-World Use Cases</h2>
                <p className={`${style.section_subtitle}`}>See how businesses use Dashboards to drive results</p>
              </div>
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className={`${style.use_case_card}`}>
                    <div className={`${style.use_case_number}`}>1</div>
                    <div className={`${style.use_case_content}`}>
                      <h3 className={`${style.use_case_title}`}>Lorem ipsum</h3>
                      <p className={`${style.use_case_description}`}>Lorem ipsum dolor sit amet consectetur. Risus lobortis mattis sit feugiat iaculis nunc integer.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={`${style.use_case_card}`}>
                    <div className={`${style.use_case_number}`}>2</div>
                    <div className={`${style.use_case_content}`}>
                      <h3 className={`${style.use_case_title}`}>Sales Performance Tracking</h3>
                      <p className={`${style.use_case_description}`}>Track sales performance across teams and regions in real time, monitor key KPIs, and quickly identify trends to improve revenue and forecasting accuracy.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={`${style.use_case_card}`}>
                    <div className={`${style.use_case_number}`}>3</div>
                    <div className={`${style.use_case_content}`}>
                      <h3 className={`${style.use_case_title}`}>Lorem ipsum</h3>
                      <p className={`${style.use_case_description}`}>Lorem ipsum dolor sit amet consectetur. Risus lobortis mattis sit feugiat iaculis nunc integer.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={`${style.use_case_card}`}>
                    <div className={`${style.use_case_number}`}>4</div>
                    <div className={`${style.use_case_content}`}>
                      <h3 className={`${style.use_case_title}`}>Lorem ipsum dolor</h3>
                      <p className={`${style.use_case_description}`}>Lorem ipsum dolor sit amet consectetur. Risus lobortis mattis sit feugiat iaculis nunc integer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>


    </>


  )
}
