"use server";

import { apiCall, getToken } from "@/lib/api";

export async function createReport(data: {
  title: string;
  description: string;
  address?: string;
  location?: { type: string; coordinates: [number, number] };
  priority?: string;
  tags?: string[];
  category?: string;
  attachments?: string[];
}) {
  const token = await getToken();
  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  const { tags, category, attachments, ...rest } = data;

  const result = await apiCall("report", "add", {
    set: {
      ...rest,
      tags: tags || [],
      category: category || undefined,
      attachments: attachments || [],
    },
    get: {
      _id: true,
      title: true,
      description: true,
      status: true,
    },
  }, token);

  return result;
}

export async function getMyReports(page = 1, limit = 10) {
  const token = await getToken();
  if (!token) {
    return { success: false, body: [] };
  }

  const result = await apiCall("report", "gets", {
    set: { page, limit },
    get: {
      _id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      createdAt: true,
    },
  }, token);

  return result;
}
