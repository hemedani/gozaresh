"use server";

import { AppApi, getToken } from "@/lib/api";

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
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    const { tags, category, attachments, ...rest } = data;

    const result = await AppApi(undefined, token).send({
      service: "main",
      model: "report",
      act: "add",
      details: {
        set: {
          ...rest,
          tags: tags || [],
          category: category || undefined,
          attachments: attachments || [],
        },
        get: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
        },
      },
    });

    return result;
  } catch (error: unknown) {
    return { success: false, body: { message: error instanceof Error ? error.message : "Unknown error" } };
  }
}

export async function getMyReports(page = 1, limit = 10) {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, body: [] };
    }

    const result = await AppApi(undefined, token).send({
      service: "main",
      model: "report",
      act: "gets",
      details: {
        set: { page, limit },
        get: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          priority: 1,
          createdAt: 1,
        },
      },
    });

    return result;
  } catch (error: unknown) {
    return { success: false, body: { message: error instanceof Error ? error.message : "Unknown error" } };
  }
}
