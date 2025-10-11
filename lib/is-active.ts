import type { SidebarTab } from "fumadocs-ui/utils/get-sidebar-tabs";

function normalize(url: string) {
  if (url.length > 1 && url.endsWith("/")) return url.slice(0, -1);
  return url;
}

export function isActive(url: string, pathname: string, nested = true): boolean {
  const normalizedUrl = normalize(url);
  const normalizedPath = normalize(pathname);

  return (
    normalizedUrl === normalizedPath || (nested && normalizedPath.startsWith(`${normalizedUrl}/`))
  );
}

export function isTabActive(tab: SidebarTab, pathname: string) {
  if (tab.urls) return tab.urls.has(normalize(pathname));

  return isActive(tab.url, pathname, true);
}
