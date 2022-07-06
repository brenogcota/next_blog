import { readFileSync } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path';
import matter from 'gray-matter';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    
    const { locale = 'en-US', path } = req.query

    const fileContent = readFileSync(
    join(process.cwd(), 'pages', 'posts', (locale as string), (path as string )),
        'utf-8'
    );
    const { data, content } = matter(fileContent);

    const slug = (path as string).replace(/.mdx$/, '');
    return res.json({ post: data, slug, content });
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}