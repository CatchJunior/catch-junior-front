import { getJob } from "@/lib/api/jobs";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getJob(Number(id));

  return (
    <main>
      <a href="/jobs">← 목록으로</a>

      <h1>{job.title}</h1>
      <p>{job.company}</p>

      <section>
        <dl>
          <dt>출처</dt>
          <dd>{job.source}</dd>
          <dt>마감일</dt>
          <dd>{job.deadline || "상시 채용"}</dd>
          <dt>기술스택</dt>
          <dd>{job.techStacks.length > 0 ? job.techStacks.join(", ") : "-"}</dd>
          <dt>수집일</dt>
          <dd>{new Date(job.collectedAt).toLocaleDateString("ko-KR")}</dd>
        </dl>
      </section>

      <section>
        <h2>공고 내용</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>{job.description}</p>
      </section>

      <a href={job.url} target="_blank" rel="noopener noreferrer">
        원본 공고 바로가기 →
      </a>
    </main>
  );
}
