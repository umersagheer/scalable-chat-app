import type { Metadata } from "next";

import "./globals.css";
import { SocketProvider } from "../context/socket-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketProvider>
        <body className="bg-neutral-900 text-neutral-100">
          <main className="max-w-2xl mx-auto dark">{children}</main>
        </body>
      </SocketProvider>
    </html>
  );
}
