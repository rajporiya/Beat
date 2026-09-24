export const getFallbackArtwork = (title: string) => {
  const encodedTitle = encodeURIComponent(title.slice(0, 16));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#282828"/>
        <stop offset="100%" stop-color="#121212"/>
      </linearGradient>
    </defs>
    <rect width="300" height="300" fill="url(#g)"/>
    <circle cx="150" cy="150" r="45" fill="#181818" stroke="#333" stroke-width="2"/>
    <polygon points="142,130 168,150 142,170" fill="#1ed760"/>
    <text x="150" y="240" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#a1a1aa" text-anchor="middle">${encodedTitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
