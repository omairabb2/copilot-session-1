import { createContext, useContext, useEffect, useRef, useState } from "react";
import { login as apiLogin, refreshToken as apiRefresh } from "../api/auth";
import type { TokenResponse } from "../api/auth";

const STORAGE_KEY_ACCESS = "jwt_access_token";
const STORAGE_KEY_REFRESH = "jwt_refresh_token";
const STORAGE_KEY_EXPIRES_AT = "jwt_expires_at"; // unix ms

interface AuthState {
  accessToken: string | null;
  username: string | null;
  secondsLeft: number;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

function parseUsername(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (payload as { sub?: string }).sub ?? null;
  } catch {
    return null;
  }
}

function saveTokens(data: TokenResponse): number {
  const expiresAt = Date.now() + data.expires_in * 1000;
  localStorage.setItem(STORAGE_KEY_ACCESS, data.access_token);
  localStorage.setItem(STORAGE_KEY_REFRESH, data.refresh_token);
  localStorage.setItem(STORAGE_KEY_EXPIRES_AT, String(expiresAt));
  return expiresAt;
}

function clearTokens() {
  localStorage.removeItem(STORAGE_KEY_ACCESS);
  localStorage.removeItem(STORAGE_KEY_REFRESH);
  localStorage.removeItem(STORAGE_KEY_EXPIRES_AT);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedAccess = localStorage.getItem(STORAGE_KEY_ACCESS);
  const storedExpiresAt = Number(localStorage.getItem(STORAGE_KEY_EXPIRES_AT) ?? 0);

  const isValid = storedAccess !== null && storedExpiresAt > Date.now();

  const [accessToken, setAccessToken] = useState<string | null>(
    isValid ? storedAccess : null
  );
  const [expiresAt, setExpiresAt] = useState<number>(
    isValid ? storedExpiresAt : 0
  );
  const [secondsLeft, setSecondsLeft] = useState<number>(
    isValid ? Math.max(0, Math.round((storedExpiresAt - Date.now()) / 1000)) : 0
  );

  const refreshingRef = useRef(false);

  // Countdown + auto-refresh
  useEffect(() => {
    if (!accessToken) return;

    const tick = setInterval(async () => {
      const left = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
      setSecondsLeft(left);

      // Auto-refresh 30s before expiry
      if (left <= 30 && left > 0 && !refreshingRef.current) {
        refreshingRef.current = true;
        const storedRefresh = localStorage.getItem(STORAGE_KEY_REFRESH);
        if (storedRefresh) {
          try {
            const data = await apiRefresh(storedRefresh);
            const newExpiresAt = saveTokens(data);
            setAccessToken(data.access_token);
            setExpiresAt(newExpiresAt);
          } catch {
            // Refresh failed — force logout
            clearTokens();
            setAccessToken(null);
            setExpiresAt(0);
            setSecondsLeft(0);
          } finally {
            refreshingRef.current = false;
          }
        }
      }

      // Expired
      if (left === 0) {
        clearTokens();
        setAccessToken(null);
        setExpiresAt(0);
      }
    }, 1000);

    return () => clearInterval(tick);
  }, [accessToken, expiresAt]);

  async function login(username: string, password: string) {
    const data = await apiLogin(username, password);
    const newExpiresAt = saveTokens(data);
    setAccessToken(data.access_token);
    setExpiresAt(newExpiresAt);
    setSecondsLeft(data.expires_in);
  }

  function logout() {
    clearTokens();
    setAccessToken(null);
    setExpiresAt(0);
    setSecondsLeft(0);
  }

  const username = accessToken ? parseUsername(accessToken) : null;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        username,
        secondsLeft,
        isAuthenticated: accessToken !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
