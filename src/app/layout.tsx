import "../styles/globals.css";
import type { Metadata } from "next";

import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Geo Trainer PH",
  description: "Memorize Philippines Provinces with Ease",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative flex h-screen flex-col bg-background">
        <Header />
        <main className="container h-full">{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
