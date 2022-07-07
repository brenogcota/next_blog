import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
let token: string | null = null;

const getAccessToken = async () => {
  const response = (await axios.post(TOKEN_ENDPOINT, {
    grant_type: 'refresh_token',
    refresh_token,
  },{
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })).data;

  return response.json();
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    try {

      if (!token) {
        const { access_token } = await getAccessToken();
        token = access_token;
      }

      res.json({ token })
      
    } catch (error: any) {
      return res.json({ error: error })
    }
}
  