import { Inter } from 'next/font/google'

import { ModalProvider } from '@/providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css';

import { AuthProvider } from '../context/authContext';
import Snowfall from '@/components/snowfall';
import VineAnimation from '@/components/vineAnimation';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'proximus prime',
  description: 'on est juste à côté',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}> 
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          {/* <VineAnimation /> */}
          <Snowfall 
            snowflakeCount={400} 
            color="lightblue" 
            sizeRange={[5, 15]} 
            speedRange={[5, 15]} 
          />
          <AuthProvider>
            <ModalProvider />
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
