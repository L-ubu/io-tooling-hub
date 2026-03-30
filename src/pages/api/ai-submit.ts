export const prerender = false;

import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';

const REPO_OWNER = 'L-ubu';
const REPO_NAME = 'io-tooling-hub';

interface AISubmitItem {
  title: string;
  description: string;
  category: 'cursor-rules' | 'mcp-configs' | 'claude-files' | 'plugins' | 'skills' | 'link';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  content?: string;
  externalUrl?: string;
  installCommand?: string;
  author?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildMarkdown(item: AISubmitItem): string {
  const now = new Date().toISOString().split('T')[0];
  const tags = item.tags ? item.tags.map((t) => `"${t}"`).join(', ') : '';

  const typeMap: Record<string, string> = {
    'cursor-rules': 'cursor-rule',
    'mcp-configs': 'mcp',
    'claude-files': 'claude-file',
    plugins: 'plugin',
    skills: 'skill',
  };

  let fm = `---\ntitle: "${item.title}"\ndescription: "${item.description}"\nauthor: "${item.author || 'AI Submission'}"\ntags: [${tags}]\ndifficulty: "${item.difficulty || 'beginner'}"\ncreatedAt: ${now}\nupdatedAt: ${now}\nfeatured: false\n`;

  if (typeMap[item.category]) fm += `installType: "${typeMap[item.category]}"\n`;
  if (item.installCommand) fm += `installCommand: "${item.installCommand}"\n`;
  if (item.externalUrl) fm += `externalUrl: "${item.externalUrl}"\n`;

  fm += '---\n\n';
  return fm + (item.content || '');
}

// GET: Return API documentation
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      name: 'iO Tooling Hub AI Submit API',
      description: 'Submit AI tooling configs programmatically. Creates a PR for review.',
      authentication: 'Bearer token via Authorization header. Use the API key from the SUBMIT_API_KEY env var.',
      endpoint: 'POST /api/ai-submit',
      body: {
        items: [
          {
            title: 'string (required)',
            description: 'string (required)',
            category: 'cursor-rules | mcp-configs | claude-files | plugins | skills | link (required)',
            difficulty: 'beginner | intermediate | advanced (default: beginner)',
            tags: 'string[] (optional)',
            content: 'string - markdown content (required for non-link items)',
            externalUrl: 'string (optional)',
            installCommand: 'string (optional)',
            author: 'string (default: AI Submission)',
          },
        ],
      },
      example: {
        items: [
          {
            title: 'My MCP Server',
            description: 'A useful MCP server config',
            category: 'mcp-configs',
            difficulty: 'beginner',
            tags: ['mcp', 'example'],
            content: '## Setup\n\nRun the server...',
            installCommand: 'npx my-mcp-server',
            author: 'Claude',
          },
        ],
      },
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};

// POST: Create a PR with submitted items
export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.SUBMIT_API_KEY;
  const githubToken = import.meta.env.GITHUB_TOKEN;

  if (!apiKey || !githubToken) {
    return new Response(JSON.stringify({ error: 'AI submit not configured on server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check API key
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
    return new Response(JSON.stringify({ error: 'Invalid or missing API key' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { items: AISubmitItem[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.items?.length) {
    return new Response(JSON.stringify({ error: 'No items provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate items
  const validCategories = ['cursor-rules', 'mcp-configs', 'claude-files', 'plugins', 'skills', 'link'];
  for (const item of body.items) {
    if (!item.title || !item.description || !item.category) {
      return new Response(JSON.stringify({ error: 'Each item requires title, description, and category' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!validCategories.includes(item.category)) {
      return new Response(JSON.stringify({ error: `Invalid category: ${item.category}. Valid: ${validCategories.join(', ')}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (item.category !== 'link' && !item.content) {
      return new Response(JSON.stringify({ error: `Content is required for non-link items (missing in "${item.title}")` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  const octokit = new Octokit({ auth: githubToken });

  try {
    const { data: ref } = await octokit.rest.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: 'heads/main',
    });

    const branchName = `ai-submit/${slugify(body.items[0].title)}-${Date.now()}`;
    await octokit.rest.git.createRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `refs/heads/${branchName}`,
      sha: ref.object.sha,
    });

    for (const item of body.items) {
      const slug = slugify(item.title);
      const path = item.category === 'link'
        ? `src/content/links/${slug}.md`
        : `src/content/${item.category}/${slug}.md`;

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
        message: `feat: add ${item.title}`,
        content: Buffer.from(buildMarkdown(item)).toString('base64'),
        branch: branchName,
      });
    }

    const prTitle = body.items.length > 1
      ? `[AI Submit] ${body.items.length} new configs`
      : `[AI Submit] ${body.items[0].title}`;

    const itemSummary = body.items
      .map((item) => `- **${item.title}** (${item.category})`)
      .join('\n');

    const { data: pr } = await octokit.rest.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: prTitle,
      body: `## AI Submission\n\nSubmitted programmatically via the AI Submit API.\n\n${itemSummary}`,
      head: branchName,
      base: 'main',
    });

    return new Response(JSON.stringify({ success: true, prUrl: pr.html_url, prNumber: pr.number }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to create PR' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
