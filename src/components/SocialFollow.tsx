"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61552477960447";
const TIKTOK_URL = "https://www.tiktok.com/@haravnatan";
const WHATSAPP_URL = "https://chat.whatsapp.com/I9fkagnrPLCKsYEDZvMwfa";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.58v1.89h2.78l-.45 2.91h-2.33v7.03C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M16.5 2c.35 2.24 1.72 3.86 3.8 4.24v3.05c-1.35.03-2.58-.4-3.8-1.16v6.4c0 3.2-2.6 5.47-5.62 5.47a5.62 5.62 0 0 1-2.05-10.85 5.5 5.5 0 0 1 2.05-.4c.24 0 .48.02.72.05v3.13a2.6 2.6 0 1 0 1.83 2.48V2h3.07Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm5.6 14.3c-.24.66-1.36 1.26-1.9 1.34-.5.08-1.05.11-1.7-.1a10.5 10.5 0 0 1-1.53-.58c-2.7-1.17-4.42-3.9-4.55-4.08-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97 1-2.24.24-.24.53-.3.7-.3h.5c.16 0 .38-.02.6.44.24.53.8 1.83.87 1.96.07.13.11.29.02.47-.1.18-.14.3-.28.46-.15.16-.3.36-.43.49-.14.13-.29.28-.13.55.17.28.75 1.24 1.62 2.01 1.11 1 2.05 1.31 2.33 1.45.28.15.44.13.61-.07.17-.2.72-.84.9-1.13.19-.29.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.53.33.07.13.07.72-.17 1.41Z" />
    </svg>
  );
}

export default function SocialFollow() {
  const { t } = useLanguage();
  const platforms = [
    { name: "Facebook", url: FACEBOOK_URL, Icon: FacebookIcon, color: "#1877F2" },
    { name: "TikTok", url: TIKTOK_URL, Icon: TikTokIcon, color: "#111111" },
    { name: "WhatsApp", url: WHATSAPP_URL, Icon: WhatsAppIcon, color: "#25D366" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {platforms.map((p) => (
        <motion.a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md transition-shadow duration-300 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(253,224,71,0.18)]"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: p.color }}
          >
            <p.Icon className="h-6 w-6" />
          </span>
          <div className="text-start">
            <p className="font-display font-black text-lg text-white">{p.name}</p>
            <p className="text-xs text-gray-400">{t.social.cta}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
