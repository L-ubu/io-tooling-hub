import { getCollection } from 'astro:content';

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🏠' },
  { id: 'cursor-rules', label: 'Cursor Rules', icon: '📐' },
  { id: 'mcp-configs', label: 'MCP Configs', icon: '🔌' },
  { id: 'claude-files', label: 'Claude Files', icon: '📄' },
  { id: 'plugins', label: 'Plugins & Extensions', icon: '🧩' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export async function getAllItems() {
  const [cursorRules, mcpConfigs, claudeFiles, plugins, skills] = await Promise.all([
    getCollection('cursor-rules'),
    getCollection('mcp-configs'),
    getCollection('claude-files'),
    getCollection('plugins'),
    getCollection('skills'),
  ]);

  return [
    ...cursorRules.map((item) => ({ ...item, category: 'cursor-rules' as const })),
    ...mcpConfigs.map((item) => ({ ...item, category: 'mcp-configs' as const })),
    ...claudeFiles.map((item) => ({ ...item, category: 'claude-files' as const })),
    ...plugins.map((item) => ({ ...item, category: 'plugins' as const })),
    ...skills.map((item) => ({ ...item, category: 'skills' as const })),
  ];
}

export async function getItemsByCategory(category: string) {
  const all = await getAllItems();
  if (category === 'all') return all;
  return all.filter((item) => item.category === category);
}

export async function getFeaturedItems() {
  const all = await getAllItems();
  return all.filter((item) => item.data.featured);
}

export function getCategoryCounts(items: Awaited<ReturnType<typeof getAllItems>>) {
  const counts: Record<string, number> = { all: items.length };
  for (const item of items) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }
  return counts;
}
