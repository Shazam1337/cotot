type LiveDotProps = {
  className?: string;
  pulse?: boolean;
};

export function LiveDot({ className = "", pulse = true }: LiveDotProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex size-1.5 shrink-0 rounded-full bg-lime ${
        pulse ? "live-dot-pulse" : ""
      } ${className}`}
    />
  );
}
