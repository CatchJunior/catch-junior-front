import type { Metadata, Viewport } from "next";
import "./globals.css";
import FcmInitializer from "@/components/FcmInitializer";

export const metadata: Metadata = {
  title: "캐치주니어",
  description: "진짜 주니어를 위한 실시간 채용 큐레이션 플랫폼",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <FcmInitializer />
        {children}
      </body>
    </html>
  );
}
