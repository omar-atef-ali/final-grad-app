import React from 'react';
import styles from './OverView.module.css';

export default function Overview() {
  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <span>Docs</span>
        <span className={styles.separator}>›</span>
        <span>Introduction</span>
        <span className={styles.separator}>›</span>
        <span className={styles.activeBreadcrumb}>Platform Overview</span>
      </nav>

      {/* Header section */}
      <header className={styles.header}>
        <h1 className={styles.title}>Platform Overview</h1>
        <p className={styles.subtitle}>What NAMAA is and how it fits into your business.</p>
      </header>

      {/* Section 1: What is NAMAA */}
      <section className={styles.section}>
        <h2 id="what-is-namaa" className={styles.sectionTitle}>What is NAMAA</h2>
        <div className={styles.sectionContent}>
          <p>
            NAMAA connects to your business data and uses it to run AI services — recommendations, 
            dashboards, a storefront chatbot — without requiring you to build or maintain any AI 
            infrastructure yourself. You subscribe to the services you need, connect your database once, 
            and NAMAA handles everything from there.
          </p>
          <p>
            It's designed for retail and e-commerce businesses that want AI-powered tools but don't 
            have a data team. You don't write code or configure models. You connect your data and 
            receive the output.
          </p>
        </div>
      </section>

      {/* Section 2: Core Services */}
      <section className={styles.section}>
        <h2 id="core-services" className={styles.sectionTitle}>Core Services</h2>
        <p className={styles.sectionSubtitle}>
          There are four services. Each can be subscribed to individually or as part of a bundle.
        </p>

        {/* Cards Grid */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Recommendation Engine</h3>
            <p className={styles.cardDescription}>
              Ranks products for each shopper and serves those rankings via API to your storefront.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Business Dashboard</h3>
            <p className={styles.cardDescription}>
              Turns your sales, inventory, and customer data into interactive dashboards.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Agentic Analyst</h3>
            <p className={styles.cardDescription}>
              Lets you ask questions about your data in plain language and receive structured answers.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Storefront Chatbot</h3>
            <p className={styles.cardDescription}>
              An AI assistant embedded in your store that answers product questions and guides shoppers.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Getting Started */}
      <section className={styles.section}>
        <h2 id="getting-started" className={styles.sectionTitle}>Getting Started</h2>
        
        {/* Steps List */}
        <div className={styles.stepsList}>
          {/* Step 1 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepBody}>
              <h4 className={styles.stepTitle}>Subscribe to a plan</h4>
              <p className={styles.stepDescription}>
                Choose a service or bundle from the pricing page. Your account is activated immediately after checkout.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepBody}>
              <h4 className={styles.stepTitle}>Connect your database</h4>
              <p className={styles.stepDescription}>
                Go to Settings → Database Connection in your account and enter your credentials. 
                This is a one-time step shared across all services that need your data.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepBody}>
              <h4 className={styles.stepTitle}>Wait for initial processing</h4>
              <p className={styles.stepDescription}>
                Depending on the service, your first output — a dashboard, a trained model, a chatbot — is ready 
                within 48–72 hours.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepBody}>
              <h4 className={styles.stepTitle}>Use and improve</h4>
              <p className={styles.stepDescription}>
                Access your outputs through your account or the API. Use the feedback tools to flag issues and 
                request changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}