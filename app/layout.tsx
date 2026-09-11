import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Sage Operations", template: "%s · Sage Operations" },
  description: "Internal property operations workspace",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body><AppShell>{children}</AppShell></body></html>;
}
