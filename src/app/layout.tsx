import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer";
import Head from "@/components/Head";
import { cn } from "@/lib/utils";
import { StoreProvider } from "./store/StoreProvider";

import Provider from "@/components/Provider";
import { CookiesProvider } from "next-client-cookies/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "La Patisserie",
  description:
    " This project is a modern, full-featured e-commerce application for a bakery, developed using the latest technologies including Next.js 14, TypeScript, Redux, ShadCN-UI, Tailwind CSS, Prisma, PostgreSQL, Stripe, NextAuth, and Mapbox. ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <Head />

        <body
          className={cn(
            " font-sans antialiased min-h-screen flex flex-col",
            fontSans.variable
          )}
        >
          <Provider>
            <CookiesProvider>{children}</CookiesProvider>
          </Provider>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
