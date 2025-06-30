import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '김장겸 - 프론트엔드 개발자',
  description: '김장겸 - 프론트엔드 개발자',
  generator: '김장겸',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
