import type { NextConfig } from "next";
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    // 可加 remark/rehype plugin
  },
})(nextConfig);
