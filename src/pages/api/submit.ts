export const prerender = false;

import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';
import { getSession } from '../../lib/auth';

const REPO_OWNER = 'L-ubu';
const REPO_NAME = 'io-tooling-hub';

interface SubmitItem {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string;
  content: string;
  externalUrl: string;
  installCommand: string;
  author: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildFrontmatter(item: SubmitItem): string {
  const now = new Date().toISOString().split('T')[0];
  const tags = item.tags
    ? item.tags.split(',').map((t) => `"${t.trim()}"`).join(', ')
    : '';

  let fm = `---\ntitle: "${item.title}"\ndescription: "${item.description}"\nauthor: "${item.author || 'Anonymous'}"\ntags: [${tags}]\ndifficulty: "${item.difficulty || 'beginner'}"\ncreatedAt: ${now}\nupdatedAt: ${now}\nfeatured: false\n`;

  if (item.installCommand) fm += `installCommand: "${item.installCommand}"\n`;
  if (item.externalUrl) fm += `externalUrl: "${item.externalUrl}"\n`;

  const typeMap: Record<string, string> = {
    'cursor-rules': 'cursor-rule',
    'mcp-configs': 'mcp',
    'claude-files': 'claude-file',
    plugins: 'plugin',
    skills: 'skill',
  };
  if (typeMap[item.category]) fm += `installType: "${typeMap[item.category]}"\n`;

  fm += '---\n\n';
  return fm;
}

export const POST: APIRoute = async ({ request }) => {
  // Authenticate via session cookie
  const session = await getSession(request.headers.get('cookie'));
  if (!session) {
    return new Response(JSON.stringify({ error: 'Not authenticated. Please log in with GitHub.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { items: SubmitItem[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.items || body.items.length === 0) {
    return new Response(JSON.stringify({ error: 'No items provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Use the user's own GitHub token
  const octokit = new Octokit({ auth: session.token });

  try {
    // First, fork the repo if the user doesn't own it
    let forkOwner = session.login;
    let forkRepo = REPO_NAME;

    if (session.login !== REPO_OWNER) {
      try {
        await octokit.rest.repos.createFork({
          owner: REPO_OWNER,
          repo: REPO_NAME,
        });
        // Wait briefly for fork to be ready
        await new Promise((r) => setTimeout(r, 2000));
      } catch {
        // Fork might already exist, that's fine
      }
    } else {
      forkOwner = REPO_OWNER;
    }

    // Get the SHA of the main branch from the original repo
    const { data: ref } = await octokit.rest.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: 'heads/main',
    });
    const baseSha = ref.object.sha;

    // Create a new branch on the fork (or origin if owner)
    const branchName = `submit/${slugify(body.items[0].title)}-${Date.now()}`;
    await octokit.rest.git.createRef({
      owner: forkOwner,
      repo: forkRepo,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    });

    // Create files for each item
    for (const item of body.items) {
      const slug = slugify(item.title);
      let path: string;
      let fileContent: string;

      if (item.category === 'link') {
        // Links get a submission record file
        path = `src/content/links/${slug}.md`;
        fileContent = `---\ntitle: "${item.title}"\ndescription: "${item.description}"\nauthor: "${item.author || 'Anonymous'}"\nexternalUrl: "${item.externalUrl}"\ncreatedAt: ${new Date().toISOString().split('T')[0]}\n---\n`;
      } else {
        path = `src/content/${item.category}/${slug}.md`;
        fileContent = buildFrontmatter(item) + item.content;
      }

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: forkOwner,
        repo: forkRepo,
        path,
        message: `feat: add ${item.title}`,
        content: Buffer.from(fileContent).toString('base64'),
        branch: branchName,
      });
    }

    // Create the PR (from fork to original repo)
    const prTitle = body.items.length > 1
      ? `[Submit] ${body.items.length} new configs`
      : `[Submit] ${body.items[0].title}`;

    const itemSummary = body.items
      .map((item) => `- **${item.title}** (${item.category})`)
      .join('\n');

    const head = session.login !== REPO_OWNER
      ? `${forkOwner}:${branchName}`
      : branchName;

    const { data: pr } = await octokit.rest.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: prTitle,
      body: `## New submission\n\nSubmitted by **@${session.login}** via the Tooling Hub.\n\n${itemSummary}`,
      head,
      base: 'main',
    });

    return new Response(JSON.stringify({ success: true, prUrl: pr.html_url, prNumber: pr.number }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to create PR' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
