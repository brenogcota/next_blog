import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import settings from 'production.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const buffer = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
  
    const response = await axios({
      method: 'post',
      url: settings.spotify.auth,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Basic ${buffer}`       
      },
      params: {
        grant_type: 'client_credentials'
      }
    });
  
    return res.json(response.data)
    
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}
