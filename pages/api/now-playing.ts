import type { NextApiRequest, NextApiResponse } from 'next';

import { getNowPlaying } from 'lib/spotify'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const response = await getNowPlaying();

    if (response.status === 204) {
      return res.status(200).json({
            song: { is_playing: false }
          });
    }

    const song = await response.json();
  
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30'
    );
  
    return res.status(200).json({
      song
    });
}