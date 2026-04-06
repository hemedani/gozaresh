"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const uploadFile = async (data: ReqType["main"]["file"]["uploadFile"]["set"], getSelection?: DeepPartial<ReqType["main"]["file"]["uploadFile"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "file",
    act: "uploadFile",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  if (result.success) return result.body;
  return null;
};
