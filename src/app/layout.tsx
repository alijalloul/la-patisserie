import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { StoreProvider } from "./store/StoreProvider";
import Script from "next/script";
import Footer from "./(customerFacing)/_components/Footer";

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
            " font-sans antialiased flex flex-col",
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
