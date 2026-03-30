import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './Toast';
import { RulerIcon, PlugIcon, FileTextIcon, PuzzleIcon, BoltIcon, LinkIcon, BoxIcon, CheckCircleIcon, categoryIconMap } from './Icons';

const CATEGORIES: { id: string; label: string; icon: ReactNode; desc: string }[] = [
  { id: 'cursor-rules', label: 'Cursor Rule', icon: <RulerIcon size={28} />, desc: 'AI behavior rules for Cursor IDE' },
  { id: 'mcp-configs', label: 'MCP Config', icon: <PlugIcon size={28} />, desc: 'Model Context Protocol server setup' },
  { id: 'claude-files', label: 'Claude File', icon: <FileTextIcon size={28} />, desc: 'CLAUDE.md instructions & templates' },
  { id: 'plugins', label: 'Plugin / Extension', icon: <PuzzleIcon size={28} />, desc: 'IDE extensions & CLI tools' },
  { id: 'skills', label: 'Skill / Workflow', icon: <BoltIcon size={28} />, desc: 'Reusable AI workflows, prompts, and skill files' },
  { id: 'link', label: 'External Link', icon: <LinkIcon size={28} />, desc: 'Link to an existing tool, plugin, or resource' },
];

const DIFFICULTIES = [
  { id: 'beginner', label: 'Beginner', color: 'text-green-600 bg-green-50 border-green-200' },
  { id: 'intermediate', label: 'Intermediate', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'advanced', label: 'Advanced', color: 'text-red-600 bg-red-50 border-red-200' },
];

interface SubmitItem {
  id: string;
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

function createEmptyItem(): SubmitItem {
  return {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    tags: '',
    content: '',
    externalUrl: '',
    installCommand: '',
    author: '',
  };
}

interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
}

const STORAGE_KEY = 'io_hub_draft';

function loadDraft(): { items: SubmitItem[]; activeItemIndex: number; step: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.items?.length > 0) return data;
  } catch {}
  return null;
}

function saveDraft(items: SubmitItem[], activeItemIndex: number, step: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, activeItemIndex, step }));
  } catch {}
}

function clearDraft() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

export default function SubmitForm() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const draft = loadDraft();
  const [items, setItems] = useState<SubmitItem[]>(draft?.items || [createEmptyItem()]);
  const [activeItemIndex, setActiveItemIndex] = useState(draft?.activeItemIndex || 0);
  const [step, setStep] = useState(draft?.step || 0);
  const [submitting, setSubmitting] = useState(false);

  const activeItem = items[activeItemIndex];

  // Persist draft on every change
  useEffect(() => {
    if (step < 4) saveDraft(items, activeItemIndex, step);
  }, [items, activeItemIndex, step]);

  useEffect(() => {
    fetch('/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setAuthLoading(false));
  }, []);

  const updateItem = (field: keyof SubmitItem, value: string) => {
    setItems((prev) =>
      prev.map((item, i) => (i === activeItemIndex ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    const newItem = createEmptyItem();
    setItems((prev) => [...prev, newItem]);
    setActiveItemIndex(items.length);
    setStep(0);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
    if (activeItemIndex >= index && activeItemIndex > 0) {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  const [prUrl, setPrUrl] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Auto-fill author from GitHub user if not set
      const submittableItems = items.map((item) => ({
        ...item,
        author: item.author || user.name || user.login,
      }));
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: submittableItems }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Submission failed', 'error');
        return;
      }
      setPrUrl(data.prUrl);
      clearDraft();
      showToast('Pull request created successfully!', 'success');
      setStep(4);
    } catch {
      showToast('Failed to submit. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const isLinkMode = activeItem.category === 'link';
  const stepLabels = isLinkMode ? ['Type', 'Link Details'] : ['Type', 'Details', 'Content', 'Review'];

  const canProceedToContent = activeItem.title.trim() && activeItem.description.trim();
  const canSubmit = items.every((item) => {
    if (item.category === 'link') return item.title && item.externalUrl;
    return item.title && item.description && item.content;
  });

  // --- Loading State ---
  if (authLoading) {
    return (
      <div className="flex justify-center py-12">
        <svg className="w-6 h-6 animate-spin text-io-primary" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  // --- GitHub Login Gate ---
  if (!user) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-io-gray-light/50 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-io-surface-dark rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-io-text mb-2">Sign in to submit</h2>
            <p className="text-sm text-io-text-muted">
              Log in with your GitHub account to create a pull request with your config.
            </p>
          </div>
          <div className="max-w-xs mx-auto">
            <a
              href="/auth/login"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-semibold bg-io-surface-dark text-white hover:bg-io-surface-dark/90 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Sign in with GitHub
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- Item Tabs (when multiple items) ---
  const renderItemTabs = () => (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
      {items.map((item, i) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveItemIndex(i);
            setStep(item.category ? (item.title ? (item.content || item.category === 'link' ? 3 : 2) : 1) : 0);
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            i === activeItemIndex
              ? 'bg-io-primary text-white shadow-md shadow-io-primary/20'
              : 'bg-io-gray-light text-io-gray-dark hover:bg-io-gray-light/80'
          }`}
        >
          <span className="flex items-center">{CATEGORIES.find((c) => c.id === item.category)?.icon || <BoxIcon size={16} />}</span>
          <span className="max-w-[120px] truncate">{item.title || `Item ${i + 1}`}</span>
          {items.length > 1 && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                removeItem(i);
              }}
              className="ml-1 w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] hover:bg-red-500 hover:text-white cursor-pointer"
            >
              ×
            </span>
          )}
        </button>
      ))}
      <button
        onClick={addItem}
        className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium border-2 border-dashed border-io-gray-light text-io-gray hover:border-io-primary/30 hover:text-io-primary transition-all whitespace-nowrap"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add another
      </button>
    </div>
  );

  // --- Progress Steps ---
  const renderProgress = () => (
    <div className="flex items-center gap-2 mb-8">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <button
            onClick={() => i < step && setStep(i)}
            disabled={i >= step}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              i === step
                ? 'bg-io-primary text-white'
                : i < step
                ? 'bg-io-primary/10 text-io-primary cursor-pointer hover:bg-io-primary/20'
                : 'bg-io-gray-light text-io-gray cursor-default'
            }`}
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold bg-current/20">
              {i < step ? '✓' : i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
          {i < stepLabels.length - 1 && (
            <div className={`w-6 h-0.5 ${i < step ? 'bg-io-primary' : 'bg-io-gray-light'}`} />
          )}
        </div>
      ))}
    </div>
  );

  // --- Step 4: Success ---
  if (step === 4) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="mb-4 text-green-500 flex justify-center"
        >
          <CheckCircleIcon size={64} />
        </motion.div>
        <h2 className="text-2xl font-bold text-io-text mb-2">
          {items.length > 1 ? `${items.length} configs submitted!` : 'Config submitted!'}
        </h2>
        <p className="text-io-text-muted mb-8">
          A pull request has been created. Your config will go live after review.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {prUrl && (
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-io-primary text-white hover:bg-io-primary-light transition-all"
            >
              View Pull Request
            </a>
          )}
          <a
            href="/"
            className="px-6 py-2.5 rounded-xl text-sm font-medium border border-io-gray-light text-io-gray-dark hover:bg-io-gray-light/50 transition-all"
          >
            Back to Home
          </a>
          <button
            onClick={() => {
              clearDraft();
              setItems([createEmptyItem()]);
              setActiveItemIndex(0);
              setStep(0);
            }}
            className="px-6 py-2.5 rounded-xl text-sm font-medium bg-io-primary text-white hover:bg-io-primary-light transition-all"
          >
            Submit More
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Logged-in user bar */}
      <div className="flex items-center justify-between mb-6 px-4 py-3 bg-io-gray-light/30 rounded-xl border border-io-gray-light/50">
        <div className="flex items-center gap-3">
          <img src={user.avatarUrl} alt={user.login} className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-sm font-semibold text-io-text">{user.name}</div>
            <div className="text-xs text-io-text-muted">@{user.login}</div>
          </div>
        </div>
        <a
          href="/auth/logout"
          className="text-xs text-io-text-muted hover:text-io-text transition-colors"
        >
          Sign out
        </a>
      </div>

      {renderItemTabs()}
      {renderProgress()}

      {/* Step 0: Category */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-xl font-bold text-io-text mb-1">What are you sharing?</h2>
          <p className="text-sm text-io-text-muted mb-6">Choose the type of config, or share a link to an existing tool.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  updateItem('category', cat.id);
                  setStep(1);
                }}
                className={`p-5 rounded-2xl border-2 text-left transition-all hover:shadow-lg group ${
                  activeItem.category === cat.id
                    ? 'border-io-primary bg-io-primary/5 shadow-md shadow-io-primary/10'
                    : 'border-io-gray-light hover:border-io-primary/30'
                }`}
              >
                <span className="text-io-gray-dark">{cat.icon}</span>
                <div className="font-bold text-io-text mt-2 group-hover:text-io-primary transition-colors">{cat.label}</div>
                <div className="text-xs text-io-text-muted mt-1">{cat.desc}</div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 1: Details (or Link Details for link mode) */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h2 className="text-xl font-bold text-io-text mb-1">
            {isLinkMode ? 'Link details' : 'Config details'}
          </h2>

          <div>
            <label className="block text-sm font-semibold text-io-text mb-1.5">Title *</label>
            <input
              type="text"
              value={activeItem.title}
              onChange={(e) => updateItem('title', e.target.value)}
              placeholder={isLinkMode ? 'e.g., Smithery MCP Registry' : 'e.g., Prisma MCP Server'}
              className="w-full px-4 py-2.5 border-2 border-io-gray-light rounded-xl text-sm focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-io-text mb-1.5">Description *</label>
            <textarea
              value={activeItem.description}
              onChange={(e) => updateItem('description', e.target.value)}
              placeholder="What does this do? Why is it useful for iO colleagues?"
              rows={3}
              className="w-full px-4 py-2.5 border-2 border-io-gray-light rounded-xl text-sm focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all resize-none"
            />
          </div>

          {isLinkMode && (
            <div>
              <label className="block text-sm font-semibold text-io-text mb-1.5">URL *</label>
              <input
                type="url"
                value={activeItem.externalUrl}
                onChange={(e) => updateItem('externalUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 border-2 border-io-gray-light rounded-xl text-sm focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-io-text mb-1.5">Your name</label>
            <input
              type="text"
              value={activeItem.author}
              onChange={(e) => updateItem('author', e.target.value)}
              placeholder="e.g., Luca"
              className="w-full px-4 py-2.5 border-2 border-io-gray-light rounded-xl text-sm focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all"
            />
          </div>

          {!isLinkMode && (
            <>
              <div>
                <label className="block text-sm font-semibold text-io-text mb-1.5">Difficulty</label>
                <div className="flex gap-2">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => updateItem('difficulty', d.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        activeItem.difficulty === d.id
                          ? d.color + ' border-current'
                          : 'border-io-gray-light text-io-gray-dark hover:border-io-primary/30'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-io-text mb-1.5">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={activeItem.tags}
                  onChange={(e) => updateItem('tags', e.target.value)}
                  placeholder="e.g., database, prisma, backend"
                  className="w-full px-4 py-2.5 border-2 border-io-gray-light rounded-xl text-sm focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all"
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setStep(0)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium border border-io-gray-light text-io-gray-dark hover:bg-io-gray-light/50 transition-all"
            >
              Back
            </button>
            {isLinkMode ? (
              <button
                onClick={() => setStep(3)}
                disabled={!activeItem.title || !activeItem.externalUrl}
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-io-primary text-white hover:bg-io-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review
              </button>
            ) : (
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedToContent}
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-io-primary text-white hover:bg-io-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Step 2: Content (non-link items) */}
      {step === 2 && !isLinkMode && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h2 className="text-xl font-bold text-io-text mb-1">Config content</h2>

          <div>
            <label className="block text-sm font-semibold text-io-text mb-1.5">
              Markdown Content *
            </label>
            <p className="text-xs text-io-text-muted mb-2">
              Write the full documentation. Include setup instructions, config blocks, and tips.
            </p>
            <textarea
              value={activeItem.content}
              onChange={(e) => updateItem('content', e.target.value)}
              placeholder={"## What it does\n\n...\n\n## Setup\n\n...\n\n## Config\n\n```json\n{ }\n```"}
              rows={14}
              className="w-full px-4 py-3 border-2 border-io-gray-light rounded-xl text-sm font-mono focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-io-text mb-1.5">
              Install Command (optional)
            </label>
            <p className="text-xs text-io-text-muted mb-2">
              CLI command to install this config (e.g., npx command for MCP servers).
            </p>
            <input
              type="text"
              value={activeItem.installCommand}
              onChange={(e) => updateItem('installCommand', e.target.value)}
              placeholder="npx -y @modelcontextprotocol/server-example"
              className="w-full px-4 py-2.5 border-2 border-io-gray-light rounded-xl text-sm font-mono focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-io-text mb-1.5">
              External URL (optional)
            </label>
            <input
              type="url"
              value={activeItem.externalUrl}
              onChange={(e) => updateItem('externalUrl', e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-4 py-2.5 border-2 border-io-gray-light rounded-xl text-sm focus:border-io-primary focus:ring-4 focus:ring-io-primary/10 outline-none transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium border border-io-gray-light text-io-gray-dark hover:bg-io-gray-light/50 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!activeItem.content}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-io-primary text-white hover:bg-io-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-xl font-bold text-io-text mb-1">Review your submission</h2>
          <p className="text-sm text-io-text-muted mb-6">
            {items.length > 1
              ? `You're submitting ${items.length} items. Review them below.`
              : 'Make sure everything looks good before submitting.'}
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item, i) => {
              const cat = CATEGORIES.find((c) => c.id === item.category);
              return (
                <div key={item.id} className="bg-io-gray-light/30 rounded-2xl p-5 border border-io-gray-light/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-io-gray-dark">{cat?.icon}</span>
                        <span className="text-xs font-semibold text-io-text-muted uppercase tracking-wider">
                          {cat?.label}
                        </span>
                        {item.difficulty && (
                          <span className="text-xs font-medium text-io-gray">{item.difficulty}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-io-text text-lg">{item.title}</h3>
                      <p className="text-sm text-io-text-muted mt-1">{item.description}</p>
                      {item.externalUrl && (
                        <p className="text-xs text-io-primary mt-2 truncate">{item.externalUrl}</p>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.split(',').map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white text-io-gray-dark">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setActiveItemIndex(i);
                        setStep(1);
                      }}
                      className="text-xs text-io-primary hover:text-io-primary-light font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(isLinkMode ? 1 : 2)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium border border-io-gray-light text-io-gray-dark hover:bg-io-gray-light/50 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="px-8 py-2.5 rounded-xl text-sm font-semibold bg-io-primary text-white hover:bg-io-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-io-primary/20"
            >
              {submitting && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {submitting
                ? 'Submitting...'
                : items.length > 1
                ? `Submit ${items.length} Items`
                : 'Submit Config'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
