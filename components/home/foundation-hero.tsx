"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { AttentionNetwork } from "@/components/home/attention-network";

const reveal = {
  hidden: { opacity: 1, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function FoundationHero() {
  return (
    <section className="h-[690px]">
      <Container className="grid grid-cols-12 items-start gap-8 pb-16 pt-[104px]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.12 }}
          className="col-span-7"
        >
          <motion.p
            variants={reveal}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="type-label mb-8 flex items-center gap-3 text-text-muted"
          >
            <span className="h-px w-9 bg-lime" />
            Creator revenue protocol
          </motion.p>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <span className="type-hero-word block text-text-secondary">DONS</span>
            <span className="type-display type-display-first block text-text-primary">
              ATTENTION
            </span>
            <span className="type-display block text-text-primary">PAYS.</span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="type-body mt-12 max-w-sm border-t border-border pt-7 text-text-secondary"
          >
            <span className="block">Create the conversation.</span>
            <span className="block">Earn your share of the fees it creates.</span>
          </motion.p>
        </motion.div>

        <div className="col-span-5 ml-3 -mt-5">
          <AttentionNetwork />
        </div>
      </Container>
    </section>
  );
}
