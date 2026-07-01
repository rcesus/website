import type { Metadata } from "next";
import "./globals.css";
import { ArticleModeProvider } from "./ArticleModeProvider";

export const metadata: Metadata = {
  title: {
    default: "RC Cowie",
    template: "%s | RC Cowie",
  },
  description:
    "RC Cowie | Sales Engineer. Deep diving into AI workflows and technical infrastructure. Welcome to my extended network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ArticleModeProvider>{children}</ArticleModeProvider>
      </body>
    </html>
  );
}
