let cachedBaseUrl: string | null = null;

function ensureAbsoluteUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.origin;
  } catch (_error) {
    throw new Error("NEXT_PUBLIC_BASE_URL must be a valid absolute URL, e.g. https://example.com");
  }
}

export function getBaseUrl(): string {
  if (cachedBaseUrl) return cachedBaseUrl;

  const rawValue = process.env.NEXT_PUBLIC_BASE_URL;

  if (!rawValue) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_BASE_URL is required in production environments");
    }

    cachedBaseUrl = "http://localhost:3000";
    return cachedBaseUrl;
  }

  cachedBaseUrl = ensureAbsoluteUrl(rawValue);
  return cachedBaseUrl;
}
