import type { NextApiRequest, NextApiResponse } from "next";
import { redis, generateShortId, MARKDOWN_TTL } from "../../../lib/redis";

type ResponseData = {
  id?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Content is required" });
    }

    // Limit content size (e.g., 100KB)
    if (content.length > 100000) {
      return res.status(400).json({ error: "Content too large (max 100KB)" });
    }

    // Generate a short unique ID
    let id = generateShortId();
    
    // Make sure ID is unique (very unlikely collision, but just in case)
    let attempts = 0;
    while (await redis.exists(`md:${id}`) && attempts < 5) {
      id = generateShortId();
      attempts++;
    }

    // Store in Redis with 24 hour TTL
    await redis.set(`md:${id}`, content, { ex: MARKDOWN_TTL });

    return res.status(200).json({ id });
  } catch (error: any) {
    console.error("Error saving markdown:", error);
    return res.status(500).json({ error: "Failed to save markdown" });
  }
}
