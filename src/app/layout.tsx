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
      <body className="container flex h-screen min-h-screen flex-col gap-2 bg-background py-2">
        <Header />

        <Separator />

        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;
