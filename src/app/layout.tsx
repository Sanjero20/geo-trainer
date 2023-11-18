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
      <body className="relative flex h-screen min-h-screen flex-col bg-background pb-4">
        <Header />
        <main className="flex-grow px-4 sm:container">{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
