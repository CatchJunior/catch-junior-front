const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface JobPost {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  deadline: string;
  source: string;
  isRealJunior: boolean;
  techStacks: string[];
  collectedAt: string;
}

export async function getJobs(): Promise<JobPost[]> {
  const res = await fetch(`${API_BASE}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("공고 목록 조회 실패");
  return res.json();
}

export async function getJob(id: number): Promise<JobPost> {
  const res = await fetch(`${API_BASE}/api/jobs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("공고 조회 실패");
  return res.json();
}
