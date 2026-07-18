import React from 'react';
import styles from './ConnectionStatus.module.css';

export default function ConnectionStatus() {
  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <span>Docs</span>
        <span className={styles.separator}>›</span>
        <span>Database Connection</span>
        <span className={styles.separator}>›</span>
        <span className={styles.activeBreadcrumb}>Connection Status</span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Connection Status</h1>
        <p className={styles.subtitle}>What the Pending status means and the one-connection rule.</p>
      </header>

      {/* Section 1: Pending Status */}
      <section className={styles.section}>
        <h2 id="pending-status" className={styles.sectionTitle}>Pending Status</h2>
        <div className={styles.sectionContent}>
          <p>
            When your database connection shows "Pending," it means the credentials have been verified — the
            connection test passed — and they've been handed to the NAMAA team to build from.
          </p>
          <p>
            A specialist reviews the connection, checks that the necessary tables are accessible, and begins
            setting up the data pipelines for your subscribed services. This typically takes 48–72 hours. You'll be
            able to access your subscribed services when the connection moves to "Active."
          </p>
        </div>
        <div className={styles.callout}>
          <p>
            You don't need to do anything while a connection is in Pending status. The process is entirely on our side. If it's
            been more than 72 hours without an update, reach out to support.
          </p>
        </div>
      </section>

      {/* Section 2: One Connection at a Time */}
      <section className={styles.section}>
        <h2 id="one-connection-at-a-time" className={styles.sectionTitle}>One Connection at a Time</h2>
        <div className={styles.sectionContent}>
          <p>
            Only one database connection can be active in your account at a time. This is intentional — it keeps
            your data consistent across services and prevents conflicts between pipelines reading from different
            sources.
          </p>
        </div>
        <div className={styles.callout}>
          <p>
            <strong>If you need to switch databases, contact the account team.</strong> Submitting a second set of credentials doesn't
            replace the active one — it'll be flagged for review. Switching databases involves re-building the data pipelines
            for your services, so the account team handles it manually to make sure nothing breaks.
          </p>
        </div>
      </section>
    </div>
  );
}
