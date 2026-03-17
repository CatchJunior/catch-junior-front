"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, TECH_STACK_OPTIONS } from "@/lib/api/users";
import { requestFcmToken } from "@/lib/fcm";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleStack(stack: string) {
    setSelectedStacks((prev) =>
      prev.includes(stack) ? prev.filter((s) => s !== stack) : [...prev, stack]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return setError("이메일을 입력해주세요.");
    if (selectedStacks.length === 0) return setError("기술스택을 1개 이상 선택해주세요.");

    setLoading(true);
    setError("");

    try {
      const { id } = await registerUser(email, selectedStacks);
      localStorage.setItem("userId", String(id));

      // FCM 토큰 등록 시도
      const token = await requestFcmToken();
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }

      router.push("/jobs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-blue-600">캐치주니어</a>
          <a href="/jobs" className="text-sm text-gray-500 hover:text-gray-700">공고 보기</a>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">관심 기술스택 등록</h1>
        <p className="text-gray-500 text-sm mb-6">
          선택한 기술스택과 관련된 신입 공고가 올라오면 알림을 보내드립니다.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-2">기술스택 선택</legend>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK_OPTIONS.map((stack) => (
                <button
                  key={stack}
                  type="button"
                  onClick={() => toggleStack(stack)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    selectedStacks.includes(stack)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {stack}
                </button>
              ))}
            </div>
          </fieldset>

          {error && (
            <p role="alert" className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "등록 중..." : "등록하고 공고 보기"}
          </button>
        </form>
      </main>
    </div>
  );
}
