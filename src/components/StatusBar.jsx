import React from 'react';

export default function StatusBar() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px 8px',
        userSelect: 'none',
        backgroundColor: 'transparent',
      }}
    >
      {/* Time */}
      <span
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          letterSpacing: '-0.3px',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        9:41
      </span>

      {/* Right Icons: Cellular Signal, WiFi, Battery matching Figma */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Cellular 4 Signal Bars */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="8" width="3" height="3" rx="0.8" fill="#000000" />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.8" fill="#000000" />
          <rect x="9" y="3" width="3" height="8" rx="0.8" fill="#000000" />
          <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.8" fill="#000000" />
        </svg>

        {/* WiFi Icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 11.5C8.82843 11.5 9.5 10.8284 9.5 10C9.5 9.17157 8.82843 8.5 8 8.5C7.17157 8.5 6.5 9.17157 6.5 10C6.5 10.8284 7.17157 11.5 8 11.5Z"
            fill="#000000"
          />
          <path
            d="M4.5 7.2C5.5 6.2 6.7 5.7 8 5.7C9.3 5.7 10.5 6.2 11.5 7.2"
            stroke="#000000"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M2 4.4C3.7 2.8 5.8 2 8 2C10.2 2 12.3 2.8 14 4.4"
            stroke="#000000"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        {/* Exact iOS Figma Battery Icon */}
        <svg width="24" height="12" viewBox="0 0 25 12" fill="none">
          {/* Outer capsule outline */}
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#000000" strokeWidth="1" />
          {/* Inner solid battery fill */}
          <rect x="2" y="2" width="18" height="8" rx="2" fill="#000000" />
          {/* Positive terminal cap on right */}
          <path
            d="M23 4C23.5523 4 24 4.44772 24 5V7C24 7.55228 23.5523 8 23 8V4Z"
            fill="#000000"
          />
        </svg>
      </div>
    </div>
  );
}
