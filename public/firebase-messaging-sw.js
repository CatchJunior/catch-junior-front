importScripts("https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js");

// 환경변수를 서비스워커에서 직접 쓸 수 없으므로 메인 스레드에서 설정 전달
self.addEventListener("message", (event) => {
  if (event.data?.type === "FIREBASE_CONFIG") {
    const config = event.data.config;

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      const { title, body } = payload.notification ?? {};
      self.registration.showNotification(title ?? "새 공고 알림", {
        body: body ?? "",
        icon: "/icons/icon-192x192.png",
        data: payload.data,
      });
    });
  }
});
