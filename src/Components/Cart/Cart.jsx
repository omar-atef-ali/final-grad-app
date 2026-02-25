import React, { useState } from 'react';
import style from "./Cart.module.css";

const initialItems = [
  {
    id: 1,
    name: 'Dashboard',
    description: 'Visualize your data with interactive dashboards',
    price: 39,
    duration: 3, // Default duration
    durationOptions: [1, 3, 6, 9],
    icon: 'bi-bar-chart-fill',
    iconColorClass: 'bg-purple-main'
  },
  {
    id: 2,
    name: 'AI Recommendation',
    description: 'Get AI-driven insights tailored to your business data and goals',
    price: 39,
    duration: 3, // Default duration
    durationOptions: [1, 3, 6, 9],
    icon: 'bi-graph-up-arrow',
    iconColorClass: 'bg-purple-main'
  }
];

const DurationSlider = ({ value, onChange, options }) => {
  // Map value (months) to index (0-4)
  const steps = options.length - 1;
  const currentIndex = options.indexOf(value);

  // Calculate percentage for thumb position
  const percentage = (currentIndex / steps) * 100;

  const handleChange = (e) => {
    const newIndex = parseInt(e.target.value, 10);
    onChange(options[newIndex]);
  };

  return (
    <div className={`${style['slider-container']} my-4 position-relative`} style={{ height: '40px' }}>
      {/* Visual Track */}
      <div
        className={`${style['slider-track']} w-100 rounded-pill`}
        style={{
          height: '8px',
          background: `linear-gradient(90deg, rgb(78, 48, 116) 0%, rgb(138, 69, 178) ${percentage}%, rgb(225, 223, 221) ${percentage}%, rgb(225, 223, 221) 100%)`,
          position: 'absolute',
          top: '10px'
        }}
      ></div>

      {/* Invisible Range Input for Interaction */}
      <input
        type="range"
        min="0"
        max={steps}
        step="1"
        value={currentIndex}
        onChange={handleChange}
        className={style['range-input']}
        aria-label="Commitment duration slider"
      />

      {/* Labels */}
      <div className={`${style['slider-labels']} d-flex justify-content-between w-100 position-absolute`} style={{ top: '24px', pointerEvents: 'none' }}>
        {options.map((option) => (
          <span
            key={option}
            className={`small ${value === option ? 'fw-bold text-dark' : 'text-muted'}`}
            style={{ fontSize: '12px', width: '20px', textAlign: 'center' }}
          >
            {option}
          </span>
        ))}
      </div>

      {/* Thumb (Visual Only) */}
      <div
        className={`${style['slider-thumb']} position-absolute ${style['bg-purple-main']} rounded-circle border border-white shadow-sm`}
        style={{
          width: '18px',
          height: '18px',
          top: '5px',
          left: `${percentage}%`,
          transform: 'translateX(-50%)',
          zIndex: 2,
          pointerEvents: 'none',
          transition: 'left 0.1s ease-out'
        }}
      ></div>

      {/* Dots (Visual Only) */}
      {options.map((option, index) => {
        const dotPercentage = (index / steps) * 100;
        const isActive = index <= currentIndex;
        return (
          <div
            key={index}
            className={`${style['slider-dot']} position-absolute rounded-circle`}
            style={{
              width: '8px',
              height: '8px',
              top: '10px',
              left: `${dotPercentage}%`,
              transform: 'translateX(-50%)',
              backgroundColor: isActive ? 'var(--purple-dark)' : 'rgb(225, 223, 221)',
              transition: 'background-color 0.1s ease-out'
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default function Cart() {
  const [items, setItems] = useState(initialItems);

  const handleDurationChange = (id, newDuration) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, duration: newDuration } : item
    ));
  };

  const calculateItemCost = (item) => {
    const subtotal = item.price * item.duration;
    // Discount: 15% if 3 months or more
    const discountRate = item.duration >= 3 ? 0.15 : 0;
    const discountAmount = subtotal * discountRate;
    const total = subtotal - discountAmount;

    return {
      subtotal,
      discountAmount,
      total,
      hasDiscount: item.duration >= 3
    };
  };

  // Calculate Summary Totals
  const summary = items.reduce((acc, item) => {
    const costs = calculateItemCost(item);
    return {
      subtotal: acc.subtotal + costs.subtotal,
      discount: acc.discount + costs.discountAmount,
      total: acc.total + costs.total
    };
  }, { subtotal: 0, discount: 0, total: 0 });

  return (
    <>
      <main className={style['main-content']}>
        <div className={`${style['container-custom']} py-4`}>
          {/* <!-- Content Wrapper --> */}
          <div className=" p-4 rounded-4">
            {/* <!-- Header --> */}
            <div className={`${style['page-header']} d-flex align-items-center mb-4 p-3 ${style['bg-light-gray']}`}>
              <button className="btn btn-back border-0 bg-transparent text-muted ">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div>
                <h1 className="h4 mb-1 fw-bold">Cart</h1>
                <p className="text-muted mb-0 small" style={{ fontFamily: "'Arimo', sans-serif" }}>Customize your features to optimize your costs</p>
              </div>
            </div>

            <div className="row g-4">
              {/* <!-- Left Column: Items --> */}
              <div className="col-lg-8">
                {items.map((item) => {
                  const costs = calculateItemCost(item);
                  return (
                    <div key={item.id} className={`card ${style['item-card']} mb-4 border-0 shadow-sm rounded-4`}>
                      <div className="card-body p-4">
                        {/* <!-- Header --> */}
                        <div className="d-flex justify-content-between align-items-start mb-4">
                          <div className="d-flex gap-3">
                            <div className={`${style['item-icon-box']} ${style[item.iconColorClass]} rounded-2 d-flex align-items-center justify-content-center`} style={{ width: '48px', height: '48px' }}>
                              <i className={`bi ${item.icon} text-white fs-5`}></i>
                            </div>
                            <div>
                              <h5 className="fw-bold mb-1 fs-6">{item.name}</h5>
                              <p className="text-muted mb-0 small">{item.description}</p>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-icon text-muted"><i className="fa-regular fa-heart"></i></button>
                            <button className="btn btn-sm btn-icon text-muted"><i className="fa-solid fa-x"></i></button>
                          </div>
                        </div>

                        {/* <!-- Cost Estimate Section --> */}
                        <div className="cost-section">
                          <h6 className="fw-bold mb-3 small">Cost Estimate</h6>

                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="fw-bold small">Commitment duration</label>
                            <div className="input-group input-group-sm w-auto border rounded-2 p-1">
                              <input type="text" className="form-control border-0 text-center p-0 fw-normal" value={item.duration} readOnly style={{ width: '20px', height: '20px', fontSize: '14px' }} />
                              <span className="input-group-text bg-transparent border-0 p-0 ms-1 text-muted small">months</span>
                            </div>
                          </div>

                          {/* <!-- Slider --> */}
                          <DurationSlider
                            value={item.duration}
                            onChange={(val) => handleDurationChange(item.id, val)}
                            options={item.durationOptions}
                          />

                          {/* <!-- Savings Badge --> */}
                          {costs.hasDiscount && (
                            <div className="d-flex align-items-center gap-2 mb-4">
                              <div className={`${style['badge-savings']} d-flex align-items-center ${style['bg-green-light']} ${style['text-green']} fw-normal px-2 py-1 rounded-1`} style={{ fontSize: '12px', border: '1px solid #107c10' }}>
                                <i className="bi bi-check2 me-1"></i>
                                Save 15% with 3+ month commitment
                              </div>
                            </div>
                          )}

                          {/* <!-- Breakdown --> */}
                          <div className="breakdown-table">
                            <div className="d-flex justify-content-between mb-2 small">
                              <span className="text-muted">Subtotal per month</span>
                              <span className="text-dark fw-normal">${item.price.toFixed(2)}/month</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 small">
                              <span className="text-muted">Duration</span>
                              <span className="text-dark fw-normal">{item.duration} months</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 small">
                              <span className="text-muted">Subtotal before discount</span>
                              <span className="text-dark fw-normal">${costs.subtotal.toFixed(2)}</span>
                            </div>
                            {costs.hasDiscount && (
                              <div className="d-flex justify-content-between mb-3 small">
                                <span className={style['text-green']}>Commitment discount (15%)</span>
                                <span className={style['text-green']}>-${costs.discountAmount.toFixed(2)}</span>
                              </div>
                            )}

                            <hr className={`${style.divider} mb-3`} />

                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-bold text-dark small">Item total</span>
                              <span className={`fw-bold ${style['text-purple']} fs-5`}>${costs.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <!-- Right Column: Summary --> */}
              <div className="col-lg-4">
                <div className={`card ${style['summary-card']} border-0 shadow-sm rounded-4`}>
                  {/* <!-- Header --> */}
                  <div className={`card-header ${style['bg-light-gray']} border-bottom p-4 rounded-top-4`}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clipboard-data text-muted"></i>
                      <h6 className={`fw-bold mb-0 ${style['text-sm']}`}>Total Estimate</h6>
                    </div>
                  </div>
                  <div className="card-body p-4 bg-white rounded-bottom-4">
                    {/* <!-- Items List --> */}
                    {items.map((item) => {
                      const costs = calculateItemCost(item);
                      return (
                        <div key={item.id} className="summary-item mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span className={`text-muted ${style['text-sm']}`} style={{ fontFamily: "'Arimo', sans-serif" }}>{item.name}</span>
                            <span className={`fw-bold ${style['text-sm']}`}>${costs.total.toFixed(2)}</span>
                          </div>
                          <div className="text-muted" style={{ fontSize: '12px' }}>
                            ${item.price}/mo × {item.duration} months {costs.hasDiscount ? '(15% off)' : ''}
                          </div>
                        </div>
                      );
                    })}

                    <hr className={`${style.divider} my-4`} />

                    {/* <!-- Totals --> */}
                    <div className="d-flex justify-content-between mb-2">
                      <span className={`text-muted ${style['text-sm']}`}>Subtotal</span>
                      <span className={`fw-bold ${style['text-sm']}`}>${summary.subtotal.toFixed(2)}</span>
                    </div>
                    {summary.discount > 0 && (
                      <div className="d-flex justify-content-between mb-4">
                        <span className={`${style['text-green']} ${style['text-sm']}`}>Commitment savings</span>
                        <span className={`fw-bold ${style['text-green']} ${style['text-sm']}`}>-${summary.discount.toFixed(2)}</span>
                      </div>
                    )}

                    <hr className={`${style.divider} my-4`} />

                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <span className={`fw-bold text-dark ${style['text-sm']}`}>Total</span>
                      <div className="text-end">
                        <div className={`${style['text-purple']} fs-4 fw-bold mb-0`}>${summary.total.toFixed(2)}</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>Total for commitment period</div>
                      </div>
                    </div>

                    <button className={`btn ${style['btn-gradient']} w-100 text-white mb-2 d-flex justify-content-center align-items-center gap-2 p-2 rounded-2`}>
                      Proceed to payment <i className="bi bi-arrow-right"></i>
                    </button>
                    <button className={`btn ${style['btn-outline-custom']} w-100 p-2 rounded-2 text-dark border`}>Add more features</button>

                    <div className="mt-4 pt-3 border-top">
                      <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Final pricing subject to terms. Annual prepayment may be required for certain commitments.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Content Wrapper --> */}
          </div>
        </div>
      </main>
    </>
  );
}
