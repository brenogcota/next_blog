import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const client_id = process.env.CLIENT_ID as string;
const client_secret = process.env.CLIENT_SECRET as string;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async (code: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${process.env.HOST}/api/callback`
    })
  });

  return response.json();
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    try {
      const { code } = req.query


      const { access_token, refresh_token } = await getAccessToken(code as string);

      res.json({ access_token, refresh_token })
      
    } catch (error: any) {
      return res.json({ error: error })
    }
}
  