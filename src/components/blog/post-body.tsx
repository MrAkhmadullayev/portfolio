import type { Block } from "@/content/posts";

/** Maqola bloklarini (paragraf, sarlavha, ro'yxat, kod) HTML ga aylantiradi. */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex max-w-[45rem] flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-semibold tracking-[-0.025em]"
              >
                {block.text}
              </h2>
            );

          case "ul":
            return (
              <ul key={index} className="flex flex-col gap-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-6 text-[1.1875rem] leading-[1.6] before:absolute before:top-[0.72em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <div key={index} className="overflow-hidden rounded-2xl bg-night">
                <p className="px-5 pt-4 font-mono text-xs font-semibold tracking-wider text-ash uppercase">
                  {block.lang}
                </p>
                {/* tabIndex: uzun qatorlarni klaviatura bilan gorizontal aylantirish uchun */}
                <pre
                  tabIndex={0}
                  className="overflow-x-auto px-5 pt-3 pb-5 font-mono text-sm leading-[1.65] text-snow"
                >
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          default:
            return (
              <p
                key={index}
                className="text-[1.1875rem] leading-[1.65] text-pretty"
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
