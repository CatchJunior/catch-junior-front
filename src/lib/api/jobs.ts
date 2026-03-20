const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface JobPostSummary {
  id: number;
  title: string;
  company: string;
  source: string;
  deadline: string | null;
  isRealJunior: boolean;
  techStacks: string[];
}

export interface JobPostDetail {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  deadline: string | null;
  source: string;
  isRealJunior: boolean;
  requiredExperienceYears: number;
  techStacks: string[];
  collectedAt: string;
}

export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export async function getJobs(params?: {
  keyword?: string;
  techStack?: string;
  source?: string;
  page?: number;
  size?: number;
}): Promise<SpringPage<JobPostSummary>> {
  const query = new URLSearchParams();
  if (params?.keyword) query.set("keyword", params.keyword);
  if (params?.techStack) query.set("techStack", params.techStack);
  if (params?.source) query.set("source", params.source);
  if (params?.page != null) query.set("page", String(params.page));
  if (params?.size != null) query.set("size", String(params.size));
  const qs = query.toString();
  const res = await fetch(`${API_BASE}/api/jobs${qs ? `?${qs}` : ""}`, { cache: "no-store" });
  if (!res.ok) throw new Error("공고 목록 조회 실패");
  return res.json();
}

export async function getJob(id: number): Promise<JobPostDetail> {
  const res = await fetch(`${API_BASE}/api/jobs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("공고 조회 실패");
  return res.json();
}
