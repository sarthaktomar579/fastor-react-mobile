import React, { useState, useEffect } from 'react';
import { MapPin, Search, ChevronDown, Sparkles, Wallet, Flame, ArrowRight } from 'lucide-react';
import { apiService, MOCK_BEST_SELLERS, MOCK_RESTAURANTS } from '../services/api';

export default function HomeScreen({ onSelectProduct, onLogout }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await apiService.fetchRestaurants(118);
      setRestaurants(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="screen-container page-fade-in" style={{ paddingBottom: '30px' }}>
      {/* Top Location & Header Bar */}
      <div style={{ padding: '16px 20px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Current Locations
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginTop: '2px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)' }}>
                Model Town, New Delhi
              </span>
              <ChevronDown size={16} color="var(--text-dark)" />
            </div>
          </div>

          {/* Quick Logout / Switch account */}
          <button
            onClick={onLogout}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              color: 'var(--text-gray)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Switch Account
          </button>
        </div>

        {/* Search Bar & Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', alignItems: 'center' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F3F4F6',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              gap: '8px',
            }}
          >
            <Search size={18} color="#9CA3AF" />
            <input
              type="text"
              placeholder="Karan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '14px',
                color: 'var(--text-dark)',
                width: '100%',
              }}
            />
          </div>

          {/* Reddish/Orange Action Square */}
          <div
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#FF6B4A',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(255, 107, 74, 0.3)',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={20} color="#FFFFFF" />
          </div>

          {/* Blue Action Square */}
          <div
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#4B7BFF',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(75, 123, 255, 0.3)',
              cursor: 'pointer',
            }}
          >
            <Wallet size={20} color="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Best Seller Horizontal Carousel */}
      <div style={{ marginTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)' }}>
            Best Seller
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            padding: '4px 20px',
            scrollbarWidth: 'none',
          }}
        >
          {MOCK_BEST_SELLERS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              style={{
                flex: '0 0 88px',
                height: '115px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '6px',
                  right: '6px',
                  backgroundColor: 'rgba(240, 90, 34, 0.95)',
                  color: '#FFFFFF',
                  padding: '3px 6px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textAlign: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                ₹{item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30% OFF Special Dish Banner (From Figma) */}
      <div style={{ padding: '0 20px', marginTop: '22px' }}>
        <div
          onClick={() =>
            onSelectProduct({
              name: 'Pepperoni Supreme Pizza',
              price: 14.0,
              image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
            })
          }
          style={{
            background: 'linear-gradient(135deg, #E65100 0%, #BF360C 100%)',
            borderRadius: '24px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 10px 24px rgba(230, 81, 0, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ zIndex: 2, maxWidth: '58%' }}>
            <p style={{ fontSize: '13px', fontWeight: '500', opacity: 0.9, lineHeight: '1.3' }}>
              Experience our delicious new dish
            </p>
            <h3 style={{ fontSize: '26px', fontWeight: '800', margin: '6px 0 10px', letterSpacing: '-0.5px' }}>
              30% OFF
            </h3>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: '700',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                padding: '4px 10px',
                borderRadius: '12px',
              }}
            >
              Order Now <ArrowRight size={12} />
            </div>
          </div>

          <div style={{ zIndex: 2, width: '110px', height: '110px', position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
              alt="Promo Pizza"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 8px 18px rgba(0, 0, 0, 0.25)',
                border: '3px solid rgba(255, 255, 255, 0.8)',
              }}
            />
          </div>
        </div>

        {/* Carousel Pagination dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
          <div style={{ width: '18px', height: '5px', backgroundColor: 'var(--primary)', borderRadius: '4px' }} />
          <div style={{ width: '6px', height: '5px', backgroundColor: '#D1D5DB', borderRadius: '4px' }} />
          <div style={{ width: '6px', height: '5px', backgroundColor: '#D1D5DB', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Popular Items Section (From Figma) */}
      <div style={{ padding: '0 20px', marginTop: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '14px' }}>
          Popular Items
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Card 1: Strawberry Shake */}
          <div
            onClick={() =>
              onSelectProduct({
                name: 'Strawberry Shake',
                price: 20.0,
                image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
              })
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '12px',
              gap: '14px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid #F3F4F6',
              cursor: 'pointer',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=200&q=80"
              alt="Strawberry Shake"
              style={{ width: '74px', height: '74px', borderRadius: '14px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)' }}>
                  Strawberry Shake
                </h4>
                <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)' }}>
                  ₹20.00
                </span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '2px' }}>
                29 Nov, 01:20 pm • <span style={{ fontWeight: '600' }}>2 Items</span>
              </p>

              {/* Action Pills from Figma */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Order cancelled');
                  }}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel Order
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Tracking driver status: On the way (10 mins away)');
                  }}
                  style={{
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Track Driver
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Chicken Burger */}
          <div
            onClick={() =>
              onSelectProduct({
                name: 'Chicken Burger',
                price: 20.0,
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
              })
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '12px',
              gap: '14px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid #F3F4F6',
              cursor: 'pointer',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80"
              alt="Chicken Burger"
              style={{ width: '74px', height: '74px', borderRadius: '14px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-dark)' }}>
                  Chicken Burger
                </h4>
                <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)' }}>
                  ₹20.00
                </span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '2px' }}>
                17 Oct, 01:20 pm • <span style={{ fontWeight: '600' }}>1 Item</span>
              </p>

              {/* Action Pills */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Order cancelled');
                  }}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel Order
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Tracking driver status: Driver arrived at location');
                  }}
                  style={{
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Track Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
