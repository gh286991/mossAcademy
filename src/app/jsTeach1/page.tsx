import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeEditor from '@/components/CodeEditor';

export default async function JSTeach1Page() {
  const filePath = path.join(process.cwd(), 'src/content/jsTeach1.mdx');
  const source = fs.readFileSync(filePath, 'utf8');

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        <MDXRemote source={source} components={{ CodeEditor }} />
      </article>
    </div>
  );
}
