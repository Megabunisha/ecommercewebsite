# NEXUS — E-Commerce Frontend with Redux Toolkit & React Context API

A modern, high-performance e-commerce user interface built with advanced **React 19**, **Redux Toolkit**, **React Context API**, and **React Router v7**.

---

## 🎯 Project Objectives & Focused Areas

This project was built to demonstrate scalable frontend architecture and modern React development practices:

- **Advanced React.js Concepts:**
  - Functional components with clean separation of presentation and business logic
  - Hooks ecosystem: `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`
  - Custom Hooks and component reusability (`ProductCard`, `StarRating`, `CartDrawer`)
  - Conditional rendering (cart empty states, stock badges, filter results)
- **Routing with React Router v7:**
  - Dynamic routing with URL parameters (`/product/:id` using `useParams`)
  - Programmatic navigation (`useNavigate` for checkout and redirect flows)
  - Navigation between views (`NavLink` with active states and `ScrollToTop` restoration)
  - Catch-all 404 handler (`*`)
- **Centralized State Management (Redux vs Context API):**
  - **Redux Toolkit (`@reduxjs/toolkit`):**
    - `cartSlice`: Cart items array, real-time quantity stepper, promo code calculation, total amounts, slide-over drawer toggle, and localStorage persistence.
    - `wishlistSlice`: Saved products toggle and localStorage persistence.
    - `filterSlice`: Multi-criteria search, categories, price range, and sort preferences.
  - **React Context API:**
    - `ThemeContext`: Smooth Dark / Light mode switching persisted in localStorage.
    - `ToastContext`: Global notification toast system with auto-dismiss.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React.js 19** | Core UI component library |
| **Vite 8** | Lightning-fast build tooling and HMR dev server |
| **Redux Toolkit 2 & React-Redux 9** | Centralized predictable state management for Cart, Wishlist & Filters |
| **React Context API** | Ambient global state for Theme and Toast notifications |
| **React Router v7** | Client-side dynamic routing and navigation |
| **Vanilla CSS3** | Custom design system with CSS custom properties, glassmorphism, responsive grid & flexbox |
| **Lucide React** | Sleek, modern SVG icon library |
| **Canvas Confetti** | Celebration visual effects on successful checkout |

---

## 🌟 Application Features

1. **Home Page (`/`)**:
   - Dynamic Hero Banner with CTA buttons, live customer ratings, and floating glassmorphism badges.
   - Interactive Category Pills browser.
   - Featured Flagship Products showcase with quick-add to cart and wishlist toggle.
   - Limited-time promotional discount banner.
   - Verified developer and audiophile testimonials.
   - Trust and value proposition badges.

2. **Products Catalog Page (`/products`)**:
   - Sidebar filters: Real-time search query, category selection, price slider ($50 - $800), minimum star rating, and in-stock checkbox.
   - Sort dropdown: Featured first, Price low-to-high, Price high-to-low, Customer ratings, and Alphabetical.
   - Grid and List view switcher.
   - Dynamic result count and 1-click filter reset.

3. **Dynamic Product Detail Page (`/product/:id`)**:
   - Dynamic route parameter extraction (`useParams`).
   - Interactive multi-image gallery with thumbnail switcher.
   - Star rating, inventory status, and price savings badges.
   - Quantity selector with min/max stock limits.
   - "Add to Cart", "Buy Now" (direct to checkout), and "Wishlist" buttons.
   - Tabbed sections: Overview, Full Hardware Specifications, and Community Reviews (with live review submission form!).
   - Related products recommendation row.

4. **Cart Management (`/cart` & Slide-Over Drawer)**:
   - Slide-over **Cart Drawer** accessible from anywhere via the navbar cart icon.
   - Dedicated **Cart Page** with full line-item details, image previews, and quantity steppers.
   - Promo code validator (supports `WELCOME20` for 20% off and `REACTPRO` for 15% off).
   - Order calculations: Subtotal, Estimated Tax (8%), Shipping (Free over $100), Discount, and Total.

5. **Checkout Simulation (`/checkout`)**:
   - Shipping address and contact information form.
   - Shipping speed selector (Standard Free vs Express $15).
   - Payment method choice: Credit/Debit Card, PayPal, Apple Pay, Cash on Delivery.
   - Order recap sidebar with encrypted payment security badge.

6. **Order Success Celebration (`/order-success`)**:
   - Full confetti celebration animation.
   - Generated order reference code (e.g. `#NX-849102`).
   - Estimated delivery date calculation.
   - Itemized invoice receipt summary with "Print Receipt" feature.

7. **Saved Wishlist (`/wishlist`)**:
   - Saved items grid with 1-click "Move All to Cart" action.

8. **Educational Architecture Explorer (`/about` & In-App Modal)**:
   - Interactive guide comparing Redux Toolkit vs React Context API.
   - Cheatsheet covering `useSelector`, `useDispatch`, `useContext`, `useParams`, and `useNavigate`.
   - Live State Inspector displaying real-time Redux and Context state values.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended, tested on Node.js v24)
- npm (v9 or higher)

### 2. Installation
```bash
# Clone or navigate to the project directory
cd c:/famithaproject1

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized production bundle in the `dist/` directory.

---

## 📁 Project Directory Structure

```
famithaproject1/
├── index.html                    # HTML5 entry with Google Fonts & SEO meta tags
├── package.json                  # Dependencies & npm scripts
├── vite.config.js                # Vite build configuration
├── src/
│   ├── main.jsx                  # App entry with Redux Provider, Context Providers & Router
│   ├── App.jsx                   # Route configuration and core layout shell
│   ├── index.css                 # Comprehensive Nexus Design System (variables, dark/light)
│   ├── app/
│   │   └── store.js              # Redux Toolkit centralized store configuration
│   ├── context/
│   │   ├── ThemeContext.jsx      # React Context API for Dark/Light mode
│   │   └── ToastContext.jsx      # React Context API for global toast notifications
│   ├── data/
│   │   └── products.js           # Realistic hardware & audio product catalog + promo codes
│   ├── features/
│   │   ├── cart/cartSlice.js     # Redux slice: items, quantity, totals, promo, drawer
│   │   ├── wishlist/wishlistSlice.js # Redux slice: wishlist toggle & storage sync
│   │   └── filter/filterSlice.js # Redux slice: search, category, price, sort
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx        # Responsive navigation with search, badges & theme toggle
│   │   │   ├── Footer.jsx        # Multi-column footer with links & badges
│   │   │   ├── CartDrawer.jsx    # Slide-over quick cart drawer
│   │   │   ├── ProductCard.jsx   # Reusable product card with quick add & wishlist
│   │   │   ├── StarRating.jsx    # Star rating component with review counts
│   │   │   └── ScrollToTop.jsx   # Window scroll position reset on route change
│   │   ├── home/
│   │   │   ├── HeroBanner.jsx    # Hero section with stats, CTAs & glass badges
│   │   │   ├── CategoryPills.jsx # Category quick-select cards
│   │   │   └── ValueProps.jsx    # Trust badges (Free shipping, warranty, returns)
│   │   └── architecture/
│   │       └── TechExplainerModal.jsx # Interactive Redux vs Context guide & live inspector
│   └── pages/
│       ├── HomePage.jsx          # Landing page with hero, featured products & testimonials
│       ├── ProductsPage.jsx      # Product listing with dynamic sidebar filters & sorting
│       ├── ProductDetailPage.jsx # Dynamic route `/product/:id` with gallery, specs & reviews
│       ├── CartPage.jsx          # Dedicated cart page with promo code application
│       ├── CheckoutPage.jsx      # Multi-step checkout simulation with validation
│       ├── OrderSuccessPage.jsx  # Order celebration with confetti & printable invoice
│       ├── WishlistPage.jsx      # Wishlist management page
│       ├── AboutPage.jsx         # Architecture documentation and learning objectives
│       └── NotFoundPage.jsx      # 404 error page
```
