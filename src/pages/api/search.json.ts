import type { APIRoute } from 'astro';
import { getAllItems } from '../../lib/collections';

export const GET: APIRoute = async () => {
  const items = await getAllItems();

  const results = items.map((item) => ({
    slug: item.id,
    category: item.category,
    title: item.data.title,
    description: item.data.description,
    author: item.data.author,
    tags: item.data.tags,
    difficulty: item.data.difficulty,
    featured: item.data.featured,
    installType: item.data.installType || null,
    installTarget: item.data.installTarget || [],
    installCommand: item.data.installCommand || null,
    url: `/item/${item.category}/${item.id}`,
  }));

  return new Response(JSON.stringify({ items: results, total: results.length }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
