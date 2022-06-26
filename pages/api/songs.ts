import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import settings from 'production.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { access_token } = (await axios({
      method: 'GET',
      url: 'https://brenocota.vercel.app/api/access_token',
    })).data;

    console.log(access_token)

    const response = (await axios({
        method: 'GET',
        url: settings.spotify.playlists, 
        headers: { 
          "Accept": "application/json", 
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      }
    )).data
  
    return res.json(response)
    
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}
