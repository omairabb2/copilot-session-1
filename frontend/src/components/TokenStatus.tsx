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
      ? "bg-green-500"
      : secondsLeft > 30
        ? "bg-yellow-400"
        : "bg-red-500";

  const textColor =
    secondsLeft > 60
      ? "text-green-700"
      : secondsLeft > 30
        ? "text-yellow-700"
        : "text-red-700";

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between text-sm font-medium">
        <span className="text-gray-600">Access token expira en</span>
        <span className={`font-mono text-base font-bold ${textColor}`}>
          {formatTime(secondsLeft)}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {secondsLeft <= 30 && secondsLeft > 0 && (
        <p className="mt-2 text-xs text-yellow-600">
          ⟳ Refrescando token automáticamente…
        </p>
      )}
      {secondsLeft === 0 && (
        <p className="mt-2 text-xs text-red-600">
          Token expirado. Serás redirigido al login.
        </p>
      )}
    </div>
  );
}
