import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

interface HeroProps {
  searchItems: { title: string; description: string; category: string; slug: string; tags: string[] }[];
}

export default function Hero({ searchItems }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-io-primary via-io-primary-light to-io-accent min-h-[480px] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-io-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -30, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 right-[30%] w-48 h-48 bg-white/5 rounded-full blur-2xl"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/90 backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open for contributions
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            iO{' '}
            <span className="relative">
              <span className="relative z-10">Tooling Hub</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-2 left-0 h-3 bg-io-accent/30 rounded-full -z-0"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Discover, share, and instantly install AI tooling configs.
            <br className="hidden sm:block" />
            Cursor rules, MCP servers, Claude instructions, and more.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <SearchBar items={searchItems} />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-8"
          >
            {[
              { label: 'Configs', value: searchItems.length },
              { label: 'Categories', value: '4' },
              { label: 'One-click install', value: '✓' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
