import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">캐치주니어</h1>
        <p className="text-lg text-gray-500 mb-8">
          신입 공고로 위장한 경력직 공고를 걸러드립니다.<br />
          진짜 신입을 위한 채용공고만 모았습니다.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/jobs"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            공고 보러가기
          </Link>
          <Link
            href="/users/register"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            알림 설정
          </Link>
        </div>
      </div>
    </main>
  );
}
