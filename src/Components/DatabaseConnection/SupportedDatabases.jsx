import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SupportedDatabases.module.css';

export default function SupportedDatabases() {
  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <span>Docs</span>
        <span className={styles.separator}>›</span>
        <span>Database Connection</span>
        <span className={styles.separator}>›</span>
        <span className={styles.activeBreadcrumb}>Supported Databases &amp; Fields</span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Supported Databases &amp; Fields</h1>
        <p className={styles.subtitle}>Supported engines, connection fields, and what happens on submit.</p>
      </header>

      {/* Section 1: Supported Databases */}
      <section className={styles.section}>
        <h2 id="supported-databases" className={styles.sectionTitle}>Supported Databases</h2>
        <p className={styles.sectionText}>NAMAA currently supports the following database engines:</p>
        <div className={styles.badgeList}>
          <span className={styles.badge}>SQL Server</span>
          <span className={styles.badge}>MySQL</span>
          <span className={styles.badge}>PostgreSQL</span>
          <span className={styles.badge}>MongoDB</span>
        </div>
      </section>

      {/* Section 2: Field Reference */}
      <section className={styles.section}>
        <h2 id="field-reference" className={styles.sectionTitle}>Field Reference</h2>
        <p className={styles.sectionText}>
          These are the fields you'll fill in when adding a connection. All fields apply to every supported database type.
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>FIELD</th>
                <th>TYPE</th>
                <th>REQUIRED</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.fieldName}>Database Type</td>
                <td>select</td>
                <td><span className={styles.requiredBadge}>Required</span></td>
                <td>The engine running your database — SQL Server, MySQL, PostgreSQL, or MongoDB.</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>Host</td>
                <td>string</td>
                <td><span className={styles.requiredBadge}>Required</span></td>
                <td>The hostname or IP address of your database server.</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>Port</td>
                <td>integer</td>
                <td><span className={styles.requiredBadge}>Required</span></td>
                <td>The port your database listens on. Common defaults: 1433 (SQL Server), 3306 (MySQL), 5432 (PostgreSQL), 27017 (MongoDB).</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>Database Name</td>
                <td>string</td>
                <td><span className={styles.requiredBadge}>Required</span></td>
                <td>The name of the specific database (or schema) NAMAA should read from.</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>Username</td>
                <td>string</td>
                <td><span className={styles.requiredBadge}>Required</span></td>
                <td>A database user with at minimum SELECT permissions on the relevant tables.</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>Password</td>
                <td>string</td>
                <td><span className={styles.requiredBadge}>Required</span></td>
                <td>The password for that user. It's encrypted before storage and never displayed in plain text again after you save.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: What Happens on Submit */}
      <section className={styles.section}>
        <h2 id="what-happens-on-submit" className={styles.sectionTitle}>What Happens on Submit</h2>

        <div className={styles.stepsList}>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepBody}>
              <h4 className={styles.stepTitle}>Connection test</h4>
              <p className={styles.stepDescription}>
                NAMAA immediately tries to connect using the credentials you provided. This happens synchronously
                — you'll see a result within a few seconds.
              </p>
            </div>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepBody}>
              <h4 className={styles.stepTitle}>Failure</h4>
              <p className={styles.stepDescription}>
                If the connection fails, an error message explains what went wrong (wrong password, host
                unreachable, insufficient permissions, etc.). Nothing is saved.
              </p>
            </div>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepBody}>
              <h4 className={styles.stepTitle}>Success</h4>
              <p className={styles.stepDescription}>
                If the connection succeeds, the credentials are saved with a status of "Pending." This means they're
                stored and verified, but not yet in active use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Link */}
      <Link to="/documentation/database-connection/status" className={styles.continueLink}>
        <span>Continue to Connection Status →</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  );
}
