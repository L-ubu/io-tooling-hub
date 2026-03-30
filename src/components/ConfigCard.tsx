import { motion } from 'framer-motion';
import { categoryIconMap } from './Icons';

interface ConfigCardProps {
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  slug: string;
  featured?: boolean;
  index?: number;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'cursor-rules': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'mcp-configs': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'claude-files': { bg: 'bg-amber-100', text: 'text-amber-700' },
  plugins: { bg: 'bg-green-100', text: 'text-green-700' },
  skills: { bg: 'bg-rose-100', text: 'text-rose-700' },
};

const difficultyColors: Record<string, string> = {
  beginner: 'text-green-600',
  intermediate: 'text-amber-600',
  advanced: 'text-red-600',
};

export default function ConfigCard({
  title,
  description,
  author,
  category,
  tags,
  difficulty,
  slug,
  featured,
  index = 0,
}: ConfigCardProps) {
  const cat = categoryColors[category] || categoryColors['plugins'];

  return (
    <motion.a
      href={`/item/${category}/${slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group block bg-white rounded-2xl border border-io-gray-light/50 p-6 hover:shadow-xl hover:shadow-io-primary/5 transition-shadow duration-300 relative overflow-hidden"
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-io-accent/10 text-io-accent">
            Featured
          </span>
        </div>
      )}

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cat.bg} ${cat.text}`}>
          {categoryIconMap[category]?.({ size: 14 }) || categoryIconMap['plugins']!({ size: 14 })}
          {category.replace('-', ' ')}
        </span>
        <span className={`text-xs font-medium ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-io-text group-hover:text-io-primary transition-colors duration-200 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-io-text-muted line-clamp-2 mb-4">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-io-gray-light text-io-gray-dark"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-io-gray-light text-io-gray-dark">
            +{tags.length - 3}
          </span>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-io-text-muted">
          by <span className="font-medium text-io-text">{author}</span>
        </span>
        <span className="text-xs text-io-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View details →
        </span>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-io-primary/[0.02] to-io-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.a>
  );
}
