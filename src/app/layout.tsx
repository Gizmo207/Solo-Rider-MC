import './globals.css'
import { Inter, Oswald } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const oswald = Oswald({ 
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata = {
  title: 'Solo Riders MC | Independent Motorcycle Community',
  description: 'Join the ultimate digital clubhouse for solo motorcycle riders. Shop exclusive gear, share your rides, and connect with fellow independent bikers.',
  keywords: 'motorcycle, solo riders, biker community, motorcycle gear, custom bikes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
