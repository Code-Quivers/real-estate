import { Inter } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import Providers from "@/lib/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Estate Management",
  description: "Created by CODEQUIVERS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="selection:bg-[#29429f] selection:text-white ">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
