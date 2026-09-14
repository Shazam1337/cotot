"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { FeaturedSignal } from "@/components/home/featured-signal";
import { LiveSignalQueue } from "@/components/home/live-signal-queue";
import { LiveDot } from "@/components/ui/live-dot";
import {
  demoCreators,
  demoSignals,
  featuredSignalIds,
} from "@/data/demo-scenario";

const impactSteps = [0, 1, 1, 2, 1, 2];
const cutSteps = [0, 0.0001, 0.0002, 0.0002, 0.0003, 0.0004];

export function TheWire() {
  const reduceMotion = useReducedMotion();
  const [queueCursor, setQueueCursor] = useState(0);
  const [featuredCursor, setFeaturedCursor] = useState(0);
  const [metricStep, setMetricStep] = useState(0);

  const creators = useMemo(
    () => new Map(demoCreators.map((creator) => [creator.id, creator])),
    [],
  );
  const featuredSignals = useMemo(
    () =>
      featuredSignalIds.map((id) => demoSignals.find((signal) => signal.id === id)!),
    [],
  );
  const queueSource = useMemo(
    () => demoSignals.filter((signal) => !featuredSignalIds.includes(signal.id as never)),
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const queueTimer = window.setInterval(() => {
      setQueueCursor((current) => (current + 1) % queueSource.length);
      setMetricStep((current) => (current + 1) % impactSteps.length);
    }, 11000);
    const featuredTimer = window.setInterval(() => {
      setFeaturedCursor((current) => (current + 1) % featuredSignals.length);
      setMetricStep(0);
    }, 26000);

    return () => {
      window.clearInterval(queueTimer);
      window.clearInterval(featuredTimer);
    };
  }, [featuredSignals.length, queueSource.length, reduceMotion]);

  const queueSignals = Array.from({ length: 6 }, (_, index) => {
    const sourceIndex = (queueCursor - index + queueSource.length) % queueSource.length;
    return queueSource[sourceIndex];
  });
  const featured = featuredSignals[featuredCursor];
  const featuredCreator = creators.get(featured.creatorId)!;
  const impact = featured.impact + impactSteps[metricStep];
  const estimatedCut = featured.estimatedCut + cutSteps[metricStep];

  return (
    <section id="wire" aria-labelledby="wire-heading" className="border-b border-border">
      <Container className="pb-28 pt-[88px]">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="type-label flex items-center gap-3 text-text-muted">
              <span className="h-px w-9 bg-lime" />
              Live signal desk
            </p>
            <h2 id="wire-heading" className="type-section-title mt-6 text-text-primary">
              Signals, live.
            </h2>
            <p className="mt-7 text-[20px] leading-[1.38] tracking-[-0.015em] text-text-secondary">
              <span className="block">Watch creator impact move</span>
              <span className="block">from detection to settlement.</span>
            </p>
          </div>

          <div className="flex justify-start pb-1 lg:col-span-4 lg:justify-end">
            <div className="min-w-[176px] border-l border-border pl-5">
              <p className="type-label flex items-center gap-2 text-lime">
                <LiveDot />
                Live
              </p>
              <p className="mt-3 text-[12px] text-text-secondary">1,284 signals tracked</p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
                Updated just now
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 xl:grid-cols-[minmax(0,1.78fr)_minmax(330px,1fr)]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={featured.id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeaturedSignal
                creator={featuredCreator}
                impact={impact}
                estimatedCut={estimatedCut}
                signal={featured}
              />
            </motion.div>
          </AnimatePresence>

          <LiveSignalQueue creators={creators} signals={queueSignals} />
        </div>
      </Container>
    </section>
  );
}
