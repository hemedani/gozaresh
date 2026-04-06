"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const get = async (data: ReqType["main"]["report"]["get"]["set"], getSelection?: DeepPartial<ReqType["main"]["report"]["get"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "report",
    act: "get",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  return result;
};
