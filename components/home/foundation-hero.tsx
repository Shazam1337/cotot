"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Radio } from "lucide-react";
import { Container } from "@/components/layout/container";
import heroNetworkImage from "@/public/assets/brand/dons-hero-network.png";
import attentionNetworkImage from "@/public/assets/brand/dons-attention-network.png";

const reveal = {
  hidden: { opacity: 1, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const facts = [
  { label: "Network", value: "Solana" },
  { label: "Signal", value: "Verified" },
  { label: "Settlement", value: "0.1842 SOL" },
];

export function FoundationHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-bg pb-16 pt-20 sm:pb-20 sm:pt-24">
      <Container>
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}
          className="mx-auto max-w-[920px] text-center"
        >
          <motion.p
            variants={reveal}
            className="type-label inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-text-secondary"
          >
            <Radio aria-hidden="true" className="size-3 text-lime" />
            The creator value layer
          </motion.p>
          <motion.h1
            variants={reveal}
            className="mt-7 font-display text-[clamp(3.25rem,8.4vw,8.8rem)] leading-[0.82] tracking-[-0.065em] text-text-primary"
          >
            <span className="block">Attention,</span>
            <span className="block italic">
              accounted<span className="hidden sm:inline"> for.</span>
            </span>
            <span className="block italic sm:hidden">for.</span>
          </motion.h1>
          <motion.p
            variants={reveal}
            className="mx-auto mt-8 max-w-[620px] text-[18px] leading-[1.5] tracking-[-0.02em] text-text-secondary sm:text-[20px]"
          >
            COTOT measures the impact creators generate and routes a transparent share of
            network fees back to them.
          </motion.p>
          <motion.div variants={reveal} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/wire"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-text-primary px-6 text-[14px] font-semibold text-bg transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              Explore live signals <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/proof"
              className="inline-flex h-12 items-center rounded-full border border-border-strong px-6 text-[14px] font-semibold text-text-primary transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              View the ledger
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-16 grid min-h-[420px] grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.78fr_1.1fr] md:items-end">
          <motion.article
            initial={reduceMotion ? false : { opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[360px] overflow-hidden rounded-[28px] bg-[#0b120c] md:h-[420px]"
          >
            <Image
              src={heroNetworkImage}
              alt="COTOT creator value network"
              fill
              priority
              sizes="(min-width: 768px) 36vw, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white sm:p-7">
              <div>
                <p className="type-label text-white/60">Live network</p>
                <p className="mt-3 max-w-[250px] text-[22px] font-semibold leading-[1.1] tracking-[-0.03em]">
                  Every signal leaves a visible trail.
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-[#0b120c]">
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </div>
          </motion.article>

          <motion.article
            initial={reduceMotion ? false : { opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[330px] flex-col justify-between rounded-[28px] bg-lime p-7 text-[#102317] md:min-h-[365px]"
          >
            <div className="flex items-center justify-between">
              <span className="type-label text-[#102317]/60">Signal 0427</span>
              <span className="grid size-9 place-items-center rounded-full bg-white/70">
                <Check aria-hidden="true" className="size-4" strokeWidth={2.2} />
              </span>
            </div>
            <div>
              <p className="font-display text-[54px] leading-[0.84] tracking-[-0.055em]">92.8</p>
              <p className="mt-3 text-[14px] font-semibold">Impact score</p>
            </div>
            <dl className="space-y-3 border-t border-[#102317]/20 pt-5">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between gap-4 text-[13px]">
                  <dt className="text-[#102317]/60">{fact.label}</dt>
                  <dd className="font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.article>

          <motion.article
            initial={reduceMotion ? false : { opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[360px] overflow-hidden rounded-[28px] bg-[#0b120c] md:h-[420px]"
          >
            <Image
              src={attentionNetworkImage}
              alt="Creator attention moving through COTOT"
              fill
              sizes="(min-width: 768px) 36vw, 100vw"
              className="object-cover object-center opacity-95 transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute left-5 top-5 rounded-full bg-bg/90 px-4 py-2 text-[12px] font-semibold text-text-primary backdrop-blur-md">
              Creator share active
            </div>
            <div className="absolute bottom-5 right-5 rounded-full bg-bg/90 px-4 py-2 font-mono text-[11px] text-text-primary backdrop-blur-md">
              +0.0184 SOL
            </div>
          </motion.article>
        </div>
      </Container>

      <div className="pixel-divider mt-16" aria-hidden="true" />
    </section>
  );
}
