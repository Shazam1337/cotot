import { donsTapeItems, type TapeItem } from "@/data/mock-data";
import { LiveDot } from "@/components/ui/live-dot";

const toneClass = {
  default: "text-text-primary",
  muted: "text-text-muted",
  lime: "text-lime",
};

function TapeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="dons-tape-group flex shrink-0 items-center"
      aria-hidden={hidden ? "true" : undefined}
    >
      {donsTapeItems.map((item: TapeItem) => (
        <div
          key={item.id}
          className="type-tech-label flex h-12 shrink-0 items-center gap-3 border-r border-border px-6"
        >
          {item.id === "tape_live" ? <LiveDot /> : null}
          {item.tokens.map((token, index) => (
            <span key={`${item.id}_${index}`} className={toneClass[token.tone ?? "default"]}>
              {token.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function DonsTape() {
  return (
    <section
      aria-label="Live DONS activity"
      className="dons-tape h-12 overflow-hidden border-y border-border bg-bg-elevated/88"
    >
      <div className="dons-tape-track">
        <TapeGroup />
        <TapeGroup hidden />
      </div>
    </section>
  );
}
