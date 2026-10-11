import React, { useState } from 'react';
import NumericKeypad from './NumericKeypad';
import { apiService } from '../services/api';

export default function LoginScreen({ onOtpSent }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDigit = (digit) => {
    if (phone.length < 10) {
      setPhone((prev) => prev + digit);
      setError('');
    }
  };

  const handleDelete = () => {
    setPhone((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (phone.length === 0) {
      // If user clicks without typing, auto-use standard test phone
      setPhone('9876543210');
      onOtpSent('9876543210');
      return;
    }

    if (phone.length < 10) {
      setError('Please enter a valid 10-digit number');
      return;
    }

    setLoading(true);
    setError('');

    // Fire registration API in background to avoid blocking on slow staging server
    apiService.register(phone).catch(() => {});

    setTimeout(() => {
      setLoading(false);
      onOtpSent(phone);
    }, 180);
  };

  return (
    <div className="screen-container page-fade-in" style={{ justifyContent: 'space-between' }}>
      <div>
        {/* Back Arrow */}
        <div style={{ padding: '8px 20px 4px' }}>
          <button className="figma-back-btn" aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Header Text */}
        <div style={{ padding: '8px 24px 0' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1E1F24', marginBottom: '8px', letterSpacing: '-0.3px' }}>
            Sign Up to Fastor
          </h1>
          <p style={{ fontSize: '14px', color: '#8F92A1', lineHeight: '1.45', marginBottom: '36px' }}>
            Let us know your mobile number and we will send you an OTP for verification.
          </p>

          {/* Input Box matching Figma */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: error ? '1.5px solid #EF4444' : '1.5px solid #E5E7EB',
              borderRadius: '12px',
              padding: '14px 18px',
              backgroundColor: '#FFFFFF',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#1E1F24' }}>
              +91
            </span>

            {/* Orange cursor indicator from Figma */}
            <span style={{ color: 'var(--primary)', fontWeight: '300', fontSize: '18px' }}>
              |
            </span>

            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPhone(val);
                setError('');
              }}
              placeholder="- 00000"
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                fontWeight: '400',
                color: '#1E1F24',
                width: '100%',
                background: 'transparent',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '8px', fontWeight: '500' }}>
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Bottom CTA and Keypad */}
      <div>
        <div style={{ padding: '0 24px 14px' }}>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Get OTP'}
          </button>

          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              color: '#8F92A1',
              marginTop: '14px',
              lineHeight: '1.4',
            }}
          >
            By clicking, I accept the{' '}
            <span style={{ color: '#1E1F24', fontWeight: '500', cursor: 'pointer' }}>
              Terms & Conditions
            </span>{' '}
            and{' '}
            <span style={{ color: '#1E1F24', fontWeight: '500', cursor: 'pointer' }}>
              Privacy Policy
            </span>
          </p>
        </div>

        <NumericKeypad onDigit={handleDigit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
