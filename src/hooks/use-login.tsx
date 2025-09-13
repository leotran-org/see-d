import { useState, useEffect } from "react";

interface LoginResponse {
  data: { access_token: string; refresh_token?: string };
}

export function useDirectusAuth(baseUrl: string) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;         // SSR guard
    try {
      return localStorage.getItem("access_token");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (token) localStorage.setItem("access_token", token);
      else localStorage.removeItem("access_token");
    } catch (e) {
      console.warn("localStorage failed:", e);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Invalid input: Email and password must not be empty");
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!resp.ok) {
        if (resp.status === 401) throw new Error("Invalid email or password");
        throw new Error(`Unexpected error occurred: HTTP ${resp.status}`);
      }
      const json: LoginResponse = await resp.json();
      if (!json.data?.access_token) throw new Error("Unexpected error occurred: No access token in response");
      setToken(json.data.access_token);
      localStorage.setItem("access_token", json.data.access_token);
      return json.data.access_token;
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setToken(null);

  return { login, logout, token, loading, error };
}

