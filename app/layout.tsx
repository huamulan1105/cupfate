import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://glimmer-tarot.huahuamulan1105.chatgpt.site"),
  title: "纸杯命运 · CUPFATE",
  description: "从一只小小纸杯里，抽出此刻的一点启发。A quiet bilingual tarot experience for reflection.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "CUPFATE" },
  icons: { icon: "/cupfate-icon.png", apple: "/cupfate-icon.png" },
  openGraph: {
    title: "纸杯命运 · CUPFATE",
    description: "从一只小小纸杯里，抽出此刻的一点启发。抽一张或三张大阿尔卡那牌。",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "纸杯命运 · CUPFATE" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "纸杯命运 · CUPFATE", description: "从一只小小纸杯里，抽出一点温柔的启发。", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#8f9a87" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
