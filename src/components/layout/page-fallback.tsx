/**
 * Sahifa kontenti hali kelmagan qisqa lahzada ko'rinadigan bo'sh joy.
 * Amalda kam ko'rinadi: sahifalar statik va havolalar ularni oldindan yuklaydi
 * (<Link prefetch>). Balandlik footer sakrab ketmasligi uchun beriladi.
 */
export function PageFallback() {
  return <main aria-busy="true" className="min-h-dvh flex-1 bg-white" />;
}
