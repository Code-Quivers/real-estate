import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Providers from "@/lib/Providers";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manage rental unit | Dashboard",
  description: "Manage rental unit dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Manage rental unit | Dashboard</title>
        <ColorSchemeScript />
      </head>
      <Providers>
        <body className={inter.className}>
          <MantineProvider>
            <ModalsProvider>
              <Notifications />
              {children}
            </ModalsProvider>
          </MantineProvider>
        </body>
      </Providers>
    </html>
  );
}
