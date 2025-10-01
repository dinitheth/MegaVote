import type { Metadata } from 'next';
import './globals.css';
import { Web3Provider } from '@/app/components/providers/Web3Provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AppStateProvider } from '@/app/components/providers/AppStateProvider';
import { ThemeProvider } from '@/app/components/ThemeProvider';


export const metadata: Metadata = {
  title: 'MegaVote',
  description: 'A decentralized voting dApp on the MEGA Testnet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Provider>
            <AppStateProvider>
              {children}
              <Toaster />
            </AppStateProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
