# FlashScale – Claim Discount Module

This project demonstrates a simple **Claim Discount flow** for a flash sale system.

## What it does
- Users can claim a discount during a live campaign
- Inventory is reserved safely without overselling
- Same user retry or refresh returns the same result (idempotent)

## Tech Stack
- React (Frontend)
- Node.js + Express (Backend)
- MongoDB + Mongoose (Database)

## How it works
1. User clicks "Claim Discount"
2. Backend checks campaign and inventory
3. Inventory is reserved atomically
4. Discount token is generated and saved
5. Retry returns the same token

## How to run
- Start MongoDB
- Run backend: `npm start`
- Run frontend: `npm start`
