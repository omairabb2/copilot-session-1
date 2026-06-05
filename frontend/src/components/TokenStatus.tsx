import { useAuth } from "../hooks/useAuth";

const TOTAL_SECONDS = 300;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TokenStatus() {
  const { secondsLeft } = useAuth();

  const pct = Math.max(0, Math.min(100, (secondsLeft / TOTAL_SECONDS) * 100));

  const barColor =
    secondsLeft > 60
      ? "#111827"
      : secondsLeft > 30
        ? "#D97706"
        : "#9A3412";

  const timeColor =
    secondsLeft > 60
      ? "#111827"
      : secondsLeft > 30
        ? "#D97706"
        : "#9A3412";

  return (
    <div
      className="rounded-card p-px"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.01) 100%)",
      }}
    >
      <div
        className="rounded-card bg-neutral p-6"
        style={{
          boxShadow:
            "rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px",
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <p
            className="text-sm font-medium"
            style={{ color: "#111827", letterSpacing: "0.35px" }}
          >
            Access token expira en
          </p>
          <span
            className="font-mono text-base font-medium"
            style={{ color: timeColor }}
          >
            {formatTime(secondsLeft)}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: "#E5E7EB" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, backgroundColor: barColor }}
          />
        </div>

        {secondsLeft <= 30 && secondsLeft > 0 && (
          <p
            className="mt-2 text-xs font-light"
            style={{ color: "#D97706", lineHeight: "22.75px" }}
          >
            ⟳ Refrescando token automáticamente…
          </p>
        )}
        {secondsLeft === 0 && (
          <p
            className="mt-2 text-xs font-light"
            style={{ color: "#9A3412", lineHeight: "22.75px" }}
          >
            Token expirado. Serás redirigido al login.
          </p>
        )}
      </div>
    </div>
  );
}
