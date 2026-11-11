import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/**
 * /robots.txt. Demo rejimida ham skanerlash ochiq qoladi: sahifalar
 * `noindex` meta tegi orqali yashiriladi (layout.tsx), uni ko'rish uchun
 * qidiruv roboti sahifani o'qiy olishi kerak.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
