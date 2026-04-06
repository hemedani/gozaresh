"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const remove = async (data: ReqType["main"]["province"]["remove"]["set"], getSelection?: DeepPartial<ReqType["main"]["province"]["remove"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "province",
    act: "remove",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  if (result.success) return result.body;
  return null;
};
