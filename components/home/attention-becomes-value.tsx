"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import donsHeroNetwork from "@/public/assets/brand/dons-hero-network.png";

const economicFlow = [
  "Posts",
  "Attention",
  "Trading",
  "Fees",
  "Creator pool",
  "Creator rewards",
];

const reveal = {
  hidden: { opacity: 0.68, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export function AttentionBecomesValue() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="attention-value-heading"
      className="h-[740px] overflow-hidden border-b border-border"
    >
      <Container className="grid h-full grid-cols-12 items-start gap-8 pt-[128px]">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.32 }}
          transition={{ staggerChildren: reduceMotion ? 0 : 0.09 }}
          className="col-span-5 relative z-10"
        >
          <motion.p
            variants={reveal}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="type-label flex items-center gap-3 text-text-muted"
          >
            <span className="h-px w-9 bg-lime" />
            The DONS loop
          </motion.p>

          <motion.h2
            id="attention-value-heading"
            variants={reveal}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[clamp(92px,8vw,126px)] font-normal uppercase leading-[0.72] tracking-[-0.035em] text-text-primary"
          >
            <span className="block">Attention</span>
            <span className="block">Becomes</span>
            <span className="block">Value.</span>
          </motion.h2>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 text-[17px] leading-[1.52] tracking-[-0.012em] text-text-secondary"
          >
            <p>Creators create attention.</p>
            <p>Attention drives activity.</p>
            <p>Trading generates fees.</p>
            <p>Fees flow back to creators.</p>
          </motion.div>

          <motion.ol
            variants={reveal}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-label="DONS economic flow"
            className="mt-10 grid grid-cols-6 border-t border-border"
          >
            {economicFlow.map((stage, index) => (
              <motion.li
                key={stage}
                initial={reduceMotion ? false : { opacity: 0.6, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative min-w-0 pr-2 pt-4"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -top-[3px] left-0 size-[5px] rounded-full ${
                    index === 0 || index === economicFlow.length - 1
                      ? "bg-lime"
                      : "bg-text-muted"
                  }`}
                />
                <span className="block text-[8px] font-semibold uppercase leading-[1.35] tracking-[0.1em] text-text-muted">
                  {stage}
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0.55 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative col-span-7 h-[600px]"
        >
          <div className="absolute left-0 top-1/2 h-[570px] w-[clamp(740px,58vw,850px)] -translate-y-1/2 [mask-image:linear-gradient(to_right,transparent_0%,black_22%,black_90%,transparent_100%)]">
            <Image
              src={donsHeroNetwork}
              alt="DONS attention network showing posts becoming activity, fees, and creator rewards"
              fill
              quality={100}
              sizes="(min-width: 1600px) 850px, 58vw"
              className="origin-right scale-[1.42] object-cover object-right opacity-82"
            />
          </div>

          <div className="absolute bottom-[86px] right-1 z-10 border-l border-lime/45 pl-4">
            <p className="type-label text-text-muted">Creator Pool</p>
            <data
              value="1863"
              className="mt-2 block text-[24px] font-medium tracking-[-0.035em] tabular-nums text-text-primary"
            >
              18.63 SOL
            </data>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
