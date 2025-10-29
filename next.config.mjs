import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
  },
});

/** @type {import('next').NextConfig} */
const config = {
  cacheComponents: true,
  reactStrictMode: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default withMDX(config);
