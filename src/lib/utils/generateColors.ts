export default function generateColors(route: string): string {
  let hash = 0;
  for (let i = 0; i < route.length; i++) {
    hash = route.charCodeAt(i) + ((hash << 5) - hash);
  }

  const norm = Math.abs(hash % 1000) / 1000;

  const lightness = 40 + norm * 35;

  return `hsl(220, 85%, ${lightness}%)`;
}
