import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  featured: z.boolean().default(false),
  installType: z.enum(['mcp', 'cursor-rule', 'claude-file', 'plugin', 'skill']).optional(),
  installTarget: z.array(z.string()).optional(),
  installCommand: z.string().optional(),
  cursorDeepLink: z.string().optional(),
  downloadFile: z.string().optional(),
  extensionId: z.string().optional(),
  externalUrl: z.string().optional(),
});

const cursorRules = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cursor-rules' }),
  schema: baseSchema,
});

const mcpConfigs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mcp-configs' }),
  schema: baseSchema,
});

const claudeFiles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/claude-files' }),
  schema: baseSchema,
});

const plugins = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plugins' }),
  schema: baseSchema,
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: baseSchema,
});

export const collections = {
  'cursor-rules': cursorRules,
  'mcp-configs': mcpConfigs,
  'claude-files': claudeFiles,
  plugins,
  skills,
};
