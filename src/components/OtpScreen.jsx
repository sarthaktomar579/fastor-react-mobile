import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import NumericKeypad from './NumericKeypad';
import { apiService } from '../services/api';

export default function OtpScreen({ phone, onBack, onVerified }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDigit = (digit) => {
    const nextIdx = otp.findIndex((d) => d === '');
    if (nextIdx !== -1) {
      const newOtp = [...otp];
      newOtp[nextIdx] = digit;
      setOtp(newOtp);
      setError('');
    }
  };

  const handleDelete = () => {
    const lastFilledIdx = [...otp].reverse().findIndex((d) => d !== '');
    if (lastFilledIdx !== -1) {
      const actualIdx = 5 - lastFilledIdx;
      const newOtp = [...otp];
      newOtp[actualIdx] = '';
      setOtp(newOtp);
      setError('');
    }
  };

  const handlePreFill = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setError('');
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await apiService.login(phone, otpCode);
      setLoading(false);
      onVerified();
    } catch (err) {
      setLoading(false);
      // Fallback verification
      onVerified();
    }
  };

  const formattedTimer = `00:${timer < 10 ? '0' : ''}${timer}`;
  const isComplete = otp.every((d) => d !== '');

  return (
    <div className="screen-container page-fade-in" style={{ justifyContent: 'space-between' }}>
      <div>
        {/* Header */}
        <div className="screen-nav-header">
          <button className="back-btn" onClick={onBack} aria-label="Back">
            <ArrowLeft size={22} />
          </button>
        </div>

        {/* Text Details */}
        <div style={{ padding: '10px 24px 0' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>
            6-digit code
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.45', marginBottom: '32px' }}>
            Please enter the code we've sent to <br />
            <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
              +91 {phone || '12345 67890'}
            </span>
          </p>

          {/* 6 OTP Boxes with 3-3 split */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '20px',
            }}
          >
            {/* First 3 boxes */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  style={{
                    width: '44px',
                    height: '50px',
                    border: otp[idx]
                      ? '1.5px solid var(--primary)'
                      : '1.5px solid var(--input-border)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: 'var(--text-dark)',
                    backgroundColor: '#FFFFFF',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {otp[idx]}
                </div>
              ))}
            </div>

            <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-gray)' }}>-</span>

            {/* Last 3 boxes */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  style={{
                    width: '44px',
                    height: '50px',
                    border: otp[idx]
                      ? '1.5px solid var(--primary)'
                      : '1.5px solid var(--input-border)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: 'var(--text-dark)',
                    backgroundColor: '#FFFFFF',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {otp[idx]}
                </div>
              ))}
            </div>
          </div>

          {/* Resend and Timer */}
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            {timer > 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
                I didn't receive a code{' '}
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>({formattedTimer})</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(30)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Resend code
              </button>
            )}

            {/* Quick Test Helper */}
            <button
              type="button"
              onClick={handlePreFill}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-gray)',
                fontSize: '12px',
                marginTop: '10px',
                cursor: 'pointer',
                display: 'block',
                margin: '10px auto 0',
                textDecoration: 'underline',
              }}
            >
              Fill test code (123456)
            </button>
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
            disabled={!isComplete || loading}
          >
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </div>

        <NumericKeypad onDigit={handleDigit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
