import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate("/welcome", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "#FFFFFF" }}
    >
      {/* Gradient background accent */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 60% 10%, rgba(224,231,255,0.4) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(255,237,213,0.3) 0%, transparent 50%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Gradient border shell */}
        <div
          className="rounded-card p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 100%)",
          }}
        >
          {/* Card surface */}
          <div
            className="rounded-card bg-neutral p-6"
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0), rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px",
            }}
          >
            {/* Logo / Brand */}
            <div className="mb-8">
              <div
                className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral text-sm font-semibold"
                style={{ backgroundColor: "#111827" }}
              >
                F
              </div>
              <h1
                className="mt-4 text-2xl font-medium leading-tight"
                style={{
                  color: "#111827",
                  letterSpacing: "-0.025em",
                }}
              >
                Bienvenido a FlowOps
              </h1>
              <p
                className="mt-1 text-sm font-light"
                style={{ color: "#6B7280", lineHeight: "22.75px" }}
              >
                Inicia sesión para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1 block text-sm font-medium"
                  style={{
                    color: "#111827",
                    lineHeight: "20px",
                    letterSpacing: "0.35px",
                  }}
                >
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded px-3 py-2.5 text-sm font-light outline-none transition-all"
                  style={{
                    border: "0.8px solid #E5E7EB",
                    color: "#111827",
                    lineHeight: "22.75px",
                    background: "#FFFFFF",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1.6px solid #6496FF";
                    e.currentTarget.style.boxShadow =
                      "rgba(0,0,0,0.05) 0px 1px 2px 0px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "0.8px solid #E5E7EB";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium"
                  style={{
                    color: "#111827",
                    lineHeight: "20px",
                    letterSpacing: "0.35px",
                  }}
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded px-3 py-2.5 text-sm font-light outline-none transition-all"
                  style={{
                    border: "0.8px solid #E5E7EB",
                    color: "#111827",
                    lineHeight: "22.75px",
                    background: "#FFFFFF",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1.6px solid #6496FF";
                    e.currentTarget.style.boxShadow =
                      "rgba(0,0,0,0.05) 0px 1px 2px 0px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "0.8px solid #E5E7EB";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {error && (
                <div
                  className="rounded px-3 py-2 text-sm font-light"
                  style={{
                    background: "rgba(255,237,213,0.6)",
                    border: "0.8px solid #FFEDD5",
                    color: "#9A3412",
                    lineHeight: "22.75px",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full text-sm font-medium text-neutral transition-all duration-150"
                style={{
                  backgroundColor: "#111827",
                  padding: "10px",
                  lineHeight: "20px",
                  letterSpacing: "0.35px",
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor = "#1f2937";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#111827";
                }}
              >
                {loading ? "Ingresando…" : "Entrar"}
              </button>
            </form>

            <p
              className="mt-6 text-center text-xs font-light"
              style={{ color: "#6B7280" }}
            >
              Demo:{" "}
              <span className="font-mono font-medium" style={{ color: "#111827" }}>
                admin / admin123
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
