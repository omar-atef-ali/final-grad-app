import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Overview.module.css';

export default function RecommendationOverview() {
  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <span>Docs</span>
        <span className={styles.separator}>›</span>
        <span>Recommendation Engine</span>
        <span className={styles.separator}>›</span>
        <span className={styles.activeBreadcrumb}>Overview</span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Recommendation Engine</h1>
        <p className={styles.subtitle}>How the AI recommendation engine works and what to expect.</p>
      </header>

      {/* Text before Description */}
      <p className={styles.leadText}>Ranked product recommendations served to your storefront via API.</p>

      {/* Section 1: Description */}
      <section className={styles.section}>
        <h2 id="description" className={styles.sectionTitle}>Description</h2>
        <div className={styles.sectionContent}>
          <p>
            The Recommendation Engine looks at your transaction history and product catalogue, builds a model of
            what your customers tend to buy together or after certain purchases, and uses that model to rank
            products for each shopper in real time. You call the API from your storefront, pass a customer or
            session ID, and get back a ranked list of product IDs.
          </p>
          <p>
            It requires a connected database. The model trains within 24 hours of the connection being active and
            re-trains weekly after that.
          </p>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className={styles.section}>
        <h2 id="how-it-works" className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsList}>
          {/* Step 1 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Connect your database</h3>
              <p className={styles.stepText}>
                Your product catalogue and transaction history are read from the database you've connected in Settings. Nothing needs to be exported or formatted.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Initial training</h3>
              <p className={styles.stepText}>
                The model runs within 24 hours of your connection going live. You'll receive an email when recommendations are ready to serve.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Serve via API</h3>
              <p className={styles.stepText}>
                Call GET /recommendations with a customer or session ID. The response comes back in under 200ms with a ranked list and confidence scores.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Send feedback</h3>
              <p className={styles.stepText}>
                When a shopper clicks or buys a recommendation, send that event to the feedback endpoint. The model uses it to improve future rankings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Performance Metrics */}
      <section className={styles.section}>
        <h2 id="performance-metrics" className={styles.sectionTitle}>Performance Metrics</h2>
        <p className={styles.sectionIntro}>
          Typical figures across merchants using NAMAA recommendations:
        </p>

        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>≥20%</span>
            <span className={styles.metricLabel}>HIT RATE @ 20</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>0.72</span>
            <span className={styles.metricLabel}>AVG. PRECISION</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>&lt;200ms</span>
            <span className={styles.metricLabel}>P99 LATENCY</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricValue}>99.9%</span>
            <span className={styles.metricLabel}>UPTIME SLA</span>
          </div>
        </div>

        <div className={styles.callout}>
          <p>
            Merchants with at least six months of feedback data consistently see hit rates above 25%. The model improves continuously as you send feedback events.
          </p>
        </div>
      </section>

      {/* Continue Link */}
      <Link to="/documentation/recommendation-engine/api" className={styles.continueLink}>
        <span>Continue to API Reference →</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  );
}
