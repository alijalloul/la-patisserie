import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Script from "next/script";
import Footer from "./(customerFacing)/_components/Footer";
import { StoreProvider } from "./store/StoreProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <head>
          <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=G-65E07LKQJ0"
          ></Script>
          <Script id="" strategy="lazyOnload">
            {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-65E07LKQJ0');`}
          </Script>
        </head>

        <body
          className={cn(
            " font-sans antialiased min-h-screen flex",
            fontSans.variable
          )}
        >
          {children}
        </body>

        <Footer />
      </html>
    </StoreProvider>
  );
}
