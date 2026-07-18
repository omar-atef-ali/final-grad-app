import React from 'react';
import style from './AgenticAnalyst.module.css';

export default function AgenticAnalyst() {
  return (
    <div className={`container-fluid p-0 ${style.mainContainer}`}>

      <div className={style.pageWrapper}>
        {/* Header & Pending Badge */}
        <div className={style.headerContainer}>
          <div className={style.titleWrapper}>
            <h1 className={style.title}>Agentic Analyst</h1>
            <span className={style.pendingBadge}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                  stroke="#A65F00"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M6 3V6L8 7" stroke="#A65F00" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Pending</span>
            </span>
          </div>
          <p className={style.subtitle}>
            AI-powered analyst that runs automated reports and answers business questions.
          </p>
        </div>

        {/* Stepper Card */}
        <div className={style.stepperCard}>
          <div className={style.iconContainer}>
            <div className={style.iconCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A45B2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
          </div>

          <h2 className={style.cardTitle}>Your data is being processed</h2>
          <p className={style.cardDescription}>
            We received your request and are setting up your service. We will get back to you as soon as possible.
          </p>

          {/* Timeline Stepper */}
          <div className={style.timeline}>
            <div className={`${style.timelineStep} ${style.completed}`}>
              <div className={style.stepMarker}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className={style.stepContent}>
                <span className={style.stepLabel}>Service activated</span>
              </div>
            </div>

            <div className={`${style.timelineStep} ${style.completed}`}>
              <div className={style.stepMarker}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className={style.stepContent}>
                <span className={style.stepLabel}>Data pipeline initialising</span>
              </div>
            </div>

            <div className={`${style.timelineStep} ${style.active}`}>
              <div className={style.stepMarker}>
                <div className={style.activeInnerCircle} />
              </div>
              <div className={style.stepContent}>
                <span className={style.stepLabel}>Processing your data</span>
              </div>
            </div>

            <div className={`${style.timelineStep} ${style.upcoming}`}>
              <div className={style.stepMarker}>
                <div className={style.upcomingInnerCircle} />
              </div>
              <div className={style.stepContent}>
                <span className={style.stepLabel}>Agentic Analyst  ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Notice Box */}
        <div className={style.noticeBox}>
          <p className={style.noticeText}>
            You'll receive an email notification once your Agentic Analyst  is ready.{' '}
            <span className={style.supportLink} onClick={() => navigate('/documentation/overview')}>
              Contact support
            </span>{' '}
            if it's taking too long.
          </p>
        </div>
      </div>

    </div>
  );
}

