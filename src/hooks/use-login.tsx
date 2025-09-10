import { useState, useEffect } from "react";

interface LoginResponse {
  data: {
    access_token: string;
    refresh_token?: string;
  };
}

export function useDirectusAuth(baseUrl: string) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Invalid input: Email and password must not be empty");
    }

    setLoading(true);
    setError(null);

    try {
      const resp = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        if (resp.status === 401) {
          throw new Error("Invalid email or password");
        }
        throw new Error(`Unexpected error occurred: HTTP ${resp.status}`);
      }

      const json: LoginResponse = await resp.json();
      if (!json.data?.access_token) {
        throw new Error("Unexpected error occurred: No access token in response");
      }

      setToken(json.data.access_token);
      return json.data.access_token;
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, token, loading, error };
}

