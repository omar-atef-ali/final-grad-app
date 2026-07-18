import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DatabaseOverView.module.css';

export default function DatabaseOverView() {
  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <span>Docs</span>
        <span className={styles.separator}>›</span>
        <span>Database Connection</span>
        <span className={styles.separator}>›</span>
        <span className={styles.activeBreadcrumb}>Overview</span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Database Connection</h1>
        <p className={styles.subtitle}>What connecting a database enables and which services need it.</p>
      </header>

      {/* Section 1: What It Enables */}
      <section className={styles.section}>
        <h2 id="what-it-enables" className={styles.sectionTitle}>What It Enables</h2>
        <div className={styles.sectionContent}>
          <p>
            Connecting a database is how NAMAA gets access to your business data — your products,
            transactions, customers, and inventory. Without it, none of the data-dependent services can run.
          </p>
          <p>
            The connection is set up once in Settings → Database Connection and shared across all services that
            need your data. You don't configure it separately per service.
          </p>
        </div>
      </section>

      {/* Section 2: Which Services Depend on It */}
      <section className={styles.section}>
        <h2 id="which-services-depend-on-it" className={styles.sectionTitle}>Which Services Depend on It</h2>
        <p className={styles.sectionIntro}>
          Three of the four NAMAA services require a connected database:
        </p>

        <div className={styles.servicesList}>
          <div className={styles.serviceRow}>
            <span className={styles.serviceName}>Recommendation Engine</span>
            <span className={styles.serviceDesc}>Needs your product catalogue and transaction history to train the recommendation model.</span>
          </div>
          <div className={styles.serviceRow}>
            <span className={styles.serviceName}>Business Dashboard</span>
            <span className={styles.serviceDesc}>Reads your sales, inventory, and customer data to generate dashboards.</span>
          </div>
          <div className={styles.serviceRow}>
            <span className={styles.serviceName}>Storefront Chatbot</span>
            <span className={styles.serviceDesc}>Reads your product catalogue to train the chatbot on your inventory.</span>
          </div>
        </div>

        <p className={styles.sectionNote}>
          Agentic Chatbot doesn't read from your database directly — it works with events sent via the API.
        </p>
      </section>

      {/* Section 3: Before You Connect */}
      <section className={styles.section}>
        <h2 id="before-you-connect" className={styles.sectionTitle}>Before You Connect</h2>
        <div className={styles.callout}>
          <p>
            You need an active subscription that includes at least one data-dependent service before you can submit
            database credentials. If you try to connect a database before subscribing, you'll be prompted to choose a plan
            first.
          </p>
        </div>
      </section>

      {/* Continue Link */}
      <Link to="/documentation/database-connection/supported-databases" className={styles.continueLink}>
        <span>Continue to Supported Databases &amp; Fields →</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  );
}
