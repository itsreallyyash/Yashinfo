import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'YashShah@Portfolio: ~',
  description: 'AI/ML enthusiast and researcher',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='65' font-family='Inter, Arial, sans-serif' font-size='50' font-weight='900' fill='%23ff72e1' text-anchor='middle'>YS</text></svg>"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

