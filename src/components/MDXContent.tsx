'use client'
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeEditor from './CodeEditor';

export default function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={{ CodeEditor }} />;
} 