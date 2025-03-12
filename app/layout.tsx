import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Simple QR Code Generator",
  description: "Generate QR codes easily with this simple tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        {children}
      </body>
    </html>
  );
}
