import type { Metadata } from 'next';
import { Caveat, Comfortaa } from 'next/font/google';
import './globals.css';

export const caveat = Caveat({ subsets: ['latin'], display: 'swap' });
const comfortaa = Comfortaa({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'B-Ball',
  description: 'Basketball teams information & predictions!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={comfortaa.className + ' dark'}>{children}</body>
    </html>
  );
}
