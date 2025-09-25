# Heyday Flower Co

Welcome to the Heyday Flower Co project! This is a Next.js application designed to provide a seamless shopping experience for flower enthusiasts. Below are the details regarding the project structure, features, and setup instructions.

## Project Structure

```
heyday-flower-co
├── src
│   ├── app
│   │   ├── layout.tsx          # Main layout component for the application
│   │   ├── page.tsx            # Homepage of the website
│   │   ├── globals.css          # Global CSS styles
│   │   ├── about
│   │   │   └── page.tsx        # About page with company information
│   │   ├── shop
│   │   │   ├── page.tsx        # Shop page displaying products
│   │   │   └── [id]
│   │   │       └── page.tsx    # Dynamic product detail page
│   │   ├── cart
│   │   │   └── page.tsx        # Cart page for reviewing items
│   │   ├── checkout
│   │   │   └── page.tsx        # Checkout page for finalizing purchases
│   │   └── api
│   │       ├── products
│   │       │   └── route.ts    # API route for fetching products
│   │       └── checkout
│   │           └── route.ts    # API route for handling checkout
│   ├── components
│   │   ├── layout
│   │   │   ├── Header.tsx       # Header component with navigation
│   │   │   └── Footer.tsx       # Footer component with copyright info
│   │   ├── ui
│   │   │   ├── Button.tsx       # Reusable button component
│   │   │   ├── Card.tsx         # Card component for product display
│   │   │   └── Input.tsx        # Input component for forms
│   │   ├── product
│   │   │   ├── ProductCard.tsx  # Component for individual product display
│   │   │   └── ProductGrid.tsx  # Grid layout for multiple products
│   │   └── cart
│   │       ├── CartItem.tsx     # Component for individual cart items
│   │       └── CartSummary.tsx   # Component summarizing cart contents
│   ├── lib
│   │   ├── utils.ts             # Utility functions
│   │   └── constants.ts         # Constants used in the application
│   ├── hooks
│   │   ├── useCart.ts           # Custom hook for managing cart state
│   │   └── useProducts.ts       # Custom hook for managing product data
│   ├── types
│   │   └── index.ts             # TypeScript interfaces and types
│   └── data
│       └── products.ts          # Mock product data
├── public
│   └── favicon.ico              # Favicon for the website
├── package.json                  # npm configuration file
├── tsconfig.json                # TypeScript configuration file
├── next.config.js               # Next.js configuration file
├── tailwind.config.js           # Tailwind CSS configuration file
├── postcss.config.js            # PostCSS configuration file
└── README.md                    # Project documentation
```

## Features

- **Homepage**: A welcoming landing page that introduces users to Heyday Flower Co.
- **About Page**: Information about the company, its mission, and values.
- **Shop Page**: A comprehensive list of products available for purchase.
- **Product Details**: Individual product pages with detailed descriptions and images.
- **Shopping Cart**: A cart page to review selected items before checkout.
- **Checkout Process**: A streamlined checkout page for finalizing purchases.
- **API Integration**: API routes for fetching product data and processing checkout.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd heyday-flower-co
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.