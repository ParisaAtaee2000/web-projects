# NEXORA — Frontend / Django handoff

## 1. Delivery status and scope

This repository contains the customer-facing React + TypeScript + Vite storefront. It does **not** contain the Django backend, database, production catalog, authentication implementation, payment gateway, or production deployment.

The frontend is ready for backend integration against the proposed contract below. Endpoint names and wire fields are a proposal, not an existing backend guarantee. The frontend and Django owner must agree on the contract before enabling production flows.

### Implemented on the frontend

- React Router routes and shared site layout.
- Component-level CSS under `src/styles/components/`.
- Product/category and article list/detail requests when `VITE_API_BASE_URL` is set, with demo fallback and loading/error UI.
- Typed API service and wire types in `src/services/storefrontApi.ts` and `src/types/api.ts`.
- Local cart and favorites persistence; optional authenticated cart GET/PUT sync behind `VITE_ENABLE_REMOTE_CART=true`.
- Checkout order-creation request with a client idempotency key. It does not start payment.
- Account login/register/current-user/order-history requests.
- Contact and newsletter submission requests; newsletter requires explicit consent.

### Not implemented / must not be represented as production-ready

- Django endpoints, database models, admin, inventory and catalog data.
- Server-side session/CSRF contract. The current transport sends cookies with `credentials: include`, but does not fetch or attach a Django CSRF token. Agree and implement this before enabling cookie-authenticated unsafe methods.
- Payment provider selection, redirect, callback/webhook verification, refunds and reconciliation.
- Server synchronization for favorites. Favorite API methods exist in the service layer but the current UI uses localStorage only.
- Production product copy, approved prices, availability, images, delivery/refund/support policies.
- Manual visual QA on physical devices and across browser engines.

## 2. Routes to preserve

All routes are client-side routes. Production hosting must serve `index.html` as the fallback for direct navigation and refresh on these paths.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Catalog, category, search and sort |
| `/product/:slug` | Product detail |
| `/cart` | Cart |
| `/checkout` | Checkout / order creation |
| `/journal` | Article list |
| `/journal/:id` | Article detail; current API identifier is numeric |
| `/help` | Help / FAQ |
| `/about` | About |
| `/contact` | Contact form |
| `/account` | Login, registration, profile and order history |
| `/favorites` | Locally stored favorites |

Unknown paths render the not-found page. Preserve query parameters used by catalog search/filter links, including `q`, `category`, and `offer`.

## 3. Environment and local validation

Copy `.env.example` to `.env.local`:

```dotenv
VITE_API_BASE_URL=
VITE_ENABLE_REMOTE_CART=false
```

- `VITE_API_BASE_URL` is the public API origin/prefix; it must not contain secrets.
- Keep remote cart disabled until the authenticated cart endpoint and CSRF/session behavior are verified.
- Frontend build: `npm ci && npm run build`.
- Required Node.js: `20.19+`.

## 4. API contract proposal

Base prefix: `/api/v1`. JSON request/response bodies are assumed unless specified otherwise. Confirm trailing-slash behavior, pagination, error shape and status codes with Django.

| Method | Endpoint | Used by frontend | Contract notes |
| --- | --- | --- | --- |
| GET | `/categories/` | Yes | Array or DRF page envelope; each item: `id, slug, title, product_count`. |
| GET | `/products/` | Yes | Array or DRF page envelope; query: `category, search, ordering, page, page_size`. Supported ordering values currently sent: `popular`, `price`, `-price`. |
| GET | `/products/{slug}/` | Yes | One product including purchasable variants. |
| GET | `/articles/` | Yes | Array or DRF page envelope; article fields below. |
| GET | `/articles/{id}/` | Yes | One article by numeric ID. |
| POST | `/auth/register/` | Yes | Request: `full_name, email, phone, password`; response: `{ user }`. |
| POST | `/auth/login/` | Yes | Request: `email, password`; response: `{ user }`. |
| POST | `/auth/logout/` | Yes | Clears the server session. |
| GET | `/auth/me/` | Yes | Current authenticated user. |
| GET | `/cart/` | Optional | Authenticated user's cart; only read when remote cart feature flag is enabled. |
| PUT | `/cart/` | Optional | Replaces the complete cart with `{ items: [{ product_slug, variant_id, quantity }] }`; only written when remote cart feature flag is enabled. |
| POST | `/orders/` | Yes, when API configured | Creates order after server-side price and inventory revalidation. |
| GET | `/orders/` | Yes, after authentication | Current user's order history; array or DRF page envelope. |
| POST | `/contact-messages/` | Yes, when API configured | Contact form submission. |
| POST | `/newsletter/subscriptions/` | Yes, when API configured | Requires `{ email, consent: true }`. |
| POST | `/payments/initialize/` | Not called by current UI | Service method exists; define only after provider and payment lifecycle are agreed. |
| GET/POST/DELETE | `/favorites/` | Not called by current UI | Service methods are placeholders; current favorites remain local. Define exact DELETE URL and response before implementing sync. |

The client currently expects DRF page-number envelopes as `{ count, next, previous, results }` or plain arrays. The catalog page currently consumes the first returned page only; either return a sufficiently sized page for the initial integration or agree a follow-up pagination UI/API change.

### Product and category response

```json
{
  "id": 23,
  "slug": "chatgpt-plus",
  "name": "ChatGPT Plus",
  "description": "اشتراک هوش مصنوعی",
  "brand": "chatgpt",
  "badge": null,
  "category": {
    "id": 5,
    "slug": "ai",
    "title": "هوش مصنوعی",
    "product_count": 12
  },
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

Product fields consumed by the adapter are `id, slug, name, description, brand, badge, category.slug, category.title, features` and `variants[]`. Variant fields are `id, sku, title, duration_months, duration_label, price_amount, currency, is_available`. Brand must match one of the frontend union values in `src/types/api.ts`; coordinate any expansion.

### Article response

```json
{
  "id": 1,
  "slug": "sample-article",
  "title": "عنوان مقاله",
  "category": "راهنما",
  "excerpt": "خلاصه مقاله",
  "image_url": "https://example.com/article.jpg",
  "body": "متن مقاله",
  "reading_minutes": 4,
  "published_at": "2026-11-18T09:00:00Z"
}
```

Current detail route and API lookup use numeric `id`, not slug.

### Order creation request

```json
{
  "items": [{ "variant_id": 231, "quantity": 1 }],
  "customer": {
    "full_name": "نام مشتری",
    "email": "customer@example.com",
    "phone": "09120000000"
  },
  "idempotency_key": "client-generated-unique-key"
}
```

The client expects the created order to include `id, status, total_amount, currency, created_at`. The server must calculate totals independently, validate variant availability and quantity, apply discounts/taxes, and make retries with the same idempotency key safe. Never trust client totals or price snapshots.

### Cart response

```json
{
  "items": [
    {
      "product_slug": "chatgpt-plus",
      "variant_id": 231,
      "quantity": 1,
      "product": { "...": "complete product object matching the product response above" }
    }
  ],
  "updated_at": "2026-11-18T09:00:00Z"
}
```

The product snapshot is required for rendering API-sourced products not present in the local demo catalog. Validate ownership and variant/product consistency on the server.

### User and auth response

```json
{
  "user": {
    "id": 7,
    "full_name": "نام مشتری",
    "email": "customer@example.com",
    "phone": "09120000000"
  }
}
```

The `/auth/me/` endpoint returns the user object directly. The current client is cookie/session-oriented (`credentials: include`). Before enabling auth, agree same-site cookie policy, HTTPS, CORS allowed origins/credentials, CSRF cookie/token delivery and the `X-CSRFToken` header for POST/PUT/DELETE. The current frontend transport does not yet implement CSRF token acquisition/header injection.

### Money and order state

- API money values are non-negative integer Rial (`IRR`); UI display converts Rial to Toman (10 Rial = 1 Toman).
- Keep currency explicit and avoid float/decimal JSON amounts.
- Backend is the source of truth for price, discount, taxes, availability and order status.
- Define allowed status transitions, expiry of pending orders, payment callback/webhook verification and refund behavior before real checkout.

## 5. Responsive and route QA checklist

Code/CSS review has covered 1000px, 760px, 430px and 360px breakpoints, with the global layout retaining a 320px minimum viewport. This is not a substitute for manual visual testing.

Before production release, manually verify the following at 1440px desktop, 1024px tablet, 768px, 430px, 390px, 360px and 320px mobile widths, in at least Chromium and one additional browser:

- Directly open and refresh every route in section 2; verify no 404 from hosting.
- Header, mobile menu, search open/close, account/favorites/cart actions and focus states.
- Catalog category scrolling, search, sort, empty state, product cards and no horizontal overflow.
- Product detail variant selection, unavailable variants, add-to-cart and favorite action.
- Cart quantity changes, removal, empty cart, long product names and summary layout.
- Checkout form validation, disabled/submitting state, API failure and successful order response.
- Account login/register, unauthenticated state, authenticated order list and logout.
- Article list/detail, long title/body, images and aside stacking.
- Contact/newsletter validation and explicit newsletter consent.
- Keyboard navigation, visible focus, reduced-motion preference and RTL alignment.

No manual physical-device/browser-engine visual QA is claimed as completed by this handoff.

## 6. Backend implementation order and ownership boundary

1. **Backend owner:** confirm endpoint names, serializers, pagination, errors and auth/CSRF strategy with the frontend owner.
2. **Backend owner:** implement catalog/categories/articles and provide approved production data.
3. **Backend owner:** implement session auth, user profile and order history; verify CORS, cookies and CSRF end-to-end.
4. **Backend owner:** implement cart persistence and agree whether/when favorites synchronization is in scope.
5. **Backend owner:** implement order creation with server-side pricing/inventory validation and idempotency.
6. **Backend owner + product owner:** select payment provider and implement initialize, callback/webhook verification and order state transitions.
7. **Frontend owner:** wire any contract changes, add CSRF support if cookie/session auth is chosen, add catalog pagination if needed, and run end-to-end/manual responsive QA.
8. **Both:** test success, validation errors, expired sessions, duplicate submissions, unavailable variants, payment failures and mobile layouts in staging before enabling production sales.

## 7. Production release gate

Do not enable real sales or set production API flags until the backend and frontend jointly verify catalog data, auth/CSRF, cart, server-side pricing, order creation, payment callbacks, error handling, HTTPS/CORS and the manual QA checklist above.
