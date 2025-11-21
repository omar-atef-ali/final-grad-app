import React, { useEffect, useRef } from "react";
import style from "./Tableau.module.css"
export default function Tableau() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    const objectEl = container.getElementsByTagName("object")[0];

    const resizeViz = () => {
      const width = container.offsetWidth;

      const height = width * 0.60; 

      objectEl.style.width = width + "px";
      objectEl.style.height = height + "px";
    };

    // أول مرة
    resizeViz();

    // تحميل سكربت Tableau
    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    objectEl.parentNode.insertBefore(script, objectEl);

    // تحديث عند تغيير حجم الشاشة
    window.addEventListener("resize", resizeViz);

    return () => {
      window.removeEventListener("resize", resizeViz);
    };
  }, []);

  return (
    <div className={`${style.dashboardbg}`}>
      <div
        style={{
          marginTop:"80px",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1 className="mt-3 mb-2 text-white text-center totalFont">
          Sales Analytics Dashboard
        </h1>

        <p className="mb-4 text-center text-white-50 totalFont">
          Comprehensive overview of your business performance
        </p>

        {/* الكونتينر الريسبونسيف */}
        <div
          ref={ref}
          className="tableauPlaceholder"
          style={{
            width: "100%",
            maxWidth: "1100px", // الحجم الأساسي
          }}
        >
          <noscript>
            <a href="#">
              <img
                alt="Dashboard"
                src="https://public.tableau.com/static/images/Gr/GradProject_add_customer_Dashboard_rfm_settings_download/Dashboard13/1_rss.png"
                style={{ border: "none" }}
              />
            </a>
          </noscript>

          <object className="tableauViz" style={{ display: "none" }}>
            <param
              name="host_url"
              value="https%3A%2F%2Fpublic.tableau.com%2F"
            />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param
              name="name"
              value="GradProject_add_customer_Dashboard_rfm_settings_download/Dashboard13?:toolbar=no&:tabs=no"
            />
            <param name="tabs" value="no" />
            <param name="toolbar" value="no" />
            <param
              name="static_image"
              value="https://public.tableau.com/static/images/Gr/GradProject_add_customer_Dashboard_rfm_settings_download/Dashboard13/1.png"
            />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="en-GB" />
          </object>
        </div>
      </div>
    </div>
  );
}
