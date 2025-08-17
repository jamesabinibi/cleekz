# Cleekz v2

Role-based Next.js app for Product Sellers, Event Vendors, and Musicians. Paystack payments, Cloudinary uploads, Resend email ticketing, QR/Barcode scanning, invoices as JPEG, public pages, analytics, and mobile wrappers.

## Quick Start
```bash
npm i
cp .env.example .env   # fill values
npx prisma db push
npm run prisma:seed
npm run dev
```
Open http://localhost:3000

Demo users:
- seller@demo.com / password123
- vendor@demo.com / password123
- music@demo.com / password123
