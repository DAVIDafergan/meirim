"use client";

import { motion } from "framer-motion";

export default function Divider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <motion.span
        initial={{ rotate: 45 }}
        animate={{ rotate: 405 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="h-1.5 w-1.5 bg-gold/60"
      />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}
