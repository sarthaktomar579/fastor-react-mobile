import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Wallet } from 'lucide-react';
import { apiService, MOCK_BEST_SELLERS } from '../services/api';

import figmaDetailPizza from '../assets/figma_detail_pizza.png';
import shakeImg from '../assets/shake.jpg';
import burgerImg from '../assets/figma_item_alt.png';
import figmaBanner from '../assets/figma_banner.png';

export default function HomeScreen({ onSelectProduct }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const data = await apiService.fetchRestaurants(118);
      setRestaurants(data);
    };
    loadData();
  }, []);

  return (
    <div className="screen-container page-fade-in" style={{ paddingBottom: '24px' }}>
      {/* Top Location Bar matching Figma */}
      <div style={{ padding: '8px 18px 8px' }}>
        <div>
          <span style={{ fontSize: '10px', color: '#8F92A1', fontWeight: '500', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
            Current Locations
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginTop: '1px' }}>
            <span style={{ fontSize: '14.5px', fontWeight: '700', color: '#1E1F24' }}>
              Model Town, New Delhi
            </span>
            <ChevronDown size={15} color="#1E1F24" />
          </div>
        </div>

        {/* Search Row matching Figma Screen 3 */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: '#F3F4F6',
              borderRadius: '12px',
              padding: '11px 14px',
            }}
          >
            <input
              type="text"
              placeholder="Karan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13.5px',
                color: '#1E1F24',
                width: '100%',
              }}
            />
          </div>

          {/* Coral Action Button */}
          <div
            style={{
              width: '42px',
              height: '42px',
              backgroundColor: '#FF6442',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Sparkles size={18} color="#FFFFFF" />
          </div>

          {/* Blue Wallet Action Button */}
          <div
            style={{
              width: '42px',
              height: '42px',
              backgroundColor: '#4E7FFF',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Wallet size={18} color="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Best Seller Section matching Figma */}
      <div style={{ marginTop: '10px' }}>
        <div style={{ padding: '0 18px', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '16.5px', fontWeight: '700', color: '#1E1F24' }}>
            Best Seller
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            padding: '2px 18px',
            scrollbarWidth: 'none',
          }}
        >
          {MOCK_BEST_SELLERS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              style={{
                flex: '0 0 78px',
                height: '104px',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                cursor: 'pointer',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '5px',
                  left: '5px',
                  right: '5px',
                  backgroundColor: '#F05A22',
                  color: '#FFFFFF',
                  padding: '2px 4px',
                  borderRadius: '6px',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  textAlign: 'center',
                }}
              >
                ₹{item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30% OFF Special Dish Banner matching Figma exactly */}
      <div style={{ padding: '0 18px', marginTop: '16px' }}>
        <div
          onClick={() =>
            onSelectProduct({
              name: 'Pepperoni Supreme Pizza',
              price: 14.0,
              image: figmaDetailPizza,
            })
          }
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(230, 81, 0, 0.22)',
            transition: 'transform 0.15s ease',
          }}
        >
          <img
            src={figmaBanner}
            alt="30% OFF Special Dish"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* 4 Pagination dots from Figma */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '8px' }}>
          <div style={{ width: '16px', height: '4px', backgroundColor: '#F05A22', borderRadius: '3px' }} />
          <div style={{ width: '5px', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '3px' }} />
          <div style={{ width: '5px', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '3px' }} />
          <div style={{ width: '5px', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '3px' }} />
        </div>
      </div>

      {/* Popular Items Section matching Figma */}
      <div style={{ padding: '0 18px', marginTop: '18px' }}>
        <h2 style={{ fontSize: '16.5px', fontWeight: '700', color: '#1E1F24', marginBottom: '12px' }}>
          Popular Items
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Item 1: Strawberry Shake */}
          <div
            onClick={() =>
              onSelectProduct({
                name: 'Strawberry Shake',
                price: 20.0,
                image: shakeImg,
              })
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '10px 12px',
              gap: '12px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              cursor: 'pointer',
            }}
          >
            <img
              src={shakeImg}
              alt="Strawberry Shake"
              style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1E1F24' }}>
                  Strawberry Shake
                </h4>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#F05A22' }}>
                  ₹20.00
                </span>
              </div>
              <p style={{ fontSize: '10.5px', color: '#8F92A1', marginTop: '2px' }}>
                29 Nov, 01:20 pm • <span style={{ fontWeight: '600' }}>2 Items</span>
              </p>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); alert('Order Cancelled'); }}
                  style={{
                    backgroundColor: '#F05A22',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel Order
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); alert('Driver on the way'); }}
                  style={{
                    backgroundColor: '#FDEEE9',
                    color: '#F05A22',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Track Driver
                </button>
              </div>
            </div>
          </div>

          {/* Item 2: Chicken Burger */}
          <div
            onClick={() =>
              onSelectProduct({
                name: 'Chicken Burger',
                price: 20.0,
                image: burgerImg,
              })
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '10px 12px',
              gap: '12px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              cursor: 'pointer',
            }}
          >
            <img
              src={burgerImg}
              alt="Chicken Burger"
              style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1E1F24' }}>
                  Chicken Burger
                </h4>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#F05A22' }}>
                  ₹20.00
                </span>
              </div>
              <p style={{ fontSize: '10.5px', color: '#8F92A1', marginTop: '2px' }}>
                17 Oct, 01:20 pm • <span style={{ fontWeight: '600' }}>1 Item</span>
              </p>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); alert('Order Cancelled'); }}
                  style={{
                    backgroundColor: '#F05A22',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel Order
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); alert('Driver arriving'); }}
                  style={{
                    backgroundColor: '#FDEEE9',
                    color: '#F05A22',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10.5px',
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
