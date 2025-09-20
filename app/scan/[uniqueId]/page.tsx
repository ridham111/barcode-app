'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ScanPage({ params }: { params: { uniqueId: string } }) {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Processing...')
  
  useEffect(() => {
    const sendNotification = async () => {
      const productName = searchParams.get('name') || 'Unknown Product'
      const { uniqueId } = params
      
      try {
        const response = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName,
            uniqueId,
          }),
        })
        
        if (response.ok) {
          setStatus('✅ Email notification sent successfully!')
        } else {
          setStatus('❌ Failed to send notification')
        }
      } catch (error) {
        console.error('Error:', error)
        setStatus('❌ Error sending notification')
      }
    }
    
    sendNotification()
  }, [params, searchParams])
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Scanned</h1>
        <p className="text-gray-600 mb-2">Product: {searchParams.get('name')}</p>
        <p className="text-gray-600 mb-4">ID: {params.uniqueId}</p>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  )
}