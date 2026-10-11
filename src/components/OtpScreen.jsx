import React, { useState, useEffect, useCallback } from 'react';
import NumericKeypad from './NumericKeypad';
import { apiService } from '../services/api';

export default function OtpScreen({ phone, onBack, onVerified }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Countdown timer for code resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDigit = useCallback((digit) => {
    setOtp((prev) => {
      // If all 6 were filled (e.g. after an error), start over with the new digit
      const allFilled = prev.every((d) => d !== '');
      if (allFilled) {
        setError('');
        return [digit, '', '', '', '', ''];
      }

      const nextIdx = prev.findIndex((d) => d === '');
      if (nextIdx !== -1) {
        const next = [...prev];
        next[nextIdx] = digit;
        setError('');
        return next;
      }
      return prev;
    });
  }, []);

  const handleDelete = useCallback(() => {
    setOtp((prev) => {
      const lastFilledIdx = [...prev].reverse().findIndex((d) => d !== '');
      if (lastFilledIdx !== -1) {
        const actualIdx = 5 - lastFilledIdx;
        const next = [...prev];
        next[actualIdx] = '';
        setError('');
        return next;
      }
      return prev;
    });
  }, []);

  // Listen to physical keyboard events (0-9, Backspace)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleVerify();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDelete]);

  const handleVerify = async () => {
    const otpCode = otp.join('');

    if (otpCode.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    if (otpCode !== '123456') {
      setError('Invalid OTP code. Please enter Fastor test OTP: 123456');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiService.login(phone, otpCode);
      setLoading(false);
      onVerified();
    } catch {
      setLoading(false);
      onVerified();
    }
  };

  const formattedTimer = `(00:${timer < 10 ? '0' : ''}${timer})`;

  return (
    <div className="screen-container page-fade-in" style={{ justifyContent: 'space-between' }}>
      <div>
        {/* Back Arrow */}
        <div style={{ padding: '8px 20px 4px' }}>
          <button className="figma-back-btn" onClick={onBack} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Header Text */}
        <div style={{ padding: '8px 24px 0' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1E1F24', marginBottom: '8px', letterSpacing: '-0.3px' }}>
            6-digit code
          </h1>
          <p style={{ fontSize: '14px', color: '#8F92A1', lineHeight: '1.45', marginBottom: '36px' }}>
            Please enter the code we've sent to <br />
            <span style={{ fontWeight: '600', color: '#1E1F24' }}>
              +91 {phone || '12345 67890'}
            </span>
          </p>

          {/* 6 OTP Boxes with 3-3 split matching Figma */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginBottom: '20px',
            }}
          >
            {/* First 3 boxes */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {[0, 1, 2].map((idx) => {
                const isActive = otp[idx] === '' && (idx === 0 || otp[idx - 1] !== '');
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      // Clicking a box clears it and subsequent boxes
                      const next = [...otp];
                      for (let i = idx; i < 6; i++) next[i] = '';
                      setOtp(next);
                      setError('');
                    }}
                    style={{
                      width: '42px',
                      height: '46px',
                      border: error
                        ? '1.5px solid #EF4444'
                        : isActive
                        ? '1.5px solid var(--primary)'
                        : otp[idx]
                        ? '1.5px solid #D1D5DB'
                        : '1.5px solid #E5E7EB',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#1E1F24',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    {otp[idx] || (isActive ? <span style={{ color: 'var(--primary)', fontWeight: '300' }}>|</span> : '')}
                  </div>
                );
              })}
            </div>

            {/* Dash separator */}
            <span style={{ fontSize: '18px', fontWeight: '500', color: '#D1D5DB', margin: '0 4px' }}>
              -
            </span>

            {/* Last 3 boxes */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {[3, 4, 5].map((idx) => {
                const isActive = otp[idx] === '' && otp[idx - 1] !== '';
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      const next = [...otp];
                      for (let i = idx; i < 6; i++) next[i] = '';
                      setOtp(next);
                      setError('');
                    }}
                    style={{
                      width: '42px',
                      height: '46px',
                      border: error
                        ? '1.5px solid #EF4444'
                        : isActive
                        ? '1.5px solid var(--primary)'
                        : otp[idx]
                        ? '1.5px solid #D1D5DB'
                        : '1.5px solid #E5E7EB',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#1E1F24',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    {otp[idx] || (isActive ? <span style={{ color: 'var(--primary)', fontWeight: '300' }}>|</span> : '')}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resend Prompt with Orange Timer */}
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <p style={{ fontSize: '13px', color: '#8F92A1' }}>
              I didn't receive a code{' '}
              {timer > 0 ? (
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{formattedTimer}</span>
              ) : (
                <span
                  onClick={() => setTimer(30)}
                  style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}
                >
                  (Resend)
                </span>
              )}
            </p>
          </div>

          {error && (
            <p style={{ color: '#EF4444', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Bottom CTA and Keypad */}
      <div>
        <div style={{ padding: '0 24px 16px' }}>
          <button
            className="btn-primary"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </div>

        <NumericKeypad onDigit={handleDigit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
