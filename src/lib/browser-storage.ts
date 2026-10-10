// Storage access itself can throw when browser settings block persistence.
export function readStorage(kind: "localStorage" | "sessionStorage", key: string): string | null {
  try {
    return window[kind].getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(kind: "localStorage" | "sessionStorage", key: string, value: string | null): void {
  try {
    if (value === null) window[kind].removeItem(key);
    else window[kind].setItem(key, value);
  } catch {
    // Keep the current UI usable even when persistence is unavailable.
  }
}

export function parseSelectedTags(value: string | null, validTags: Set<string>, limit: number): string[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "null");
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((tag): tag is string => typeof tag === "string" && validTags.has(tag)))].slice(0, limit);
  } catch {
    return [];
  }
}
