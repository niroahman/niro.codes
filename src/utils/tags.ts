export interface TagEntry {
  slug: string;
  display: string;
  count: number;
}

export function buildTagList(items: Array<{ tags: string[] }>): TagEntry[] {
  const counts = new Map<string, number>();
  const display = new Map<string, string>();
  items.forEach(({ tags }) => {
    tags.forEach((t) => {
      const key = t.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
      if (!display.has(key)) display.set(key, t);
    });
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({ slug, display: display.get(slug)!, count }));
}
