import type { ComponentPropsWithoutRef } from "react";

type MetricValueProps = ComponentPropsWithoutRef<"data"> & {
  tone?: "default" | "positive" | "warning" | "negative";
};

const toneClass = {
  default: "text-text-primary",
  positive: "text-lime",
  warning: "text-amber",
  negative: "text-red",
};

export function MetricValue({
  tone = "default",
  className = "",
  ...props
}: MetricValueProps) {
  return (
    <data className={`type-metric ${toneClass[tone]} ${className}`} {...props} />
  );
}
