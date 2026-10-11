import React, { useState } from 'react';
import figmaDetailPizza from '../assets/figma_detail_pizza.png';

const PORTION_OPTIONS = [
  { id: 'p1', name: 'Personal (4 Slices)', price: 0.00 },
  { id: 'p2', name: 'Medium (8 Slices)', price: 3.00 },
  { id: 'p3', name: 'Familiar (10 Slices)', price: 5.50 },
  { id: 'p4', name: 'Jumbo (12 Slices)', price: 10.00 },
];

export default function ProductDetailScreen({ product, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(3);
  const [selectedPortion, setSelectedPortion] = useState('p1');
  const [added, setAdded] = useState(false);

  const basePrice = product?.price || 14.00;
  const portionExtra = PORTION_OPTIONS.find((p) => p.id === selectedPortion)?.price || 0;
  const totalPrice = ((basePrice + portionExtra) * quantity).toFixed(2);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onAddToCart?.({
        product,
        quantity,
        portion: PORTION_OPTIONS.find((p) => p.id === selectedPortion),
        totalPrice,
      });
      onBack();
    }, 600);
  };

  return (
    <div className="screen-container page-fade-in" style={{ backgroundColor: '#FFFFFF', paddingBottom: '90px' }}>
      {/* Top Hero Image with Curved Bottom (Figma Screen 4) */}
      <div style={{ position: 'relative', width: '100%', height: '280px' }}>
        <img
          src={product?.image || figmaDetailPizza}
          alt={product?.name || 'Food item'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderBottomLeftRadius: '32px',
            borderBottomRightRadius: '32px',
          }}
        />

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main Details Body */}
      <div style={{ padding: '20px 22px 0' }}>
        {/* Price & Quantity Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '26px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>
            ₹{basePrice.toFixed(2)}
          </span>

          {/* Stepper (- 3 +) matching Figma */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '18px',
              }}
            >
              -
            </button>

            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1E1F24', minWidth: '18px', textAlign: 'center' }}>
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '18px',
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <div style={{ marginTop: '16px' }}>
          <h1 style={{ fontSize: '19px', fontWeight: '700', color: '#1E1F24', marginBottom: '6px' }}>
            Lorem ipsum dolor sit amet
          </h1>
          <p style={{ fontSize: '12.5px', color: '#8F92A1', lineHeight: '1.5' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Portion Section matching Figma */}
        <div style={{ marginTop: '22px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1E1F24', marginBottom: '12px' }}>
            Personal portion
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PORTION_OPTIONS.map((portion, idx) => {
              const isSelected = selectedPortion === portion.id;
              return (
                <div
                  key={portion.id}
                  onClick={() => setSelectedPortion(portion.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: idx < PORTION_OPTIONS.length - 1 ? '1px dashed #E5E7EB' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '13.5px', color: '#1E1F24', fontWeight: isSelected ? '600' : '400' }}>
                    {portion.name}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '13px', color: '#8F92A1', fontWeight: '500' }}>
                      ${portion.price.toFixed(2)}
                    </span>

                    {/* Radio button matching Figma */}
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? '5px solid var(--primary)' : '1.5px solid #D1D5DB',
                        backgroundColor: '#FFFFFF',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Fixed Add to Cart Button matching Figma */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '14px 22px 18px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
        }}
      >
        <button
          className="btn-primary"
          onClick={handleAdd}
          style={{ backgroundColor: added ? '#10B981' : 'var(--primary)' }}
        >
          {added ? 'Added to Cart!' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
