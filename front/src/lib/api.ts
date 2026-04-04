/**
 * Server-side API call utility
 * All backend communication goes through server actions
 */

const LESAN_URL = process.env.LESAN_URL || "http://localhost:1405";

interface ApiResponse<T = unknown> {
  success: boolean;
  body?: T;
  error?: string;
}

export async function apiCall<T = unknown>(
  model: string,
  act: string,
  details: Record<string, unknown> = {},
  token?: string,
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["token"] = token;
    }

    const response = await fetch(`${LESAN_URL}/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        service: "main",
        model,
        act,
        details,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    return {
      success: true,
      body: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get token from cookies (server-side only)
 */
export async function getToken(): Promise<string | undefined> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}
