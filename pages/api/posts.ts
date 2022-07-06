import { readdirSync } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { join, resolve } from 'path';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const files = await readdirSync(resolve('./pages/posts'));
    
    return res.json({ posts: files })
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}