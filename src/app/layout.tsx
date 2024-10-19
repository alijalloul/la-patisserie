import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Head from "@/components/Head";
import { cn } from "@/lib/utils";
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
       <Head />

        <body
          className={cn(
            " font-sans antialiased min-h-screen flex flex-col",
            fontSans.variable
          )}
        >
          {children}

          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
