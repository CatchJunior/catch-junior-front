import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Docker 배포용 (Dockerfile.front에서 사용)
};

export default nextConfig;
