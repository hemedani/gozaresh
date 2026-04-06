"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const addUser = async (data: ReqType["main"]["user"]["addUser"]["set"], getSelection?: DeepPartial<ReqType["main"]["user"]["addUser"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "user",
    act: "addUser",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  if (result.success) return result.body;
  return null;
};
