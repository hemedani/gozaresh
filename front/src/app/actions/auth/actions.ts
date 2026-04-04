"use server";

import { cookies } from "next/headers";
import { apiCall, getToken } from "@/lib/api";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  level: string;
  is_verified: boolean;
}

export async function login(email: string, password: string) {
  const result = await apiCall<{ token: string }>("user", "login", {
    set: { email, password },
    get: {},
  });

  if (!result.success || !result.body) {
    return { success: false, error: "Invalid credentials" };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", result.body.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 90 * 24 * 60 * 60, // 90 days
    path: "/",
  });

  return { success: true };
}

export async function register(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
) {
  const result = await apiCall("user", "registerUser", {
    set: { first_name, last_name, email, password },
    get: {},
  });

  if (!result.success) {
    return { success: false, error: "Registration failed" };
  }

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { success: true };
}

export async function getMe() {
  const token = await getToken();
  if (!token) {
    return { success: false, body: null };
  }

  const result = await apiCall<User>("user", "getMe", {
    set: {},
    get: {
      _id: true,
      first_name: true,
      last_name: true,
      email: true,
      level: true,
      is_verified: true,
    },
  }, token);

  if (!result.success) {
    return { success: false, body: null };
  }

  return { success: true, body: result.body };
}
