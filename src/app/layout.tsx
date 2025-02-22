import type { Metadata } from "next";
import {Geist, Geist_Mono, Nunito} from 'next/font/google';
import "./globals.css";
import {Header} from '@/components/shared/header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'], // Define the CSS variable
});

export const metadata: Metadata = {
  title: "Pizzaa Project",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      >
      <main className={'min-h-screen'}>
          <Header/>
          {children}
      </main>
      </body>
    </html>
  );
}
