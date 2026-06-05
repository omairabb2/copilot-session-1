import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { healthCheck } from "../api/auth";
import TokenStatus from "../components/TokenStatus";
import { useAuth } from "../hooks/useAuth";

type HealthState = "checking" | "ok" | "error";

export default function DashboardPage() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [health, setHealth] = useState<HealthState>("checking");

  useEffect(() => {
    healthCheck()
      .then(() => setHealth("ok"))
      .catch(() => setHealth("error"));
  }, []);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const healthBadge: Record<HealthState, { label: string; classes: string }> = {
    checking: { label: "Verificando…", classes: "bg-gray-100 text-gray-600" },
    ok: { label: "Online ✓", classes: "bg-green-100 text-green-700" },
    error: { label: "Sin conexión ✗", classes: "bg-red-100 text-red-700" },
  };

  const { label, classes } = healthBadge[health];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {username?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{username}</p>
            <p className="text-xs text-gray-500">Sesión activa</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-lg flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">FastAPI JWT Demo</p>
        </div>

        {/* Token status */}
        <TokenStatus />

        {/* Backend health */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Estado del backend
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
            >
              {label}
            </span>
            <span className="text-xs text-gray-400">
              GET http://localhost:8000/health
            </span>
          </div>
        </div>

        {/* Token info */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-medium text-gray-600">
            Información de sesión
          </p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <span className="font-medium">Usuario:</span> {username}
            </li>
            <li>
              <span className="font-medium">Duración del access token:</span> 300 s
            </li>
            <li>
              <span className="font-medium">Auto-refresh:</span> 30 s antes de
              expirar
            </li>
            <li>
              <span className="font-medium">Almacenamiento:</span> localStorage
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
