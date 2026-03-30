import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: { id: string; label: string; icon: string; count: number }[];
  activeCategory: string;
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <motion.a
            key={cat.id}
            href={`/browse/${cat.id}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-io-primary text-white shadow-md shadow-io-primary/20'
                : 'bg-white text-io-gray-dark border border-io-gray-light hover:border-io-primary/30 hover:text-io-primary'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span
              className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-io-gray-light text-io-gray'
              }`}
            >
              {cat.count}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
