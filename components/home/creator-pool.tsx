"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroEconomics } from "@/data/mock-data";
import { formatSol } from "@/lib/currency";

const increments = [0.0018, 0.0025, 0.0026, 0.0014, 0.0033, 0.0009];
const bars = [28, 34, 31, 42, 38, 47, 43, 52, 48, 58, 54, 63, 59, 68, 65, 74, 70, 80];

export function CreatorPool() {
  const reduceMotion = useReducedMotion();
  const [balance, setBalance] = useState(heroEconomics.creatorPoolSol);
  const incrementIndex = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      const amount = increments[incrementIndex.current % increments.length];
      incrementIndex.current += 1;
      setBalance((current) => Number((current + amount).toFixed(4)));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const formattedBalance = formatSol(balance);

  return (
    <div className="absolute left-[34%] top-[34%] z-20 w-[310px] rounded-[4px] border border-white/14 bg-bg-elevated/95 p-6 backdrop-blur-[3px]">
      <div className="border-b border-border pb-3.5">
        <p className="type-label text-text-secondary">Creator Pool</p>
      </div>

      <motion.data
        value={balance}
        key={formattedBalance}
        initial={reduceMotion ? false : { opacity: 0.72, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 block font-sans text-[36px] font-medium leading-none tracking-[-0.055em] text-lime tabular-nums"
      >
        {formattedBalance}
      </motion.data>

      <p className="type-label mt-3.5 text-lime">+{heroEconomics.change24hPercent}% / 24H</p>

      <div aria-hidden="true" className="mt-6 flex h-9 items-end gap-[3px] border-b border-border pb-px opacity-75">
        {bars.map((height, index) => (
          <motion.span
            key={`${height}_${index}`}
            initial={false}
            animate={
              reduceMotion
                ? undefined
                : { scaleY: [0.92, 1, 0.95], opacity: [0.52, 0.8, 0.58] }
            }
            transition={{
              duration: 6 + (index % 4),
              delay: index * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`w-full origin-bottom ${index > bars.length - 5 ? "bg-lime/55" : "bg-white/12"}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}
