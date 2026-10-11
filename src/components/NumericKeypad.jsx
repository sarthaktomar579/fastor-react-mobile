import React from 'react';

const KEY_DATA = [
  { num: '1', letters: '' },
  { num: '2', letters: 'ABC' },
  { num: '3', letters: 'DEF' },
  { num: '4', letters: 'GHI' },
  { num: '5', letters: 'JKL' },
  { num: '6', letters: 'MNO' },
  { num: '7', letters: 'PQRS' },
  { num: '8', letters: 'TUV' },
  { num: '9', letters: 'WXYZ' },
  { num: '', letters: '' },
  { num: '0', letters: '' },
  { num: 'backspace', letters: '' },
];

export default function NumericKeypad({ onDigit, onDelete }) {
  return (
    <div className="numeric-keypad">
      {KEY_DATA.map((item, idx) => {
        if (item.num === 'backspace') {
          return (
            <button
              key="backspace"
              type="button"
              className="keypad-key"
              onClick={onDelete}
              aria-label="Delete"
              style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              <svg width="22" height="18" viewBox="0 0 24 18" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2H7.5L1 9L7.5 16H21C21.5523 16 22 15.5523 22 15V3C22 2.44772 21.5523 2 21 2Z" />
                <line x1="12" y1="6" x2="17" y2="12" />
                <line x1="17" y1="6" x2="12" y2="12" />
              </svg>
            </button>
          );
        }

        if (item.num === '') {
          return <div key={`empty-${idx}`} />;
        }

        return (
          <button
            key={item.num}
            type="button"
            className="keypad-key"
            onClick={() => onDigit(item.num)}
          >
            <span style={{ fontSize: '22px', fontWeight: '400', lineHeight: '1.1' }}>{item.num}</span>
            {item.letters && <span className="keypad-letters">{item.letters}</span>}
          </button>
        );
      })}
    </div>
  );
}
