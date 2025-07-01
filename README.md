# Online Food Ordering System

A full-stack food ordering platform that supports guest browsing and ordering, user registration and login, order history tracking, and merchant-side dish management. Designed to simulate a real-world restaurant workflow with role-based access and staged order processing. 

---

## Features
This system features a three-level role-based permission structure, each offering unique capabilities and access:

### User Roles
Guest
Browse all available dishes without logging in

Add items to the cart and place orders

Orders are stored locally and will be lost after refresh or exit

Cannot view order history or access advanced features

Registered User
Sign up and log in to create a personal account

Place multiple orders and view them in real-time before final checkout

Orders are saved persistently and can be reviewed in a history section

Eligible for additional features like loyalty points, feedback, and tipping





### Ordering System
- Place multiple orders before final payment (`Place` + `Pay` model)
- Persisted cart and order data with status tracking (`pending` → `paid`)
- Real-time order history display with item details and timestamps

### Authentication
- Custom login and registration flows without third-party auth providers
- Form validation and error feedback for better UX
- Session storage used for user identification and API access

---

## Tech Stack

| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend   | Next.js API Routes, Prisma ORM       |
| Database  | PostgreSQL                           |
| Auth      | Custom login system (local/session)  |
| Styling   | Tailwind CSS                         |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/online-food-ordering.git
cd online-food-ordering
pnpm install
