import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Nextstixch",
    default: "Nextstixch",
  },
  description:
    "Nextstixch is a modern e-commerce platform offering a wide range of quality products at unbeatable prices with fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <NavBar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
