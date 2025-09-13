import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type JsonObject = Record<string, any>;

interface MeResponse {
  data?: JsonObject; // Directus returns { data: { ...user fields } }
}

interface RefreshResponse {
  data?: {
    access_token?: string;
    refresh_token?: string;
  };
}

interface Options {
  /** If true, the hook will try to refresh immediately when the JWT is expired. Default: true */
  autoRefreshOn401?: boolean;
}

export function useDirectusSession(baseUrl: string, opts: Options = {}) {
  const { autoRefreshOn401 = true } = opts;

  const api = useMemo(() => baseUrl.replace(/\/$/, ""), [baseUrl]);
  const [user, setUser] = useState<JsonObject | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const getAccessToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const getRefreshToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;

  const setAccessToken = (t: string | null) => {
    if (typeof window === "undefined") return;
    if (t) localStorage.setItem("access_token", t);
    else localStorage.removeItem("access_token");
  };

  const setRefreshToken = (t: string | null) => {
    if (typeof window === "undefined") return;
    if (t) localStorage.setItem("refresh_token", t);
    else localStorage.removeItem("refresh_token");
  };

  const clearSessionState = (reason?: string) => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);
    if (reason) setError(reason);
  };

  const refresh = useCallback(async (): Promise<string | null> => {
    const rt = getRefreshToken();
    if (!rt) return null;

    const resp = await fetch(`${api}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: rt }),
    });

    if (!resp.ok) return null;

    const json: RefreshResponse = await resp.json();
    const newAccess = json.data?.access_token ?? null;
    const newRefresh = json.data?.refresh_token ?? null;

    if (newAccess) setAccessToken(newAccess);
    if (newRefresh) setRefreshToken(newRefresh);

    return newAccess;
  }, [api]);

  const validate = useCallback(async () => {
    const token = getAccessToken();
    setValidating(true);
    setError(null);

    // cancel any in-flight validation
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      if (!token) {
        clearSessionState();
        return { ok: false as const };
      }

      const meResp = await fetch(`${api}/users/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        signal: ac.signal,
      });

      if (meResp.ok) {
        const json: MeResponse = await meResp.json();
        setUser(json.data ?? null);
        setIsAuthenticated(true);
        return { ok: true as const };
      }

      // If unauthorized, optionally try one refresh then retry /users/me once
      if (meResp.status === 401 && autoRefreshOn401) {
        const newToken = await refresh();
        if (newToken) {
          const retry = await fetch(`${api}/users/me`, {
            method: "GET",
            headers: { Authorization: `Bearer ${newToken}` },
            signal: ac.signal,
          });

          if (retry.ok) {
            const json: MeResponse = await retry.json();
            setUser(json.data ?? null);
            setIsAuthenticated(true);
            return { ok: true as const };
          }
        }

        clearSessionState("Session expired. Please sign in again.");
        return { ok: false as const };
      }

      // Other HTTP errors
      setIsAuthenticated(false);
      setUser(null);
      setError(`Failed to validate session: HTTP ${meResp.status}`);
      return { ok: false as const };
    } catch (e: any) {
      if (e?.name === "AbortError") return { ok: false as const };
      setIsAuthenticated(false);
      setUser(null);
      setError(e?.message || "Failed to validate session");
      return { ok: false as const };
    } finally {
      setValidating(false);
    }
  }, [api, autoRefreshOn401, refresh]);

  // Initial validation + whenever tokens change in this tab
  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  // Cross-tab sync (respond if another tab logs in/out)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "access_token" || e.key === "refresh_token") {
        validate();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [validate]);

  const logout = useCallback(async () => {
    const rt = getRefreshToken();
    try {
      // Best-effort server-side logout to revoke refresh token (optional)
      if (rt) {
        await fetch(`${api}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: rt }),
        });
      }
    } catch {
      // ignore network/logout errors; still clear local session
    } finally {
      clearSessionState();
    }
  }, [api]);

  return {
    user,
    isAuthenticated,
    validating,
    error,
    /** Force a fresh validation now */
    revalidate: validate,
    /** Attempt refresh now (returns new access token or null) */
    refresh,
    /** Clear tokens locally (and best-effort revoke on the server) */
    logout,
  };
}

