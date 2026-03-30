import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryIconMap, BoxIcon } from './Icons';

interface SearchItem {
  title: string;
  description: string;
  category: string;
  slug: string;
  tags: string[];
}

interface SearchBarProps {
  items: SearchItem[];
}

export default function SearchBar({ items }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query, items]);

  const getCategoryIcon = (cat: string) => {
    const IconFn = categoryIconMap[cat];
    return IconFn ? <IconFn size={16} /> : <BoxIcon size={16} />;
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center transition-all duration-300 ${
          focused ? 'scale-[1.02]' : ''
        }`}
      >
        <svg
          className="absolute left-4 w-5 h-5 text-io-gray"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search configs, rules, MCP servers, plugins..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-io-gray-light rounded-2xl text-sm text-io-text placeholder:text-io-gray focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 text-io-gray hover:text-io-text transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-io-gray-light/50 overflow-hidden z-50"
          >
            {results.map((item, i) => (
              <a
                key={`${item.category}-${item.slug}`}
                href={`/item/${item.category}/${item.slug}`}
                className="flex items-start gap-3 px-4 py-3 hover:bg-io-gray-light/30 transition-colors border-b border-io-gray-light/30 last:border-0"
              >
                <span className="mt-0.5 text-io-gray-dark">{getCategoryIcon(item.category)}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-io-text truncate">{item.title}</div>
                  <div className="text-xs text-io-text-muted truncate">{item.description}</div>
                </div>
                <span className="text-[10px] font-medium text-io-gray uppercase tracking-wider mt-1">
                  {item.category.replace('-', ' ')}
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
