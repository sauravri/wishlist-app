
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Adding Footer
import "./globals.css"; // Ensure global styles are applied
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "StyleList",
  description: "Your personalized fashion wishlist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
