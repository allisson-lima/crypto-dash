import type React from 'react';

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { WebVitals } from '@/components/web-vitals';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>CryptoDash - Dashboard de Criptomoedas</title>
        <meta
          name="description"
          content="Dashboard completo para acompanhar criptomoedas em tempo real"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <WebVitals />
          {children}
        </Providers>
      </body>
    </html>
  );
}
