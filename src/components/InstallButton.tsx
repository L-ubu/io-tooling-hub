import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoltIcon, TerminalIcon, BotIcon, ClipboardIcon, DownloadIcon, PuzzleIcon, MonitorIcon, LinkIcon } from './Icons';

interface InstallButtonProps {
  installType?: string;
  installTarget?: string[];
  installCommand?: string;
  cursorDeepLink?: string;
  downloadFile?: string;
  extensionId?: string;
  externalUrl?: string;
  title: string;
  rawContent?: string;
}

export default function InstallButton({
  installType,
  installTarget = [],
  installCommand,
  cursorDeepLink,
  downloadFile,
  extensionId,
  externalUrl,
  title,
  rawContent,
}: InstallButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);

  const copyToClipboard = async (text: string, target: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTarget(target);
      setTimeout(() => setCopiedTarget(null), 2000);
    } catch {
      // silent fail
    }
  };

  const getInstallActions = () => {
    const actions: { label: string; icon: ReactNode; target: string; action: () => void; primary?: boolean }[] = [];

    if (installType === 'mcp') {
      // Cursor deep link — the real one-click install
      if (installTarget.includes('cursor') && cursorDeepLink) {
        actions.push({
          label: 'Add to Cursor',
          icon: <BoltIcon size={16} />,
          target: 'cursor-deeplink',
          primary: true,
          action: () => {
            window.location.href = cursorDeepLink;
            setCopiedTarget('cursor-deeplink');
            setTimeout(() => setCopiedTarget(null), 2000);
          },
        });
      } else if (installTarget.includes('cursor') && installCommand) {
        // Fallback: copy config
        actions.push({
          label: 'Copy for Cursor',
          icon: <TerminalIcon size={16} />,
          target: 'cursor',
          action: () => copyToClipboard(installCommand, 'cursor'),
        });
      }

      if (installTarget.includes('claude-code') && installCommand) {
        const serverName = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const cmd = `claude mcp add ${serverName} ${installCommand}`;
        actions.push({
          label: 'Add to Claude Code',
          icon: <BotIcon size={16} />,
          target: 'claude-code',
          action: () => copyToClipboard(cmd, 'claude-code'),
        });
      }
    }

    if (installType === 'cursor-rule') {
      actions.push({
        label: 'Copy Rule',
        icon: <ClipboardIcon size={16} />,
        target: 'cursor-rule',
        primary: true,
        action: () => copyToClipboard(rawContent || '', 'cursor-rule'),
      });
    }

    if (installType === 'claude-file') {
      actions.push({
        label: 'Download File',
        icon: <DownloadIcon size={16} />,
        target: 'claude-file',
        primary: true,
        action: () => {
          const blob = new Blob([rawContent || ''], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = downloadFile || 'CLAUDE.md';
          a.click();
          URL.revokeObjectURL(url);
          setCopiedTarget('claude-file');
          setTimeout(() => setCopiedTarget(null), 2000);
        },
      });
    }

    if (installType === 'plugin') {
      if (extensionId) {
        actions.push({
          label: 'Install Extension',
          icon: <PuzzleIcon size={16} />,
          target: 'plugin',
          primary: true,
          action: () => {
            window.open(`vscode:extension/${extensionId}`, '_blank');
          },
        });
      }
      if (installCommand) {
        actions.push({
          label: 'Copy Install Command',
          icon: <MonitorIcon size={16} />,
          target: 'plugin-cmd',
          action: () => copyToClipboard(installCommand, 'plugin-cmd'),
        });
      }
    }

    // External URL for any type
    if (externalUrl) {
      actions.push({
        label: 'View Docs',
        icon: <LinkIcon size={16} />,
        target: 'external',
        action: () => window.open(externalUrl, '_blank'),
      });
    }

    return actions;
  };

  const actions = getInstallActions();

  if (actions.length === 0) return null;

  if (actions.length === 1) {
    const action = actions[0];
    return (
      <motion.button
        onClick={action.action}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md ${
          copiedTarget === action.target
            ? 'bg-green-500 text-white shadow-green-500/20'
            : 'bg-io-primary text-white hover:bg-io-primary-light shadow-io-primary/20 hover:shadow-io-primary/40'
        }`}
      >
        <span>{action.icon}</span>
        {copiedTarget === action.target ? 'Done!' : action.label}
      </motion.button>
    );
  }

  // Multiple actions: show primary + dropdown
  const primaryAction = actions.find((a) => a.primary) || actions[0];
  const otherActions = actions.filter((a) => a !== primaryAction);

  return (
    <div className="flex items-center gap-1">
      {/* Primary button */}
      <motion.button
        onClick={primaryAction.action}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-l-xl text-sm font-semibold transition-all duration-200 shadow-md ${
          copiedTarget === primaryAction.target
            ? 'bg-green-500 text-white shadow-green-500/20'
            : 'bg-io-primary text-white hover:bg-io-primary-light shadow-io-primary/20 hover:shadow-io-primary/40'
        }`}
      >
        <span>{primaryAction.icon}</span>
        {copiedTarget === primaryAction.target ? 'Done!' : primaryAction.label}
      </motion.button>

      {/* Dropdown toggle */}
      <div className="relative">
        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          whileTap={{ scale: 0.95 }}
          className="px-2.5 py-2.5 bg-io-primary text-white hover:bg-io-primary-light rounded-r-xl border-l border-white/20 transition-colors"
        >
          <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-io-gray-light/50 overflow-hidden min-w-[220px] z-50"
            >
              {otherActions.map((action) => (
                <button
                  key={action.target}
                  onClick={() => {
                    action.action();
                    setTimeout(() => setShowDropdown(false), 1500);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                    copiedTarget === action.target
                      ? 'bg-green-50 text-green-700'
                      : 'hover:bg-io-gray-light/50 text-io-text'
                  }`}
                >
                  <span>{action.icon}</span>
                  <span className="font-medium">
                    {copiedTarget === action.target ? 'Copied!' : action.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
