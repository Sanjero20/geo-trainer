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
      <body className="relative flex h-screen min-h-screen bg-background p-2">
        <div className="container flex h-full w-full flex-col gap-2">
          <Header />
          <Separator />
          {children}
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
