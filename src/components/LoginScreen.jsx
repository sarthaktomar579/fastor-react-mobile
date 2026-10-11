import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
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
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await apiService.register(phone);
      setLoading(false);
      onOtpSent(phone);
    } catch (err) {
      setLoading(false);
      // Even if network fails, proceed with test OTP flow
      onOtpSent(phone);
    }
  };

  return (
    <div className="screen-container page-fade-in" style={{ justifyContent: 'space-between' }}>
      <div>
        {/* Navigation Header */}
        <div className="screen-nav-header">
          <button className="back-btn" aria-label="Back">
            <ArrowLeft size={22} />
          </button>
        </div>

        {/* Content Box */}
        <div style={{ padding: '10px 24px 0' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>
            Sign Up to Fastor
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.45', marginBottom: '32px' }}>
            Let us know your mobile number and we will send you an OTP for verification.
          </p>

          {/* Phone Number Input Field */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: error ? '1.5px solid #EF4444' : '1.5px solid var(--input-border)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              backgroundColor: 'var(--input-bg)',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)' }}>
              +91
            </span>
            <div style={{ width: '1px', height: '22px', backgroundColor: '#D1D5DB' }} />
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
                fontWeight: '500',
                color: 'var(--text-dark)',
                width: '100%',
                background: 'transparent',
                letterSpacing: '1px',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '8px', fontWeight: '500' }}>
              {error}
            </p>
          )}

          {/* Quick Demo Pre-fill */}
          <button
            type="button"
            onClick={() => setPhone('9876543210')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '10px',
              textDecoration: 'underline',
            }}
          >
            Auto-fill demo number (9876543210)
          </button>
        </div>
      </div>

      {/* Bottom Action & Keypad Section */}
      <div>
        <div style={{ padding: '0 24px 16px' }}>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={phone.length < 10 || loading}
          >
            {loading ? 'Sending OTP...' : 'Get OTP'}
          </button>

          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              color: 'var(--text-gray)',
              marginTop: '14px',
              lineHeight: '1.4',
            }}
          >
            By clicking, I accept the{' '}
            <span style={{ color: 'var(--text-dark)', fontWeight: '500', cursor: 'pointer' }}>
              Terms & Conditions
            </span>{' '}
            and{' '}
            <span style={{ color: 'var(--text-dark)', fontWeight: '500', cursor: 'pointer' }}>
              Privacy Policy
            </span>
          </p>
        </div>

        {/* Interactive Numeric Keypad */}
        <NumericKeypad onDigit={handleDigit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
