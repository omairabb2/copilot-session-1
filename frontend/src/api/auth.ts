const BASE_URL = "http://localhost:8000";

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export async function login(
  username: string,
  password: string
): Promise<TokenResponse> {
  const res = await fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { detail?: string }).detail ?? "Invalid credentials");
  }

  return res.json() as Promise<TokenResponse>;
}

export async function refreshToken(
  refresh_token: string
): Promise<TokenResponse> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { detail?: string }).detail ?? "Token refresh failed");
  }

  return res.json() as Promise<TokenResponse>;
}

export async function healthCheck(): Promise<{ status: string }> {
  const res = await fetch(`${BASE_URL}/health`);
  if (!res.ok) throw new Error("Backend unreachable");
  return res.json() as Promise<{ status: string }>;
}
