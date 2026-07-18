import React, { useState } from 'react';
import style from './AIRecommendations.module.css';

export default function AIRecommendations() {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const getRecommendationsRequestBody = `{
  "user_id": 100,
  "item_ids": [108, 120, 1294, 1948, 1022, 298],
  "top_k": 10
}`;

  const getRecommendationsResponse = `{
  "user_id": 100,
  "recommendations": [132, 23, 894, 2, 66, 3, 10],
  "top_k": 10
}`;

  const getCustomerRequestBody = `{
  "user_id": 123,
  "top_k": 10
}`;

  const getCustomerResponse = `{
  "customer_id": 125,
  "history": [2540, 3644, 1208, 3649, 2548, 2841],
  "recommendations": [5, 4, 2, 3, 63, 121, 14],
  "top_k": 10,
  "is_new_customer": true
}`;

  return (
    <div className={style.pageWrapper}>
      {/* Header & Pending Badge */}
      <div className={style.headerContainer}>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>AI Recommendations</h1>
          <span className={style.pendingBadge}>
            <span className={style.pendingDot}></span> Pending
          </span>
        </div>
        <p className={style.subtitle}>
          Connect your app to the recommendation engine via our REST API.
        </p>
      </div>

      {/* Card 1: API Token */}
      <div className={style.card}>
        <h2 className={style.cardSectionTitle}>API TOKEN</h2>
        <div className={style.tokenInputWrapper}>
          <input
            type="text"
            className={style.tokenInput}
            placeholder="Your token will appear here"
            disabled
          />
        </div>
        <div className={`${style.alert} ${style.alertWarning}`}>
          <div className={style.alertIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className={style.alertContent}>
            <h4 className={style.alertTitle}>Token generation isn't available yet</h4>
            <p className={style.alertText}>
              We're still working on it. You'll get an email as soon as your token is ready.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2: Get Recommendations */}
      <div className={style.card}>
        <div className={style.apiMethodHeader}>
          <span className={style.methodBadgePost}>POST</span>
          <span className={style.methodTitle}>Get Recommendations</span>
        </div>
        <div className={style.endpointUrl}>http://host/recommend</div>

        <div className={`${style.alert} ${style.alertInfo}`}>
          <div className={style.alertIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className={style.alertContent}>
            <p className={style.alertText}>
              Retrieves a list of recommended items based on a user's recent interaction history.
            </p>
          </div>
        </div>

        <div className={style.twoColumnLayout}>
          {/* Left Column: Docs */}
          <div className={style.docsColumn}>
            <h3 className={style.columnSubTitle}>Request Headers</h3>
            <table className={style.headersTable}>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style.headerKey}>Authorization</td>
                  <td className={style.headerValue}>Token &lt;token&gt;</td>
                </tr>
              </tbody>
            </table>

            <h3 className={style.columnSubTitle}>Parameters</h3>
            <div className={style.parameterItem}>
              <div className={style.parameterHeader}>
                <span className={style.paramName}>user_id</span>
                <span className={style.paramType}>integer</span>
                <span className={style.paramRequired}>REQUIRED</span>
              </div>
              <p className={style.paramDescription}>
                Unique identifier of the user seeking recommendations.
              </p>
            </div>

            <div className={style.parameterItem}>
              <div className={style.parameterHeader}>
                <span className={style.paramName}>item_ids</span>
                <span className={style.paramType}>array[int]</span>
                <span className={style.paramRequired}>REQUIRED</span>
              </div>
              <p className={style.paramDescription}>
                List of recent items the user interacted with.
              </p>
            </div>

            <div className={style.parameterItem}>
              <div className={style.parameterHeader}>
                <span className={style.paramName}>top_k</span>
                <span className={style.paramType}>integer</span>
              </div>
              <p className={style.paramDescription}>
                Number of recommendations to return. Default is 10.
              </p>
            </div>
          </div>

          {/* Right Column: Code Blocks */}
          <div className={style.codeColumn}>
            {/* Request Body */}
            <div className={style.codePanel}>
              <div className={style.codePanelHeader}>
                <span>REQUEST BODY</span>
                <button
                  className={style.copyButton}
                  onClick={() => copyToClipboard(getRecommendationsRequestBody, 'getReq')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  {copiedId === 'getReq' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className={style.codePre}>
                <code>{getRecommendationsRequestBody}</code>
              </pre>
            </div>

            {/* Response */}
            <div className={style.codePanel}>
              <div className={style.codePanelHeader}>
                <span>RESPONSE</span>
                <div className={style.responseHeaderRight}>
                  <span className={style.statusBadge200}>200 OK</span>
                  <button
                    className={style.copyButton}
                    onClick={() => copyToClipboard(getRecommendationsResponse, 'getRes')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {copiedId === 'getRes' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <pre className={style.codePre}>
                <code>{getRecommendationsResponse}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Get Customer Recommendations */}
      <div className={style.card}>
        <div className={style.apiMethodHeader}>
          <span className={style.methodBadgePost}>POST</span>
          <span className={style.methodTitle}>Get Customer Recommendations</span>
        </div>
        <div className={style.endpointUrl}>http://host/recommend/customer</div>

        <div className={`${style.alert} ${style.alertInfo}`}>
          <div className={style.alertIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className={style.alertContent}>
            <p className={style.alertText}>
              Retrieves personalized recommendations for a specific customer, including their purchase history and new customer status.
            </p>
          </div>
        </div>

        <div className={style.twoColumnLayout}>
          {/* Left Column: Docs */}
          <div className={style.docsColumn}>
            <h3 className={style.columnSubTitle}>Request Headers</h3>
            <table className={style.headersTable}>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style.headerKey}>Authorization</td>
                  <td className={style.headerValue}>Token &lt;token&gt;</td>
                </tr>
              </tbody>
            </table>

            {/* Developer Tip */}
            <div className={`${style.alert} ${style.alertTip}`}>
              <div className={style.alertIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                </svg>
              </div>
              <div className={style.alertContent}>
                <h4 className={style.alertTitle}>Developer Tip</h4>
                <p className={style.alertText}>
                  This endpoint uses an advanced ML model that provides features like is_new_customer.
                </p>
              </div>
            </div>

            <h3 className={style.columnSubTitle}>Response Schema</h3>
            <table className={style.schemaTable}>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={style.fieldName}>history</td>
                  <td className={style.fieldType}>Array of integers</td>
                </tr>
                <tr>
                  <td className={style.fieldName}>is_new_customer</td>
                  <td className={style.fieldType}>Boolean</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column: Code Blocks */}
          <div className={style.codeColumn}>
            {/* Request Body */}
            <div className={style.codePanel}>
              <div className={style.codePanelHeader}>
                <span>REQUEST BODY</span>
                <button
                  className={style.copyButton}
                  onClick={() => copyToClipboard(getCustomerRequestBody, 'custReq')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  {copiedId === 'custReq' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className={style.codePre}>
                <code>{getCustomerRequestBody}</code>
              </pre>
            </div>

            {/* Response */}
            <div className={style.codePanel}>
              <div className={style.codePanelHeader}>
                <span>RESPONSE</span>
                <div className={style.responseHeaderRight}>
                  <span className={style.statusBadge200}>200 OK</span>
                  <button
                    className={style.copyButton}
                    onClick={() => copyToClipboard(getCustomerResponse, 'custRes')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {copiedId === 'custRes' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <pre className={style.codePre}>
                <code>{getCustomerResponse}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
