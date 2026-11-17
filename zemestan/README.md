# زمستان — Wholesale Men's Winterwear

Next.js + React + TypeScript foundation for a premium RTL B2B wholesale fashion store.

## Current foundation
- Editorial Hybrid design system
- RTL Persian layout
- Componentized Homepage, Shop and Product pages
- Centralized canonical product catalog
- Presentation catalog derived from canonical product data
- Product service layer
- Product list/detail API routes
- Wholesale order domain types and service layer
- Wholesale order API route
- Cart state with MOQ-aware quantities
- MOQ-first wholesale UX
- CI build workflow

## API examples

```text
GET  /api/products
GET  /api/products?q=بمبر&category=bomber
GET  /api/products/classic-bomber
POST /api/orders
```

The current services use in-memory/mock persistence so the UI and API contracts can be developed independently of the future database. The next backend step is replacing the service implementations with PostgreSQL/Prisma or Supabase without changing the UI contracts.

## Run locally

```bash
cd zemestan
npm install
npm run dev
```
