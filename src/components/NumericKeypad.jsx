import React from 'react';
import { Delete } from 'lucide-react';

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
            >
              <Delete size={20} color="#1E1F24" />
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
            <span>{item.num}</span>
            {item.letters && <span className="keypad-letters">{item.letters}</span>}
          </button>
        );
      })}
    </div>
  );
}
