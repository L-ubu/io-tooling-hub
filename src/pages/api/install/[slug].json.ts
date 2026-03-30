import type { APIRoute } from 'astro';
import { getAllItems } from '../../../lib/collections';

export async function getStaticPaths() {
  const items = await getAllItems();
  return items
    .filter((item) => item.data.installType)
    .map((item) => ({
      params: { slug: item.id },
      props: { item },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const { item } = props as { item: Awaited<ReturnType<typeof getAllItems>>[number] };

  if (!item.data.installType) {
    return new Response(JSON.stringify({ error: 'No install config available' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = {
    slug: item.id,
    title: item.data.title,
    category: item.category,
    installType: item.data.installType,
    installTarget: item.data.installTarget || [],
    installCommand: item.data.installCommand || null,
    downloadFile: item.data.downloadFile || null,
    extensionId: item.data.extensionId || null,
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
