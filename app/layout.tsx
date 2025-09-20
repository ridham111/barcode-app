import './globals.css'

export const metadata = {
  title: 'Barcode Generator',
  description: 'Generate QR codes for products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}