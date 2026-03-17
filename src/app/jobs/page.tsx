import { Suspense } from "react";
import Link from "next/link";
import { getJobs } from "@/lib/api/jobs";
import JobFilter from "@/components/JobFilter";

interface Props {
  searchParams: Promise<{ keyword?: string; techStack?: string; source?: string }>;
}

const SOURCE_LABEL: Record<string, string> = {
  wanted: "원티드",
  saramin: "사람인",
  jumpit: "점핏",
  jobkorea: "잡코리아",
};

export default async function JobsPage({ searchParams }: Props) {
  const params = await searchParams;
  const jobs = await getJobs(params);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">캐치주니어</Link>
          <Link href="/users/register" className="text-sm text-gray-500 hover:text-gray-700">알림 설정</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-5">
        <Suspense>
          <JobFilter />
        </Suspense>

        <p className="text-sm text-gray-500">공고 {jobs.length}건</p>

        {jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/jobs/${job.id}`}
                  className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-gray-900 truncate">{job.title}</h2>
                      <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 mt-1">
                      {SOURCE_LABEL[job.source] ?? job.source}
                    </span>
                  </div>
                  {job.techStacks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.techStacks.slice(0, 5).map((stack) => (
                        <span
                          key={stack}
                          className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full"
                        >
                          {stack}
                        </span>
                      ))}
                      {job.techStacks.length > 5 && (
                        <span className="text-xs text-gray-400">+{job.techStacks.length - 5}</span>
                      )}
                    </div>
                  )}
                  {job.deadline && (
                    <p className="text-xs text-gray-400 mt-2">마감 {job.deadline}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
