import { site } from "@/content/site";

/**
 * Sayt demo ma'lumot bilan ishlayotganini eslatib turadigan belgi.
 * `src/content/site.ts` da `isDemo: false` qilinganda o'zi yo'qoladi.
 */
export function DemoBadge({ label }: { label: string }) {
  if (!site.isDemo) return null;

  return (
    <p className="pointer-events-none fixed bottom-4 left-4 z-30 flex h-8 items-center gap-2 rounded-full bg-ink/90 px-3.5 text-xs font-medium text-white shadow-lg shadow-black/20 backdrop-blur">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {label}
    </p>
  );
}
