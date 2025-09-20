import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { productName, uniqueId } = await request.json()
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Product Sold Notification',
      text: `Product Sold: ${productName} (ID: ${uniqueId})`,
      html: `
        <h2>Product Sold</h2>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>ID:</strong> ${uniqueId}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    }
    
    await transporter.sendMail(mailOptions)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}