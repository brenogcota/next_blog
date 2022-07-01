import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';
import { NextApiRequest, NextApiResponse } from 'next';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOP_TRACKS = `https://api.spotify.com/v1/me/player/recently-played`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async (code: string) => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.HOST}/api/callback`
      })
    });

    return response.json();
};
  
const callSpotify = async (endpoint: string, access_token: string) => {

    return await fetch(endpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    try {
      let token;
      const { code, refresh_token } = req.query;

      token = refresh_token;
      if (!refresh_token) {
        const { access_token } = await getAccessToken(code as string);
        token = access_token;
      }

      console.log('[Spotify token] ', token)

      let [tracks, playing] = await Promise.all([ 
                callSpotify(TOP_TRACKS, token as string),
                callSpotify(NOW_PLAYING_ENDPOINT, token as string)
            ])

     
      if (playing.status !== 204) {
        [tracks, playing] = await Promise.all([tracks.json(), playing.json()])
        
        return res.json({
            tracks,
            playing
        })
      }

      tracks = await tracks.json()
      res.json({ tracks, playing: null })
      
    } catch (error: any) {
      return res.json({ error: error })
    }
}
  