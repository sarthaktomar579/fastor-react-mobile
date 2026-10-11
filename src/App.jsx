import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import LoginScreen from './components/LoginScreen';
import OtpScreen from './components/OtpScreen';
import HomeScreen from './components/HomeScreen';
import ProductDetailScreen from './components/ProductDetailScreen';

export default function App() {
  const [screen, setScreen] = useState('login'); // 'login' | 'otp' | 'home' | 'detail'
  const [phone, setPhone] = useState('9876543210');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const handleOtpSent = (phoneNumber) => {
    setPhone(phoneNumber);
    setScreen('otp');
  };

  const handleVerified = () => {
    setScreen('home');
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setScreen('detail');
  };

  const handleAddToCart = (item) => {
    setCartCount((c) => c + item.quantity);
  };

  const handleLogout = () => {
    localStorage.removeItem('fastor_token');
    setScreen('login');
  };

  return (
    <div className="app-viewport">
      {/* iOS Top Status Bar (Matching Figma 9:41, Signal, WiFi, Battery) */}
      <StatusBar />

      {/* Dynamic Screen View */}
      {screen === 'login' && <LoginScreen onOtpSent={handleOtpSent} />}

      {screen === 'otp' && (
        <OtpScreen
          phone={phone}
          onBack={() => setScreen('login')}
          onVerified={handleVerified}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          onSelectProduct={handleSelectProduct}
          onLogout={handleLogout}
        />
      )}

      {screen === 'detail' && (
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setScreen('home')}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* iOS Bottom Safe Area Indicator */}
      <div className="bottom-safe-indicator" />
    </div>
  );
}
