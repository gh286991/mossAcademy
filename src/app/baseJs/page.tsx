import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

// 只抓 baseJs 下每個子目錄的 content.mdx
function getAllMdxFiles(baseDir: string) {
  const results: { slug: string; title: string; summary: string; author?: string; date?: string }[] = [];
  const subdirs = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
  for (const dirent of subdirs) {
    const subdir = path.join(baseDir, dirent.name);
    const mdxPath = path.join(subdir, 'content.mdx');
    if (fs.existsSync(mdxPath)) {
      const raw = fs.readFileSync(mdxPath, 'utf-8');
      const { data, content } = matter(raw);
      // 取得標題
      const match = content.match(/^#\s+(.+)$/m);
      const title = match ? match[1] : dirent.name;
      // 取得簡介
      const summary = data.summary || content.split('\n').find((line, idx) => idx > 0 && line.trim() && !line.startsWith('#')) || '';
      const date = data.date ? String(data.date) : undefined;
      results.push({ slug: dirent.name, title, summary, author: data.author, date });
    }
  }
  return results;
}

export default function BaseJsList() {
  const baseDir = path.join(process.cwd(), 'src/app/baseJs');
  const files = getAllMdxFiles(baseDir);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">文章列表</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {files.map(({ slug, title, summary, author, date }) => (
          <Link key={slug} href={`/baseJs/${slug}`}>
            <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-6 cursor-pointer flex flex-col h-full">
              <h2 className="text-xl font-bold mb-2 text-blue-700">{title}</h2>
              <p className="text-gray-600 flex-1">{summary}</p>
              <div className="text-xs text-gray-400 mt-2">
                {author && <span>作者：{author}　</span>}
                {date && <span>日期：{date}</span>}
              </div>
              <span className="mt-4 text-blue-500 font-semibold hover:underline">閱讀更多 →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
