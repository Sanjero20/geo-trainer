import "../styles/globals.css";
import type { Metadata } from "next";

import Header from "@/components/header/header";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Geo Trainer PH",
  description: "Memorize Philippines Provinces with Ease",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <Header />
        <Separator />
        <main className="container h-full px-2 sm:container">{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
