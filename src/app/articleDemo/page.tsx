import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Chart } from '@/components/Chart'

const components = {
  Chart
}

async function getMdxContent() {
  const filePath = path.join(process.cwd(), 'src/content/example.mdx')
  const source = fs.readFileSync(filePath, 'utf8')
  return source
}

export default async function ArticleDemo() {
  const source = await getMdxContent()

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg max-w-none">
        <MDXRemote source={source} components={components} />
      </article>
    </div>
  )
}
