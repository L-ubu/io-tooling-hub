interface IconProps {
  size?: number;
  className?: string;
}

const defaults = { size: 20, className: '' };

function svg(props: IconProps, d: string, opts?: { fill?: boolean; viewBox?: string; extra?: string }) {
  const { size, className } = { ...defaults, ...props };
  const vb = opts?.viewBox || '0 0 24 24';
  return (
    <svg
      width={size}
      height={size}
      viewBox={vb}
      fill={opts?.fill ? 'currentColor' : 'none'}
      stroke={opts?.fill ? 'none' : 'currentColor'}
      strokeWidth={opts?.fill ? undefined : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: d + (opts?.extra || '') }}
    />
  );
}

export function HomeIcon(props: IconProps = {}) {
  return svg(props, '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/>');
}

export function RulerIcon(props: IconProps = {}) {
  return svg(props, '<path d="M5.5 3.5l15 15M3.5 8.5l4-4M6.5 11.5l2-2M9.5 14.5l2-2M12.5 17.5l2-2M15.5 20.5l4-4"/>');
}

export function PlugIcon(props: IconProps = {}) {
  return svg(props, '<path d="M12 22v-4m0 0a4 4 0 004-4v-1H8v1a4 4 0 004 4zM8 6V2m8 4V2m-9 5h10"/>');
}

export function FileTextIcon(props: IconProps = {}) {
  return svg(props, '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>');
}

export function PuzzleIcon(props: IconProps = {}) {
  return svg(props, '<path d="M12 2a3 3 0 00-3 3c0 .6.2 1.2.5 1.6L9 7H5a2 2 0 00-2 2v4l.4.5c.4.3 1 .5 1.6.5a3 3 0 010 6c-.6 0-1.2-.2-1.6-.5L3 19v2a2 2 0 002 2h4l.5-.4c.3-.4.5-1 .5-1.6a3 3 0 016 0c0 .6-.2 1.2-.5 1.6l.5.4h4a2 2 0 002-2v-4l-.4-.5c-.4-.3-1-.5-1.6-.5a3 3 0 010-6c.6 0 1.2.2 1.6.5L21 11V9a2 2 0 00-2-2h-4l-.5-.4A3.1 3.1 0 0115 5a3 3 0 00-3-3z"/>');
}

export function BoltIcon(props: IconProps = {}) {
  return svg(props, '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>');
}

export function LinkIcon(props: IconProps = {}) {
  return svg(props, '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>');
}

export function StarIcon(props: IconProps = {}) {
  return svg(props, '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>');
}

export function TerminalIcon(props: IconProps = {}) {
  return svg(props, '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>');
}

export function BotIcon(props: IconProps = {}) {
  return svg(props, '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="16" x2="8" y2="16" stroke-width="2"/><line x1="16" y1="16" x2="16" y2="16" stroke-width="2"/>');
}

export function ClipboardIcon(props: IconProps = {}) {
  return svg(props, '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>');
}

export function DownloadIcon(props: IconProps = {}) {
  return svg(props, '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>');
}

export function MonitorIcon(props: IconProps = {}) {
  return svg(props, '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>');
}

export function BoxIcon(props: IconProps = {}) {
  return svg(props, '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>');
}

export function CheckCircleIcon(props: IconProps = {}) {
  return svg(props, '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>');
}

// Map from category ID to icon component — for use in React components
export const categoryIconMap: Record<string, (props?: IconProps) => JSX.Element> = {
  all: HomeIcon,
  'cursor-rules': RulerIcon,
  'mcp-configs': PlugIcon,
  'claude-files': FileTextIcon,
  plugins: PuzzleIcon,
  skills: BoltIcon,
  link: LinkIcon,
};
