"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CreatorPool } from "@/components/home/creator-pool";
import { heroActivityEvents, type HeroActivityEvent } from "@/data/mock-data";

const calloutSize = {
  small: "min-w-[126px] px-2.5 py-2",
  medium: "min-w-[148px] px-3 py-2.5",
  large: "min-w-[164px] px-3.5 py-3",
};

const valueMotionClass = {
  hero_signal: "hero-signal-state",
  hero_stacy: "hero-impact-value",
  hero_paid: "hero-paid-value",
} as const;

function ActivityCallout({ event, index }: { event: HeroActivityEvent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.72, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.35 + index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      style={event.placement}
      className={`absolute z-10 rounded-[2px] border border-white/8 bg-bg/74 backdrop-blur-[2px] ${calloutSize[event.size]}`}
    >
      <p className="flex items-center gap-2 text-[7px] uppercase tracking-[0.1em] text-text-muted">
        <span className="font-mono tabular-nums">{event.timestamp}</span>
        <span className="size-0.5 rounded-full bg-text-muted" />
        <span>{event.category}</span>
      </p>
      <p className="mt-1.5 text-[11px] font-semibold text-text-primary">{event.creator}</p>
      <p
        className={`mt-1 font-sans text-[9px] tabular-nums ${event.accent ? "text-lime" : "text-text-secondary"} ${
          valueMotionClass[event.id as keyof typeof valueMotionClass] ?? ""
        }`}
      >
        {event.value}
      </p>
      {event.detail ? (
        <p className="mt-1 font-sans text-[9px] text-lime tabular-nums">{event.detail}</p>
      ) : null}
    </motion.div>
  );
}

export function AttentionNetwork() {
  return (
    <motion.div
      initial={{ opacity: 0.78, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[600px] w-[clamp(680px,46vw,760px)]"
      aria-label="Live COTOT attention network and Creator Pool"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_17%,black_100%)]"
      >
        <Image
          src="/assets/brand/dons-hero-network.png"
          alt=""
          fill
          preload
          quality={100}
          sizes="(min-width: 1600px) 760px, 680px"
          className="object-cover object-[63%_center] opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_68%,var(--bg)_100%)]" />
      </div>

      {heroActivityEvents.map((event, index) => (
        <ActivityCallout key={event.id} event={event} index={index} />
      ))}

      <CreatorPool />
    </motion.div>
  );
}
