import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, Check } from 'lucide-react';

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
    }, 700);
  };

  return (
    <div className="screen-container page-fade-in" style={{ backgroundColor: '#FFFFFF', paddingBottom: '90px' }}>
      {/* Top Hero Food Image with Rounded Bottom */}
      <div style={{ position: 'relative', width: '100%', height: '270px' }}>
        <img
          src={product?.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'}
          alt={product?.name || 'Food item'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderBottomLeftRadius: '32px',
            borderBottomRightRadius: '32px',
          }}
        />

        {/* Floating Back Button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
          aria-label="Back"
        >
          <ArrowLeft size={20} color="var(--primary)" />
        </button>
      </div>

      {/* Main Details */}
      <div style={{ padding: '22px 24px 0' }}>
        {/* Price and Quantity Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '26px', fontWeight: '800', color: 'var(--primary)' }}>
            ₹{basePrice.toFixed(2)}
          </span>

          {/* Stepper (- [3] +) matching Figma */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                boxShadow: '0 2px 8px var(--primary-glow)',
              }}
            >
              <Minus size={16} />
            </button>

            <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)', minWidth: '16px', textAlign: 'center' }}>
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
                boxShadow: '0 2px 8px var(--primary-glow)',
              }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Title & Description matching Figma */}
        <div style={{ marginTop: '16px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>
            {product?.name || 'Lorem ipsum dolor sit amet'}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-gray)', lineHeight: '1.5' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Portion Customization Section matching Figma */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '14px' }}>
            Personal portion
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PORTION_OPTIONS.map((portion) => {
              const isSelected = selectedPortion === portion.id;
              return (
                <div
                  key={portion.id}
                  onClick={() => setSelectedPortion(portion.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: isSelected ? '1.5px solid var(--primary)' : '1px solid #E5E7EB',
                    backgroundColor: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: isSelected ? '600' : '500', color: 'var(--text-dark)' }}>
                    {portion.name}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: isSelected ? 'var(--primary)' : 'var(--text-gray)' }}>
                      ${portion.price.toFixed(2)}
                    </span>

                    {/* Radio Indicator */}
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? '5px solid var(--primary)' : '2px solid #D1D5DB',
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA: Add to cart matching Figma */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '14px 24px 20px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)',
        }}
      >
        <button
          className="btn-primary"
          onClick={handleAdd}
          style={{ backgroundColor: added ? '#10B981' : 'var(--primary)' }}
        >
          {added ? (
            <>
              <Check size={18} /> Added to Cart!
            </>
          ) : (
            `Add to cart • ₹${totalPrice}`
          )}
        </button>
      </div>
    </div>
  );
}
