import { readdirSync, readFileSync } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { join, resolve } from 'path';
import matter from 'gray-matter';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const files = await readdirSync(resolve('./pages/posts/en-US'), {
      withFileTypes: true,
    });

    const posts = files
    .map((file) => {
      if (!file.name.endsWith('.mdx')) return;

      const fileContent = readFileSync(
        join(process.cwd(), 'pages', 'posts', 'en-US', file.name),
        'utf-8'
      );
      const { data, content } = matter(fileContent);

      const preview = content.slice(0, 100);
      const slug = file.name.replace(/.mdx$/, '');
      return { data, slug, preview };
    })
    .filter((post) => post);

    
    return res.json({ posts })
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}