import { Redis } from "@upstash/redis";

// Initialize Redis client
// You need to set these environment variables:
// UPSTASH_REDIS_REST_URL
// UPSTASH_REDIS_REST_TOKEN
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Generate a short random ID
export function generateShortId(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// TTL in seconds (24 hours)
export const MARKDOWN_TTL = 60 * 60 * 24;
