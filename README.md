# GharSe India — Full Stack

Next.js frontend + Fastify/Mongoose backend + local MongoDB.

## Project structure

- `frontend/` — GharSe India website and Request a Product form
- `backend/` — Fastify API, Mongoose models, validation, status history and quotes

## 1. Start MongoDB

Make sure your local MongoDB service is running on `127.0.0.1:27017`.

## 2. Configure backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Default `.env`:

```env
PORT=4000
HOST=0.0.0.0
MONGODB_URI=mongodb://127.0.0.1:27017/gharse_india
ADMIN_API_KEY=gharse-local-admin-key-change-this
CORS_ORIGIN=http://localhost:3000
```

Start the API:

```powershell
npm run dev
```

Check:

- http://localhost:4000/
- http://localhost:4000/health

## 3. Configure frontend

Open a second terminal:

```powershell
cd frontend
npm install
Copy-Item .env.local.example .env.local
```

The default value is:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start Next.js:

```powershell
npm run dev
```

Open http://localhost:3000.

## 4. Submit a real request

Use the website's **Request a Product** form. The browser sends:

`POST http://localhost:4000/api/product-requests`

The backend validates the request and stores it in MongoDB. The response contains a `GH-YYYY-XXXX` reference ID.

## API

- `GET /` — API info
- `GET /health` — health check
- `POST /api/product-requests` — create request
- `GET /api/product-requests/:referenceId` — customer request/status lookup
- `GET /api/admin/product-requests` — admin list; requires `x-admin-api-key`
- `PATCH /api/admin/product-requests/:referenceId/status` — admin status update; requires `x-admin-api-key`

## MongoDB collections

- `product_requests`
- `request_status_histories`
- `quotes`

## Notes

The current image picker is UI-only: it displays the selected filename but does not upload the image to MongoDB. File uploads can be added later using object storage (for example S3/Cloudinary) rather than storing image binaries in MongoDB.

For production, replace the local MongoDB URI with a secured MongoDB Atlas URI and use a strong admin API key stored only on the server.
