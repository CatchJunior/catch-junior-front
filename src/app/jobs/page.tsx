import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main>
      <h1>신입 공고 목록</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <a href={`/jobs/${job.id}`}>
              {job.title} - {job.company}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
