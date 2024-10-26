import AuthContextProvider from "@/context/auth.context";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextThemeProvider from "@/providers/NextThemeProvider";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <NextThemeProvider>
        <Toaster position="top-right" />
        <AuthContextProvider>{children}</AuthContextProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
