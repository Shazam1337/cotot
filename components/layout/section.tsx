import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  contained?: boolean;
};

export function Section({
  contained = true,
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section className={`py-(--section-space) ${className}`} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
