# Barcode Generator App

A minimal Next.js application that generates QR codes for products and sends email notifications when scanned.

## Features

- Generate QR codes for products with unique IDs
- Print QR codes directly from the browser
- Automatic email notifications when QR codes are scanned
- No database required - all data passed via URL parameters

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and update with your email settings:

```bash
cp .env.example .env.local
```

Update the values in `.env.local`:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@example.com
```

**For Gmail:**
1. Enable 2-factor authentication
2. Generate an App Password: Google Account → Security → App passwords
3. Use the app password as `EMAIL_PASS`

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a product name in the form
2. Click "Generate QR Code"
3. Use "Print QR Code" to print the barcode
4. When someone scans the QR code, it will:
   - Navigate to `/scan/[uniqueId]?name=ProductName`
   - Automatically send an email notification

## Deployment on Vercel

### 1. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### 2. Set Environment Variables

In your Vercel dashboard, go to your project → Settings → Environment Variables and add:

- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your email app password
- `EMAIL_TO`: Recipient email address

### 3. Redeploy

```bash
vercel --prod
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── sendEmail/
│   │       └── route.ts          # Email API endpoint
│   ├── scan/
│   │   └── [uniqueId]/
│   │       └── page.tsx          # Scan result page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page with QR generator
├── .env.example                  # Environment template
└── package.json
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **QRCode** - QR code generation
- **Nodemailer** - Email notifications
- **Vercel** - Deployment platform