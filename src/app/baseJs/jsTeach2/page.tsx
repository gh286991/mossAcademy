'use client'
import Content from './content.mdx';
import CodeEditor from '@/components/CodeEditor';
import { MDXProvider } from '@mdx-js/react';

export default function JSTeach1Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        <MDXProvider components={{ CodeEditor }}>
          <Content />
        </MDXProvider>
      </article>
    </div>
  );
}
