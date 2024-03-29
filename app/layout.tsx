import '@radix-ui/themes/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from '@radix-ui/themes';
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <Theme>
        <Navbar />
        <main className='p-5'> {children}</main>
        </Theme>
      </body>
    </html>
  );
}
