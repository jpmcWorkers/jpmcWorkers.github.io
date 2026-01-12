import type { CollectionEntry } from 'astro:content';

type ResourceEntry = CollectionEntry<'resources'>;

export function sortResourcesByOrder(
  entries: ResourceEntry[]
): ResourceEntry[] {
  return entries.sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
}

export function calculateTagCounts(
  entries: ResourceEntry[]
): Record<string, number> {
  const tagCounts: Record<string, number> = {};
  entries.forEach((entry) => {
    entry.data.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return tagCounts;
}

export function getSortedTags(
  tagCounts: Record<string, number>
): string[] {
  return Object.keys(tagCounts).sort(
    (a, b) => tagCounts[b] - tagCounts[a]
  );
}

export function getTagCountForEntries(
  entries: ResourceEntry[],
  tag: string
): number {
  return entries.filter((entry) => entry.data.tags.includes(tag)).length;
}

