import type { Metadata } from "next";
import "../styles/globals.css";
import NavigationBar from "@/components/Navigation/NavigationBar";

export const metadata: Metadata = {
  title: "Rèmi.fr Website",
  description:
    "Sehr geehrte Kundinnen und Kunden. Dies ist die offizielle Website von Rèmi.fr. Wir freuen uns über Ihren Besuch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col h-screen">
        <NavigationBar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
