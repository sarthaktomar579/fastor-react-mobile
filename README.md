# Fastor - Mobile Food Ordering React Application

A pixel-perfect, mobile-first food ordering application developed in **React 19** and **Vite**, precisely matching the official Figma design specifications (`Mobile-App-Design-Task`) and integrating Fastor's staging REST APIs.

Developed by **Sarthak Singh Tomar** for the Fastor React Developer Technical Assessment.

---

## 🎨 Screens Implemented (Figma Exact Match)

1. **Screen 1 — Sign Up to Fastor:**
   - Dial code selector (`+91`) and mobile number input.
   - Interactive iOS numeric keypad with letter sub-labels (`ABC`, `DEF`...).
   - One-click demo number auto-fill (`9876543210`).
   - "Get OTP" primary orange CTA triggering `POST https://staging.fastor.in/v1/m/register`.

2. **Screen 2 — 6-Digit Code (OTP Verification):**
   - 6 individual PIN verification boxes with $3-3$ dash separation (`[ ] [ ] [ ] - [ ] [ ] [ ]`).
   - Active countdown timer for code resend (`00:30`).
   - Pre-fill test code button (`123456`).
   - Calls `POST https://staging.fastor.in/v1/m/login` and stores JWT token in `localStorage`.

3. **Screen 3 — Home / Restaurant Catalog:**
   - Location header bar: "Current Locations", "Model Town, New Delhi" with chevron dropdown.
   - User search bar + dual action tiles (Offers/Sparkles & Wallet).
   - **Best Seller** horizontal scrollable food carousel (Sushi, Bowls, Pasta, Cupcakes) with price badges.
   - **30% OFF Special Dish Banner** with gradient card and pagination indicator dots.
   - **Popular Items** section with order item details, order status, and action pills:
     - `Cancel Order` (Solid orange)
     - `Track Driver` (Light orange pill with driver location alert)

4. **Screen 4 — Product / Restaurant Detail:**
   - Large hero food photography banner with rounded bottom corners.
   - Floating back navigation button.
   - Interactive quantity stepper (`- [ 3 ] +`).
   - Product title and description.
   - **Personal portion** customization selector:
     - Personal (4 Slices) — $0.00 (Default)
     - Medium (8 Slices) — $3.00
     - Familiar (10 Slices) — $5.50
     - Jumbo (12 Slices) — $10.00
   - Fixed bottom checkout CTA: "Add to cart • ₹..." with instant feedback.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS Design System with Figma color tokens (`--primary: #F05A22`)
- **Icons**: Lucide React
- **API Integration**: Fastor Staging REST Endpoints (`/register`, `/login`, `/restaurant?city_id=118`) with graceful mock fallbacks
- **State Management**: React state hooks with token persistence in `localStorage`

### Project Structure
```
fastor-react-mobile/
├── src/
│   ├── components/
│   │   ├── NumericKeypad.jsx       # Interactive iOS numeric keypad
│   │   ├── LoginScreen.jsx         # Screen 1: Phone input & OTP trigger
│   │   ├── OtpScreen.jsx           # Screen 2: 6-digit PIN verification
│   │   ├── HomeScreen.jsx          # Screen 3: Best seller carousel & popular items
│   │   └── ProductDetailScreen.jsx # Screen 4: Food details & portion customizer
│   ├── services/
│   │   └── api.js                  # Fastor API client + mock data
│   ├── App.jsx                     # Viewport frame & screen state router
│   ├── index.css                   # Design tokens, typography & mobile container
│   └── main.jsx                    # Root entry
├── index.html                      # HTML5 viewport & Google Fonts
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd fastor-react-mobile
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser!

### 3. Build for Production
```bash
npm run build
```

---

## 📱 Responsive Experience
- **Desktop**: Renders inside a sleek, centered iPhone smartphone mockup frame.
- **Mobile Devices**: Expands responsively to 100% full screen for a native app feel.
