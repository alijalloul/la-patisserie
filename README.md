# Bakery E-commerce App

This project is a modern, full-featured e-commerce application for a bakery, developed using the latest technologies including Next.js 14, TypeScript, Redux, ShadCN-UI, Tailwind CSS, Prisma, PostgreSQL, Stripe, NextAuth, and Mapbox.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Listings**: Browse a variety of baked goods with detailed descriptions and prices.
- **Shopping Cart**: Add, remove, and update quantities of items in the cart.
- **Checkout**: Secure payment processing with Stripe.
- **User Authentication**: Sign up and log in using NextAuth.
- **Order Tracking**: Track the status and location of your orders using Mapbox.
- **Admin Dashboard**: Manage products, orders, and users.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux](https://redux.js.org/)
- **UI Components**: [ShadCN-UI](https://shadcn.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Payment Processing**: [Stripe](https://stripe.com/)
- **Authentication**: [NextAuth](https://next-auth.js.org/)
- **Geolocation**: [Mapbox](https://www.mapbox.com/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16.0.0 or later)
- npm or yarn
- PostgreSQL database
- Stripe account
- Mapbox account

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bakery-ecommerce-app.git
   cd bakery-ecommerce-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

4. Apply database migrations:
   ```bash
   npx prisma migrate deploy
   ```
