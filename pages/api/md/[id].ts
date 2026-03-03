import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../../../lib/redis";

type ResponseData = {
  content?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "ID is required" });
    }

    // Retrieve from Redis
    const content = await redis.get<string>(`md:${id}`);

    if (!content) {
      return res.status(404).json({ error: "Markdown not found or expired" });
    }

    return res.status(200).json({ content });
  } catch (error: any) {
    console.error("Error retrieving markdown:", error);
    return res.status(500).json({ error: "Failed to retrieve markdown" });
  }
}
