/**
 * In-memory sliding-window rate limit. Good enough for a single long-running
 * server, but resets on redeploy/restart and is NOT shared across serverless
 * instances (e.g. multiple concurrent Vercel lambdas each get their own
 * memory). Swap `hits` for a Redis/Upstash-backed store behind the same
 * `isRateLimited` signature if that matters for this deployment.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
