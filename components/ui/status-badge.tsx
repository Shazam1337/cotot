import type { ComponentPropsWithoutRef } from "react";
import { LiveDot } from "./live-dot";

type StatusBadgeProps = ComponentPropsWithoutRef<"span"> & {
  live?: boolean;
};

export function StatusBadge({
  live = false,
  className = "",
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={`type-label inline-flex items-center gap-2.5 border border-border bg-bg-elevated px-3 py-2 text-text-secondary ${className}`}
      {...props}
    >
      {live ? <LiveDot /> : null}
      {children}
    </span>
  );
}
