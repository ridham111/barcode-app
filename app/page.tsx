'use client'

import { useState } from 'react'
import QRCode from 'qrcode'

export default function Home() {
  const [productName, setProductName] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [uniqueId, setUniqueId] = useState('')

  const generateQRCode = async () => {
    if (!productName.trim()) return
    
    // Create meaningful ID: productname-001, productname-002, etc.
    const cleanName = productName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const storageKey = `count_${cleanName}`
    const currentCount = parseInt(localStorage.getItem(storageKey) || '0') + 1
    localStorage.setItem(storageKey, currentCount.toString())
    
    const id = `${cleanName}-${currentCount.toString().padStart(3, '0')}`
    const scanUrl = `${window.location.origin}/scan/${id}?name=${encodeURIComponent(productName)}`
    
    try {
      const qrUrl = await QRCode.toDataURL(scanUrl)
      setQrCodeUrl(qrUrl)
      setUniqueId(id)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const printQRCode = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print QR Code</title></head>
          <body style="text-align: center; padding: 20px;">
            <h2>${productName}</h2>
            <img src="${qrCodeUrl}" alt="QR Code" style="max-width: 300px;" />
            <p>ID: ${uniqueId}</p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Barcode Generator</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>
          
          <button
            onClick={generateQRCode}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate QR Code
          </button>
          
          {qrCodeUrl && (
            <div className="text-center space-y-4">
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
              <p className="text-sm text-gray-600">ID: {uniqueId}</p>
              <button
                onClick={printQRCode}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Print QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}