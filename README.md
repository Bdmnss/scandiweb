# Scandiweb - E-commerce Platform

A modern e-commerce platform built with React (TypeScript) frontend and PHP GraphQL backend, featuring a product catalog, shopping cart, and order management system.

## 🚀 Features

- **Product Catalog**: Browse products by category with filtering
- **Product Details**: View detailed product information with images and attributes
- **Shopping Cart**: Add products with custom attributes (size, color, capacity, etc.)
- **Responsive Design**: Modern UI built with Tailwind CSS
- **GraphQL API**: Efficient data fetching with Apollo Client
- **Real-time Updates**: Toast notifications for user feedback

## 🏗️ Architecture

This project follows a full-stack architecture with:

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: PHP 8+ with GraphQL API
- **Database**: MySQL with comprehensive schema
- **State Management**: Zustand for client-side state
- **Styling**: Tailwind CSS for modern UI

## 📁 Project Structure

```
scandiweb/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/         # Route components
│   │   ├── store/         # Zustand state management
│   │   ├── lib/graphql/   # GraphQL queries and hooks
│   │   └── types.ts       # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── src/                   # PHP backend application
│   ├── GraphQL/          # GraphQL schema and resolvers
│   ├── Models/           # Database models
│   └── Database.php      # Database connection
├── public/               # PHP entry point
├── schema.sql           # Database schema and sample data
├── setup-db.php         # Database setup script
└── composer.json        # Backend dependencies
```

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Apollo Client** - GraphQL client
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications

### Backend

- **PHP 8+** - Server-side language
- **GraphQL-PHP** - GraphQL server implementation
- **Fast Route** - Fast routing library
- **MySQL** - Relational database
- **Composer** - PHP dependency management

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PHP** (v8.0 or higher)
- **MySQL** (v8.0 or higher)
- **Composer** (PHP package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd scandiweb
   ```

2. **Set up the backend**

   ```bash
   # Install PHP dependencies
   composer install

   # Set up database
   php setup-db.php
   ```

3. **Set up the frontend**

   ```bash
   cd client
   npm install
   ```

4. **Configure environment**

   Create a `.env` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_NAME=scandiweb
   DB_USER=your_username
   DB_PASS=your_password
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   # From the root directory
   composer start
   # Or manually: php -S localhost:8000 -t public
   ```

2. **Start the frontend development server**

   ```bash
   # From the client directory
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/graphql

## 📊 Database Schema

The application uses a comprehensive MySQL schema with the following main tables:

- **products** - Product information (name, description, category, brand)
- **categories** - Product categories
- **attributes** - Product attributes (size, color, capacity, etc.)
- **product_attributes** - Product-attribute relationships
- **prices** - Product pricing with currency support
- **images** - Product images
- **orders** - Order information
- **order_items** - Individual items in orders

## 🔧 Available Scripts

### Frontend (client/)

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
composer start       # Start PHP development server
composer setup-db    # Set up database schema and sample data
```

## 🛍️ Features in Detail

### Product Catalog

- Browse products by category (all, clothes, tech)
- View product images, prices, and availability
- Filter products by various attributes

### Product Details

- Detailed product information with rich descriptions
- Image gallery with multiple product images
- Attribute selection (size, color, capacity, etc.)
- Add to cart functionality

### Shopping Cart

- Persistent cart state using Zustand
- Add products with selected attributes
- Update quantities and remove items
- Real-time price calculations

### Order Management

- Create orders with multiple items
- Track order status (pending, processing, shipped, delivered)
- Store order history with timestamps

## 🎨 UI Components

The application includes several reusable components:

- **Header** - Navigation and cart icon
- **ProductsGrid** - Product catalog display
- **ProductDetails** - Individual product view
- **ProductGallery** - Image gallery component
- **Cart** - Shopping cart overlay
- **Loader** - Loading states
- **CustomError** - Error handling

## 🔌 GraphQL API

The backend provides a GraphQL API with the following main operations:

### Queries

- `categories` - Get all product categories
- `products(category)` - Get products filtered by category
- `product(id)` - Get detailed product information

### Mutations

- `createOrder(items)` - Create a new order

## 🚀 Deployment

### Frontend Deployment

```bash
cd client
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment

- Ensure PHP 8+ and MySQL are installed
- Upload backend files to your server
- Configure database connection in `.env`
- Set up web server to point to `public/index.php`
