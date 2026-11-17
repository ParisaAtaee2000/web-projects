# NEXORA frontend handoff for Django

This document describes the frontend's proposed API contract. The frontend currently runs on sample data; none of these endpoints are called yet. Confirm the contract with the backend owner before implementation.

## Frontend status

- React + TypeScript + Vite; customer-facing SPA is in `nexora/`.
- Hosting must return `index.html` as the fallback for frontend routes such as `/shop`, `/cart`, and `/product/{slug}`.
- Catalog sample data and demo subscription variants live in `src/data/store.ts`.
- `src/types/api.ts` describes the proposed wire types.
- `src/adapters/productAdapter.ts` maps product responses to the UI model.
- `src/services/apiClient.ts` is the shared JSON transport. Configure it with `VITE_API_BASE_URL`.
- Cart and favorites currently persist in browser `localStorage`; there is no authenticated server sync.
- Checkout validates browser form fields only. It creates no order and starts no payment.

## Proposed endpoints

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/v1/categories/` | Return only public categories and their product counts. |
| GET | `/api/v1/products/` | Support `category` (slug), `search`, `ordering`, and documented pagination. |
| GET | `/api/v1/products/{slug}/` | Include purchasable variants and availability. |
| POST | `/api/v1/auth/register/` | Auth method and verification flow remain to be decided. |
| POST | `/api/v1/auth/login/` | Agree cookie/session vs token auth and CSRF behavior. |
| POST | `/api/v1/auth/logout/` | Clear server session/token. |
| GET/PUT | `/api/v1/cart/` | Read and sync cart lines by variant ID for an authenticated user. |
| GET/POST/DELETE | `/api/v1/favorites/` | Read and update favorites for an authenticated user. |
| POST | `/api/v1/orders/` | Revalidate price and availability; create an order idempotently. |
| GET | `/api/v1/orders/` | Return current user's order history. |
| POST | `/api/v1/payments/initialize/` | Start the selected payment-provider flow. |

## Product and variant response

The frontend needs stable IDs and slugs. A product can have multiple purchasable variants; the selected variant, not only the product, is added to the cart.

```json
{
  "id": 23,
  "slug": "chatgpt-plus",
  "name": "ChatGPT Plus",
  "description": "اشتراک هوش مصنوعی",
  "brand": "chatgpt",
  "badge": null,
  "category": { "id": 5, "slug": "ai", "title": "هوش مصنوعی", "product_count": 12 },
  "features": ["دسترسی به پلن انتخاب‌شده"],
  "variants": [
    {
      "id": 231,
      "sku": "chatgpt-plus-1m",
      "title": "یک‌ماهه",
      "duration_months": 1,
      "duration_label": "یک‌ماهه",
      "price_amount": 19900000,
      "currency": "IRR",
      "is_available": true
    }
  ]
}
```

All API amounts must be non-negative integer Rial (`IRR`). The UI displays Toman by dividing Rial by 10. Return `currency` explicitly and do not use decimal/float money values. The backend is authoritative for price, discount, and availability.

## Order proposal

```json
{
  "items": [{ "variant_id": 231, "quantity": 1 }],
  "customer": {
    "full_name": "نام مشتری",
    "email": "customer@example.com",
    "phone": "09120000000"
  },
  "notes": "",
  "idempotency_key": "client-generated-unique-key"
}
```

The server should recalculate totals, validate inventory, reject unavailable variants, and return an order ID, status, integer total amount and currency. Use the idempotency key to prevent duplicate orders on retries. Never accept the client-submitted total as authoritative.

## Decisions needed before wiring the API

1. Confirm endpoint names, pagination, sorting, filter syntax and exact response fields.
2. Select auth/session strategy. If using cookies across origins, configure Django CORS credentials, allowed origin, secure cookie behavior and CSRF handling together with the frontend deployment origin.
3. Confirm Rial as the API unit and agree how discounts/taxes are represented.
4. Define order status transitions, payment callback/webhook ownership, error payloads and idempotency retention.
5. Provide approved product copy, plans, prices, availability, images, delivery windows and refund/support policies. Current catalog content and prices are demo values.
6. Provide production backend URL and deployment origin. Do not put Django secrets or payment credentials in `VITE_*` variables; Vite values are public in the built client.

## Local setup

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL`. This only configures the request client. The catalog remains on demo data until catalog queries and loading/error/empty states are connected to the confirmed endpoints.
