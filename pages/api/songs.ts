import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import settings from 'production.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = (await axios({
        method: 'GET',
        url: settings.spotify.playlists, 
      }
    )).data
  
    return res.json(response)
    
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}
