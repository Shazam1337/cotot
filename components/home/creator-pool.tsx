"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroEconomics } from "@/data/mock-data";

const increments = [0.18, 0.25, 0.26, 0.14, 0.33, 0.09];
const bars = [28, 34, 31, 42, 38, 47, 43, 52, 48, 58, 54, 63, 59, 68, 65, 74, 70, 80];
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function CreatorPool() {
  const reduceMotion = useReducedMotion();
  const [balance, setBalance] = useState(heroEconomics.creatorPoolUsd);
  const incrementIndex = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      const amount = increments[incrementIndex.current % increments.length];
      incrementIndex.current += 1;
      setBalance((current) => Number((current + amount).toFixed(2)));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const formattedBalance = currency.format(balance);

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
