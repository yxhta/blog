import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withMDX(config);
