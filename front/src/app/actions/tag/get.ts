"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const get = async (data: ReqType["main"]["tag"]["get"]["set"], getSelection?: DeepPartial<ReqType["main"]["tag"]["get"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "tag",
    act: "get",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  return result;
};
