// RootLayout.tsx

import '@/styles/globals.css';
import { ReactNode } from 'react';
import Head from 'next/head';
import SessionProvider from '@/app/provider/SessionProvider';
import { QuizProvider } from '@/app/provider/QuizProvider'; // Import the QuizProvider

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Taletwist</title>
        <meta name="description" content="Discover & Share Stories with your Friends" />
      </Head>
      <body>
        <SessionProvider>
          <QuizProvider> {/* Wrap children in QuizProvider */}
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app">{children}</main>
          </QuizProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
