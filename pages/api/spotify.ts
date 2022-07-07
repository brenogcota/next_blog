import type { NextApiRequest, NextApiResponse } from 'next'

const client_id = process.env.CLIENT_ID;
const AUTHORIZE_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${process.env.HOST}/api/callback&scope=user-read-currently-playing%20user-read-recently-played`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    return res.redirect(AUTHORIZE_ENDPOINT)
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}
