import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ApiReference.module.css';

export default function ApiReference() {
  const [copiedBlock, setCopiedBlock] = useState(null);

  const handleCopy = (text, blockId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedBlock(blockId);
      setTimeout(() => {
        setCopiedBlock(null);
      }, 2000);
    });
  };

  const codeBlocks = {
    auth: 'Authorization: Bearer <YOUR_API_KEY>',
    getRes: `{
  "recommendations": [
    {
      "product_id": "prod_1",
      "score": 0.95,
      "reason": "Frequently bought together"
    },
    {
      "product_id": "prod_2",
      "score": 0.82,
      "reason": "Based on recent views"
    }
  ],
  "total_returned": 2,
  "processing_ms": 120
}`,
    postReq: `{
  "force": true
}`,
    postRes: `{
  "job_id": "job_123456789",
  "status": "queued",
  "estimated_completion": "2026-07-14T12:00:00Z"
}`
  };

  const renderCopyButton = (blockId, textToCopy) => {
    const isCopied = copiedBlock === blockId;
    return (
      <button
        onClick={() => handleCopy(textToCopy, blockId)}
        className={styles.copyButton}
        title="Copy to clipboard"
      >
        {isCopied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#16a34a' }}>
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span style={{ color: '#16a34a', fontWeight: '600' }}>Copied!</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.copyIcon}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <span>Docs</span>
        <span className={styles.separator}>›</span>
        <span>Recommendation Engine</span>
        <span className={styles.separator}>›</span>
        <span className={styles.activeBreadcrumb}>API Reference</span>
      </nav>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Recommendation Engine – API Reference</h1>
        <p className={styles.subtitle}>Integrate recommendations into your storefront.</p>
      </header>

      {/* Section 1: Authentication */}
      <section className={styles.section}>
        <h2 id="authentication" className={styles.sectionTitle}>Authentication</h2>
        <p className={styles.sectionText}>
          Every request must include an API Key as an Authorization header. You can obtain your API Key from Dashboard settings.
        </p>

        <div className={styles.codeBlockWrapper}>
          <div className={styles.codeBlockHeader}>
            <span className={styles.codeBlockLabel}>HEADER NAME</span>
            {renderCopyButton('auth', codeBlocks.auth)}
          </div>
          <pre className={styles.codeBlock}>
            <code className={styles.codeContent}>{codeBlocks.auth}</code>
          </pre>
        </div>

        <div className={styles.warningAlert}>
          <p>
            Do not share your API Key or expose it in client-side code (mobile apps, web apps).
          </p>
        </div>
      </section>

      {/* Section 2: GET /recommendations */}
      <section className={styles.section}>
        <h2 id="get-recommendations" className={styles.sectionTitle}>GET /recommendations</h2>
        
        <div className={styles.endpointHeader}>
          <span className={styles.getBadge}>GET</span>
          <span className={styles.endpointPath}>/v1/recommendations</span>
        </div>

        <p className={styles.sectionText}>
          Retrieve a list of recommended products tailored for a specific customer based on history & behavior.
        </p>

        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Query Parameters</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>PARAMETER</th>
                <th>TYPE</th>
                <th>REQUIRED</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.fieldName}>customer_id</td>
                <td className={styles.typeCell}>string</td>
                <td><span className={styles.requiredBadge}>Required</span></td>
                <td>Unique identifier of the customer to generate recommendations for.</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>session_id</td>
                <td className={styles.typeCell}>string</td>
                <td><span className={styles.optionalBadge}>Optional</span></td>
                <td>Current session ID to link anonymous recommendations.</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>limit</td>
                <td className={styles.typeCell}>integer</td>
                <td><span className={styles.optionalBadge}>Optional</span></td>
                <td>How many items to return (default 10, max 50).</td>
              </tr>
              <tr>
                <td className={styles.fieldName}>category</td>
                <td className={styles.typeCell}>string</td>
                <td><span className={styles.optionalBadge}>Optional</span></td>
                <td>Filter recommendations by specific category.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.codeBlockWrapper}>
          <div className={styles.codeBlockHeader}>
            <span className={styles.codeBlockLabel}>RESPONSE</span>
            {renderCopyButton('getRes', codeBlocks.getRes)}
          </div>
          <pre className={styles.codeBlock}>
            <code className={styles.codeContent}>{codeBlocks.getRes}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: POST /recommendations/refresh */}
      <section className={styles.section}>
        <h2 id="post-recommendations-refresh" className={styles.sectionTitle}>POST /recommendations/refresh</h2>

        <div className={styles.endpointHeader}>
          <span className={styles.postBadge}>POST</span>
          <span className={styles.endpointPath}>/v1/recommendations/refresh</span>
        </div>

        <p className={styles.sectionText}>
          Trigger model retraining/refresh process for recommendations.
        </p>

        <div className={styles.codeBlockWrapper}>
          <div className={styles.codeBlockHeader}>
            <span className={styles.codeBlockLabel}>REQUEST BODY</span>
            {renderCopyButton('postReq', codeBlocks.postReq)}
          </div>
          <pre className={styles.codeBlock}>
            <code className={styles.codeContent}>{codeBlocks.postReq}</code>
          </pre>
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Response Fields</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NAME</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.fieldName}>status</td>
                <td className={styles.typeCell}>string</td>
                <td><span className={styles.successBadge}>Success</span></td>
                <td>"Model training triggered. Job ID: job_123456789"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.codeBlockWrapper}>
          <div className={styles.codeBlockHeader}>
            <span className={styles.codeBlockLabel}>RESPONSE</span>
            {renderCopyButton('postRes', codeBlocks.postRes)}
          </div>
          <pre className={styles.codeBlock}>
            <code className={styles.codeContent}>{codeBlocks.postRes}</code>
          </pre>
        </div>

        <div className={styles.noteAlert}>
          <p>
            This endpoint trigger is rate limited to 3 requests per hour to avoid unnecessary load.
          </p>
        </div>
      </section>

      {/* Continue Link */}
      <Link to="/documentation/business-dashboard/overview" className={styles.continueLink}>
        <span>Continue to Business Dashboard Overview →</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  );
}
