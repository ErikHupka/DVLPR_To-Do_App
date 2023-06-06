import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DVLPR ToDo',
  description: 'Best To Do Application for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  )
}
