"use client";

import { useEffect } from "react";
import { requestFcmToken, onFcmMessage } from "@/lib/fcm";

export default function FcmInitializer() {
  useEffect(() => {
    async function init() {
      // 서비스워커에 Firebase 설정 전달
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        reg.active?.postMessage({
          type: "FIREBASE_CONFIG",
          config: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          },
        });
      }

      const token = await requestFcmToken();
      if (!token) return;

      // 로컬스토리지에 userId가 있으면 토큰 등록
      const userId = localStorage.getItem("userId");
      if (userId) {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${userId}/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }
    }

    init().catch(console.error);

    // 포그라운드 메시지 수신
    onFcmMessage((payload) => {
      console.log("FCM 메시지 수신:", payload);
    });
  }, []);

  return null;
}
