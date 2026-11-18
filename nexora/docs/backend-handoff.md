# NEXORA frontend handoff for Django

This document describes the frontend's proposed API contract. The frontend can read the product catalog and published articles when `VITE_API_BASE_URL` is configured. Cart synchronization is optional behind `VITE_ENABLE_REMOTE_CART=true`. Checkout, account and contact/newsletter forms now call their typed service methods when an API base URL is configured; they fall back to explicit demo messaging when it is not. Confirm the contract with the backend owner before implementation.

## Frontend status

- React Router owns client-side routes; the current route set is documented in the frontend README.
- Component styles are split under `src/styles/components/`, with dedicated mobile overrides per component.
- Product list/detail and article list/detail pages call the typed API when `VITE_API_BASE_URL` is configured, with sample-data fallbacks on unavailable endpoints.
- Checkout submits an order with an idempotency key when configured; payment initialization is not automatic.
- Account login/register/profile/order history call the proposed session endpoints. The auth contract and CSRF/CORS configuration must be agreed before production.
- Contact and newsletter forms submit when configured; newsletter submission requires explicit consent.
- Cart remains local by default. Remote sync is opt-in with `VITE_ENABLE_REMOTE_CART=true` and requires an authenticated session. Favorites remain local until their server sync is enabled.
- React + TypeScript + Vite; this directory is the customer-facing SPA root.
- Hosting must return `index.html` as the fallback for frontend routes such as `/shop`, `/cart`, and `/product/{slug}`.
- Catalog sample data and demo subscription variants live in `src/data/store.ts`.
- `src/types/api.ts` describes the proposed wire types.
- `src/adapters/productAdapter.ts` maps product responses to the UI model.
- `src/services/apiClient.ts` is the shared JSON transport. Configure it with `VITE_API_BASE_URL`.
- Cart persists in `localStorage` by default. Authenticated server synchronization is opt-in with `VITE_ENABLE_REMOTE_CART=true`; favorites remain local until the user session and endpoint contract are enabled.
- Account login/register/profile/order-history calls are wired to the proposed session endpoints. Confirm cookie/session auth and CSRF behavior with Django before enabling them. Contact and newsletter forms submit only when the API base URL is configured and explicit newsletter consent is checked.
- Checkout posts the selected variant IDs and quantities to the order endpoint with an idempotency key when the API is configured. It does not initiate payment automatically; payment-provider selection and redirect handling remain a backend/product decision.
- The UI has live-API loading/error/fallback states for catalog and articles. Product details, checkout and account are not production-ready until the Django endpoints, real product data, auth/CSRF and payment provider are implemented and verified.

## Proposed endpoints

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/v1/categories/` | Return only public categories and their product counts. |
| GET | `/api/v1/products/` | Support `category` (slug), `search`, `ordering`, and documented pagination. |
| GET | `/api/v1/products/{slug}/` | Include purchasable variants and availability. |
| GET | `/api/v1/articles/` | Return published articles with stable numeric IDs, slug, title, category, excerpt, image URL, body, reading time and publication date. |
| GET | `/api/v1/articles/{id}/` | Return one published article by its stable numeric ID. |
| POST | `/api/v1/auth/register/` | Auth method and verification flow remain to be decided. |
| POST | `/api/v1/auth/login/` | Agree cookie/session vs token auth and CSRF behavior. |
| POST | `/api/v1/auth/logout/` | Clear server session/token. |
| GET | `/api/v1/auth/me/` | Return the authenticated customer profile. |
| GET/PUT | `/api/v1/cart/` | Read the authenticated user's cart; response lines should include `product_slug`, `variant_id`, `quantity` and a product snapshot for rendering. `PUT` replaces the complete cart using `product_slug`, `variant_id` and quantity. |
| GET/POST/DELETE | `/api/v1/favorites/` | Read and update favorites for an authenticated user. |
| POST | `/api/v1/orders/` | Revalidate price and availability; create an order idempotently. |
| GET | `/api/v1/orders/` | Return current user's order history. |
| POST | `/api/v1/payments/initialize/` | Start the selected payment-provider flow. |
| POST | `/api/v1/contact-messages/` | Optional proposed endpoint for the contact form; validate and rate-limit server-side. |
| POST | `/api/v1/newsletter/subscriptions/` | Optional proposed endpoint for newsletter opt-in; confirm consent and unsubscribe requirements. |

## Product and variant response

The frontend needs stable IDs and slugs. A product can have multiple purchasable variants; the selected variant, not only the product, is added to the cart. Cart synchronization is proposed as `PUT` with the complete desired item list so repeated requests are idempotent. Confirm this contract with the Django owner before implementing it.

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

1. Confirm endpoint names, pagination, sorting, filter syntax and exact response fields. The cart proposal is `GET` plus idempotent `PUT` of the complete desired item snapshot; keep this method consistent in API implementation and client code.
2. Select auth/session strategy. If using cookies across origins, configure Django CORS credentials, allowed origin, secure cookie behavior and CSRF handling together with the frontend deployment origin.
3. Confirm Rial as the API unit and agree how discounts/taxes are represented.
4. Define order status transitions, payment callback/webhook ownership, error payloads and idempotency retention.
5. Provide approved product copy, plans, prices, availability, images, delivery windows and refund/support policies. Current catalog content and prices are demo values.
6. Decide whether contact and newsletter submissions are in scope and confirm their endpoint, consent, privacy, validation and rate-limit rules.
7. Provide production backend URL and deployment origin. Do not put Django secrets or payment credentials in `VITE_*` variables; Vite values are public in the built client.

## Local setup

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL`. This only configures the request client. The catalog remains on demo data until catalog queries and loading/error/empty states are connected to the confirmed endpoints.


## Typed frontend service layer

The branch `codex/nexora-backend-handoff-ready` adds `src/services/storefrontApi.ts`. It exposes typed methods:

- `storefrontApi.getCategories(signal?)`
- `storefrontApi.getProducts({ category, search, ordering, page, page_size }, signal?)`
- `storefrontApi.getProduct(slug, signal?)`
- `storefrontApi.createOrder(payload, signal?)`
- `storefrontApi.submitContactMessage(payload, signal?)`
- `storefrontApi.subscribeNewsletter(payload, signal?)`

The service supports either a plain array or the standard DRF page-number envelope for catalog lists. `src/types/api.ts` now declares that envelope and the proposed contact/newsletter request types.

The typed service also defines the proposed article, cart, favorites, session-authentication, order-history and payment-initialization calls. Product and article pages use live data when the API is configured and retain sample fallbacks when it is unavailable. The cart sync feature is opt-in and expects an authenticated session. The checkout creates an order but deliberately does not pretend a payment has been made. The cart proposal is an authenticated GET plus idempotent PUT of the full item list; favorites and account endpoints require an authenticated session. The authentication contract currently assumes cookie/session credentials and must be confirmed with the Django owner, including CSRF handling.

These methods are a typed integration boundary, not a claim that every UI feature is already connected. Existing pages continue to run on demo data until the Django contract is confirmed and page-level loading, error and empty states are deliberately wired. Do not enable live checkout until server-side order validation and payment initialization are implemented and tested.
