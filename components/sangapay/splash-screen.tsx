"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="flex min-h-dvh flex-col justify-between py-8">
      <div className="flex flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-[32px] bg-[var(--color-ink)] shadow-[var(--shadow-card)]"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[var(--color-emerald)] text-3xl font-semibold text-white">
            S
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
          className="mt-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            SangaPay
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
            Send XAF Across Borders.
          </h1>
          <p className="mx-auto mt-4 max-w-[18rem] text-sm leading-6 text-slate-500">
            Premium remittance for African users moving Cameroon XAF into Europe and via
            global crypto rails.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
        className="space-y-3"
      >
        <Link
          href="/onboarding"
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--color-emerald)] text-sm font-semibold text-white"
        >
          Get Started
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/login"
          className="flex h-14 items-center justify-center rounded-full border border-[var(--color-ring)] bg-white text-sm font-semibold text-slate-950 shadow-[var(--shadow-card)]"
        >
          I already have an account
        </Link>
      </motion.div>
    </div>
  );
}
