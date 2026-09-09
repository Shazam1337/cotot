import type { ComponentPropsWithoutRef } from "react";

type PanelProps = ComponentPropsWithoutRef<"div"> & {
  interactive?: boolean;
};

export function Panel({
  interactive = false,
  className = "",
  ...props
}: PanelProps) {
  return (
    <div
      className={`border border-border bg-surface ${
        interactive ? "transition-colors hover:bg-surface-hover" : ""
      } ${className}`}
      {...props}
    />
  );
}
