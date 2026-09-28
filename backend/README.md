# GharSe India API — MongoDB Edition

Backend for the GharSe India request-and-quotation workflow.

## Stack

- Node.js 20+
- TypeScript
- Fastify
- MongoDB
- Mongoose
- Zod
- Helmet, CORS and rate limiting

## 1. Install

```bash
npm install
```

## 2. Configure MongoDB

Copy `.env.example` to `.env`.

For local MongoDB:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/gharse_india
```

For MongoDB Atlas, use the connection string supplied by Atlas, for example:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/gharse_india?retryWrites=true&w=majority
```

Also set a long random `ADMIN_API_KEY`.

## 3. Run

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Default API: `http://localhost:4000`

## API

### Health

`GET /health`

### Create request

`POST /api/product-requests`

The request body matches the frontend `ProductRequestPayload`:

```json
{
  "name": "Example Customer",
  "email": "customer@example.com",
  "whatsapp": "+971500000000",
  "destinationCountry": "UAE",
  "destinationCity": "Dubai",
  "productName": "Hyderabad bakery item",
  "preferredBrand": "Example Brand",
  "productUrl": "https://example.com/product",
  "quantity": "2 packs",
  "budget": "INR 1500",
  "shippingPreference": "not_sure",
  "desiredDeliveryDate": "2026-10-15",
  "notes": "Please check availability.",
  "consent": true
}
```

Response:

```json
{
  "success": true,
  "referenceId": "GH-2026-1234",
  "message": "Request received. We will review the details and contact you with the next step."
}
```

Submitting a request does **not** create an order or payment obligation.

### Customer request status

`GET /api/product-requests/:referenceId`

Returns the request, status history, and quote if one exists.

### Admin list

`GET /api/admin/product-requests`

Optional query: `?status=under_review`

Send:

```http
x-admin-api-key: YOUR_ADMIN_API_KEY
```

### Admin status update

`PATCH /api/admin/product-requests/:referenceId/status`

Body:

```json
{
  "status": "under_review",
  "note": "Checking supplier availability."
}
```

## MongoDB collections

The API creates these collections automatically when used:

- `product_requests` — customer request and current status
- `request_status_history` — audit trail of status changes
- `quotes` — quotation breakdown linked to a request

No SQL migrations are required.

## Recommended production next steps

1. Put MongoDB Atlas behind IP/network restrictions appropriate to your deployment.
2. Store `ADMIN_API_KEY` in your deployment secret manager.
3. Replace the simple admin API key with authenticated admin users before exposing an admin dashboard.
4. Add a proper quote-management endpoint before sending quotes to customers.
5. Add WhatsApp/email notifications after the request workflow is stable.
