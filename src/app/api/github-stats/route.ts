import { NextResponse } from "next/server";

const GITHUB_USER = "Pasquii4";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}`;

/** TTL compartido entre caché en memoria y revalidación del fetch. */
const REVALIDATE_SECONDS = 300;

type GithubStatsPayload = {
  fallback: boolean;
  public_repos: number;
  followers: number;
  public_gists: number;
};

const FALLBACK: GithubStatsPayload = {
  fallback: true,
  public_repos: 10,
  followers: 0,
  public_gists: 0,
};

type CacheEntry = { expiresAt: number; payload: GithubStatsPayload };

const memoryCache = new Map<string, CacheEntry>();

function getCached(key: string): GithubStatsPayload | null {
  const hit = memoryCache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return hit.payload;
}

function setCached(key: string, payload: GithubStatsPayload) {
  memoryCache.set(key, {
    expiresAt: Date.now() + REVALIDATE_SECONDS * 1000,
    payload,
  });
}

export const revalidate = REVALIDATE_SECONDS;

export async function GET() {
  const cacheKey = `github-stats:${GITHUB_USER}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
      },
    });
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "paupascual-portfolio/1.0",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(GITHUB_API, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      setCached(cacheKey, FALLBACK);
      return NextResponse.json(FALLBACK, {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=60, stale-while-revalidate=120`,
        },
      });
    }

    let data: Record<string, unknown>;
    try {
      data = (await res.json()) as Record<string, unknown>;
    } catch {
      setCached(cacheKey, FALLBACK);
      return NextResponse.json(FALLBACK, {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=60, stale-while-revalidate=120`,
        },
      });
    }

    const payload: GithubStatsPayload = {
      fallback: false,
      public_repos: typeof data.public_repos === "number" ? data.public_repos : FALLBACK.public_repos,
      followers: typeof data.followers === "number" ? data.followers : 0,
      public_gists: typeof data.public_gists === "number" ? data.public_gists : 0,
    };

    setCached(cacheKey, payload);
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
      },
    });
  } catch {
    setCached(cacheKey, FALLBACK);
    return NextResponse.json(FALLBACK, {
      status: 200,
      headers: {
        "Cache-Control": `public, s-maxage=60, stale-while-revalidate=120`,
      },
    });
  }
}
