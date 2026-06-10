import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { healthCheck } from "../api/auth";
import MicrosoftCertifications from "../components/MicrosoftCertifications";
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

  const healthBadge: Record<HealthState, { label: string; bg: string; color: string }> = {
    checking: { label: "Verificando…", bg: "#E5E7EB", color: "#6B7280" },
    ok: { label: "Online ✓", bg: "#E0E7FF", color: "#3730A3" },
    error: { label: "Sin conexión ✗", bg: "#FFEDD5", color: "#9A3412" },
  };

  const badge = healthBadge[health];

  const initial = username?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#FFFFFF" }}>
      {/* Gradient background accent */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 0%, rgba(224,231,255,0.35) 0%, transparent 50%), radial-gradient(circle at 5% 90%, rgba(255,237,213,0.25) 0%, transparent 45%)",
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(4px)",
          borderBottom: "0.8px solid #E5E7EB",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium"
            style={{ backgroundColor: "#111827", color: "#FFFFFF" }}
          >
            {initial}
          </div>
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "#111827", lineHeight: "20px" }}
            >
              {username}
            </p>
            <p className="text-xs font-light" style={{ color: "#6B7280" }}>
              Sesión activa
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm font-medium transition-all duration-150"
          style={{
            color: "#6B7280",
            padding: "0px",
            background: "none",
            border: "none",
            letterSpacing: "0.35px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#111827")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "#6B7280")
          }
        >
          Cerrar sesión
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 space-y-6 px-6 py-10">
        {/* Welcome hero */}
        <div className="mb-8">
          <p
            className="mb-2 text-sm font-medium"
            style={{ color: "#6B7280", letterSpacing: "0.35px" }}
          >
            BIENVENIDO
          </p>
          <h1
            className="font-medium leading-tight"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "#111827",
              letterSpacing: "-0.025em",
              lineHeight: "1.1",
            }}
          >
            Hola, {username} 👋
          </h1>
          <p
            className="mt-3 text-sm font-light"
            style={{ color: "#6B7280", lineHeight: "22.75px" }}
          >
            Has iniciado sesión correctamente en FlowOps. Tu sesión está activa y
            protegida mediante JWT.
          </p>
        </div>

        {/* Token status card */}
        <TokenStatus />

        {/* Backend health card */}
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
            <p
              className="mb-3 text-sm font-medium"
              style={{ color: "#111827", letterSpacing: "0.35px" }}
            >
              Estado del backend
            </p>
            <div className="flex items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ background: badge.bg, color: badge.color }}
              >
                {badge.label}
              </span>
              <span
                className="font-mono text-xs font-light"
                style={{ color: "#6B7280" }}
              >
                GET /health
              </span>
            </div>
          </div>
        </div>

        {/* Session info card */}
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
            <p
              className="mb-3 text-sm font-medium"
              style={{ color: "#111827", letterSpacing: "0.35px" }}
            >
              Información de sesión
            </p>
            <ul className="space-y-2">
              {[
                { label: "Usuario", value: username ?? "—" },
                { label: "Duración del access token", value: "300 s" },
                { label: "Auto-refresh", value: "30 s antes de expirar" },
                { label: "Almacenamiento", value: "localStorage" },
              ].map(({ label, value }) => (
                <li
                  key={label}
                  className="flex items-center justify-between text-sm"
                >
                  <span
                    className="font-light"
                    style={{ color: "#6B7280" }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-medium"
                    style={{ color: "#111827" }}
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      {/* Microsoft certifications section */}
        <MicrosoftCertifications />
      </main>
    </div>
  );
}
