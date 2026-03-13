# CatchJunior Front

캐치주니어의 프론트엔드. 순수 신입 공고 탐색, 검색, 실시간 알림을 제공하는 Web/PWA 클라이언트입니다.

## 기술 스택

- **Framework**: Next.js (App Router)
- **언어**: TypeScript
- **알림**: Firebase Cloud Messaging (FCM)
- **PWA**: Service Worker, Web App Manifest

## 주요 기능

- 순수 신입 공고 목록 및 상세 조회
- 기술 스택·지역·키워드 기반 검색
- 관심 기술 스택 설정 및 개인화 필터
- FCM 푸시 알림 수신 (브라우저 + 홈 화면 앱)
- PWA 설치 지원 (오프라인 대응)

## 프로젝트 구조

```
src/
├── app/               # Next.js App Router 페이지
│   ├── jobs/          # 공고 목록·상세
│   ├── search/        # 검색
│   └── settings/      # 사용자 설정
├── components/        # 공통 UI 컴포넌트
├── lib/
│   ├── api/           # 백엔드 API 클라이언트
│   └── fcm/           # FCM 초기화 및 토큰 관리
└── public/
    ├── manifest.json  # PWA 매니페스트
    └── sw.js          # Service Worker
```

## 실행 방법

### 사전 조건
- Node.js 20+
- 백엔드 서버 실행 중

### 로컬 실행

```bash
npm install
npm run dev
```

### 빌드

```bash
npm run build
npm start
```

## 환경 변수 설정

`.env.local` 파일을 생성합니다.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_FIREBASE_API_KEY={FIREBASE_API_KEY}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN={FIREBASE_AUTH_DOMAIN}
NEXT_PUBLIC_FIREBASE_PROJECT_ID={FIREBASE_PROJECT_ID}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID={MESSAGING_SENDER_ID}
NEXT_PUBLIC_FIREBASE_APP_ID={FIREBASE_APP_ID}
NEXT_PUBLIC_FIREBASE_VAPID_KEY={VAPID_KEY}
```

## PWA 알림 흐름

```
사용자 알림 허용
     │
FCM 토큰 발급 → 백엔드 API로 토큰 등록
     │
새 공고 발생 시 백엔드 → FCM → 브라우저 Service Worker → 푸시 알림 표시
```
