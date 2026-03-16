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
    <main>
      <h1>관심 기술스택 등록</h1>
      <p>선택한 기술스택과 관련된 신입 공고가 올라오면 알림을 보내드립니다.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>

        <fieldset>
          <legend>기술스택 선택</legend>
          <div>
            {TECH_STACK_OPTIONS.map((stack) => (
              <label key={stack}>
                <input
                  type="checkbox"
                  checked={selectedStacks.includes(stack)}
                  onChange={() => toggleStack(stack)}
                />
                {stack}
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "등록 중..." : "등록하고 공고 보기"}
        </button>
      </form>
    </main>
  );
}
