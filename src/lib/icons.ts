// SVG icon strings for use in Astro templates via set:html
// All icons: 20x20, outlined, stroke currentColor, strokeWidth 1.5

function icon(d: string, size = 20): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
}

export const iconStrings: Record<string, string> = {
  home: icon('<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/>'),
  ruler: icon('<path d="M5.5 3.5l15 15M3.5 8.5l4-4M6.5 11.5l2-2M9.5 14.5l2-2M12.5 17.5l2-2M15.5 20.5l4-4"/>'),
  plug: icon('<path d="M12 22v-4m0 0a4 4 0 004-4v-1H8v1a4 4 0 004 4zM8 6V2m8 4V2m-9 5h10"/>'),
  fileText: icon('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>'),
  puzzle: icon('<path d="M12 2a3 3 0 00-3 3c0 .6.2 1.2.5 1.6L9 7H5a2 2 0 00-2 2v4l.4.5c.4.3 1 .5 1.6.5a3 3 0 010 6c-.6 0-1.2-.2-1.6-.5L3 19v2a2 2 0 002 2h4l.5-.4c.3-.4.5-1 .5-1.6a3 3 0 016 0c0 .6-.2 1.2-.5 1.6l.5.4h4a2 2 0 002-2v-4l-.4-.5c-.4-.3-1-.5-1.6-.5a3 3 0 010-6c.6 0 1.2.2 1.6.5L21 11V9a2 2 0 00-2-2h-4l-.5-.4A3.1 3.1 0 0115 5a3 3 0 00-3-3z"/>'),
  bolt: icon('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'),
  link: icon('<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>'),
  star: icon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
  terminal: icon('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'),
  bot: icon('<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="16" x2="8" y2="16" stroke-width="2"/><line x1="16" y1="16" x2="16" y2="16" stroke-width="2"/>'),
  clipboard: icon('<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>'),
  download: icon('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
  monitor: icon('<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'),
  box: icon('<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'),
  checkCircle: icon('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'),
};

// Category ID → icon string key
export const categoryIconKeys: Record<string, string> = {
  all: 'home',
  'cursor-rules': 'ruler',
  'mcp-configs': 'plug',
  'claude-files': 'fileText',
  plugins: 'puzzle',
  skills: 'bolt',
  link: 'link',
};

export function getCategoryIcon(category: string, size = 20): string {
  const key = categoryIconKeys[category] || 'box';
  const d = iconStrings[key];
  if (size === 20) return d;
  return d.replace(/width="20" height="20"/, `width="${size}" height="${size}"`);
}
