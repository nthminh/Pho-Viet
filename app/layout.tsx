import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phở Việt - Hệ thống quản lý quán phở',
  description: 'Hệ thống đặt món và quản lý quán phở hiện đại',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
