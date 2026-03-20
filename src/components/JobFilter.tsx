"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TECH_STACK_OPTIONS } from "@/lib/api/users";

const SOURCES = [
  { value: "", label: "전체" },
  { value: "wanted", label: "원티드" },
  { value: "saramin", label: "사람인" },
  { value: "jumpit", label: "점핏" },
  { value: "jobkorea", label: "잡코리아" },
];

export default function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const [techStack, setTechStack] = useState(searchParams.get("techStack") ?? "");
  const [source, setSource] = useState(searchParams.get("source") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = new URLSearchParams();
    if (keyword) query.set("keyword", keyword);
    if (techStack) query.set("techStack", techStack);
    if (source) query.set("source", source);
    router.push(`/jobs?${query.toString()}`);
  }

  function handleReset() {
    setKeyword("");
    setTechStack("");
    setSource("");
    router.push("/jobs");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="회사명 또는 공고 제목 검색"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SOURCES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {TECH_STACK_OPTIONS.map((stack) => (
          <button
            key={stack}
            type="button"
            onClick={() => setTechStack(techStack === stack ? "" : stack)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              techStack === stack
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
            }`}
          >
            {stack}
          </button>
        ))}
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          초기화
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          검색
        </button>
      </div>
    </form>
  );
}
