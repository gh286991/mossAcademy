import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import CodeEditor from '@/components/CodeEditor';

// 取得目前檔案的目錄
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function ArticlePage() {
  const mdxPath = path.join(__dirname, 'content.mdx');
  const raw = fs.readFileSync(mdxPath, 'utf-8');
  const { content, data } = matter(raw);

  // 解析標題與剩餘內容
  const lines = content.split('\n');
  const titleLineIdx = lines.findIndex(line => line.trim().startsWith('# '));
  const title = titleLineIdx !== -1 ? lines[titleLineIdx].replace(/^# /, '').trim() : '';
  const restContent = lines
    .filter((_, idx) => idx !== titleLineIdx)
    .join('\n');

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        {title && <h1>{title}</h1>}
        {(data.author || data.date) && (
          <div className="mb-6 text-sm text-gray-500 flex gap-4">
            {data.author && <span>作者：{data.author}</span>}
            {data.date && <span>日期：{new Date(data.date).toLocaleDateString()}</span>}
          </div>
        )}
        <MDXRemote source={restContent} components={{ CodeEditor }} />
      </article>
    </div>
  );
}