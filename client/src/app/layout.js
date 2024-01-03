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
    <Providers>
      <html lang="en" className="selection:bg-[#29429f] selection:text-white ">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
