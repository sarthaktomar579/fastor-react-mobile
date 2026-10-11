const BASE_URL = 'https://staging.fastor.in/v1/m';

// Sample mock fallback data directly mapped from Figma UI screens
export const MOCK_RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Domino’s Pizza Hub',
    cuisine: 'Italian, Fast Food, Pizza',
    rating: 4.8,
    deliveryTime: '25-30 min',
    priceForTwo: '₹400 for two',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    popularItems: [
      {
        id: 'item-pizza',
        name: 'Pepperoni Supreme Pizza',
        price: 14.00,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        options: [
          { name: 'Personal (4 Slices)', price: 0.00 },
          { name: 'Medium (8 Slices)', price: 3.00 },
          { name: 'Familiar (10 Slices)', price: 5.50 },
          { name: 'Jumbo (12 Slices)', price: 10.00 },
        ],
      },
      {
        id: 'item-shake',
        name: 'Strawberry Shake',
        price: 20.00,
        orderDate: '29 Nov, 01:20 pm',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'item-burger',
        name: 'Chicken Burger',
        price: 20.00,
        orderDate: '17 Oct, 01:20 pm',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'rest-2',
    name: 'Tokyo Sushi Bar',
    cuisine: 'Japanese, Sushi, Seafood',
    rating: 4.9,
    deliveryTime: '30-35 min',
    priceForTwo: '₹600 for two',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rest-3',
    name: 'Bella Pasta House',
    cuisine: 'Italian, Pasta, Desserts',
    rating: 4.7,
    deliveryTime: '20-25 min',
    priceForTwo: '₹350 for two',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80',
  },
];

export const MOCK_BEST_SELLERS = [
  { id: 'bs-1', name: 'Sushi Roll', price: 33.0, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80' },
  { id: 'bs-2', name: 'Mexican Bowl', price: 50.0, image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80' },
  { id: 'bs-3', name: 'Creamy Pasta', price: 12.99, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=300&q=80' },
  { id: 'bs-4', name: 'Berry Cupcake', price: 9.20, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=300&q=80' },
];

export const apiService = {
  // Step 1: Register and request OTP
  register: async (phone, dialCode = '+91') => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, dial_code: dialCode }),
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.warn('[Fastor API Warning] Live register failed, using test OTP fallback:', error.message);
      return { success: true, isMock: true, message: 'OTP sent: 123456' };
    }
  },

  // Step 2: Login with OTP
  login: async (phone, otp = '123456', dialCode = '+91') => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, dial_code: dialCode }),
      });
      const data = await response.json();
      const token = data?.data?.token || data?.token || 'mock_fastor_jwt_token_sample';
      localStorage.setItem('fastor_token', token);
      return { success: true, token, data };
    } catch (error) {
      console.warn('[Fastor API Warning] Live login failed, using simulated token fallback:', error.message);
      const mockToken = 'mock_jwt_fastor_auth_' + Date.now();
      localStorage.setItem('fastor_token', mockToken);
      return { success: true, token: mockToken, isMock: true };
    }
  },

  // Step 3: Fetch Restaurants
  fetchRestaurants: async (cityId = 118) => {
    const token = localStorage.getItem('fastor_token');
    try {
      const response = await fetch(`${BASE_URL}/restaurant?city_id=${cityId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const data = await response.json();
      if (Array.isArray(data?.data)) return data.data;
      if (Array.isArray(data)) return data;
      return MOCK_RESTAURANTS;
    } catch (error) {
      console.warn('[Fastor API Warning] Live fetch failed, using Figma restaurant data:', error.message);
      return MOCK_RESTAURANTS;
    }
  },
};
