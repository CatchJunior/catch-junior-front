const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const TECH_STACK_OPTIONS = [
  "Java", "Spring", "Python", "Django", "FastAPI",
  "JavaScript", "TypeScript", "React", "Next.js", "Vue",
  "Node.js", "Kotlin", "Swift", "Flutter", "Go",
  "Docker", "Kubernetes", "AWS", "MySQL", "PostgreSQL",
];

export async function registerUser(email: string, techStacks: string[]): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, techStacks }),
  });
  if (!res.ok) throw new Error("회원가입 실패");
  return res.json();
}

export async function registerDeviceToken(userId: number, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/users/${userId}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) throw new Error("디바이스 토큰 등록 실패");
}
