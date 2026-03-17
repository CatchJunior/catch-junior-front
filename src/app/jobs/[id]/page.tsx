import Link from "next/link";
import { getJob } from "@/lib/api/jobs";

interface Props {
  params: Promise<{ id: string }>;
}

const SOURCE_LABEL: Record<string, string> = {
  wanted: "원티드",
  saramin: "사람인",
  jumpit: "점핏",
  jobkorea: "잡코리아",
};

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getJob(Number(id));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">캐치주니어</Link>
          <Link href="/jobs" className="text-sm text-gray-500 hover:text-gray-700">← 목록으로</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {SOURCE_LABEL[job.source] ?? job.source}
            </span>
            {job.isRealJunior && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                신입 가능
              </span>
            )}
            {!job.isRealJunior && (
              <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-medium">
                경력 요구 ({job.requiredExperienceYears}년 이상)
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-500 mt-1">{job.company}</p>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-400 text-xs">마감일</dt>
              <dd className="text-gray-700 font-medium mt-0.5">{job.deadline ?? "상시 채용"}</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-xs">수집일</dt>
              <dd className="text-gray-700 font-medium mt-0.5">
                {new Date(job.collectedAt).toLocaleDateString("ko-KR")}
              </dd>
            </div>
          </dl>

          {job.techStacks.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">기술스택</p>
              <div className="flex flex-wrap gap-1.5">
                {job.techStacks.map((stack) => (
                  <span key={stack} className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-3">공고 내용</h2>
          <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{job.description}</p>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          원본 공고 바로가기 →
        </a>
      </main>
    </div>
  );
}
