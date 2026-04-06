"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const count = async (data: ReqType["main"]["tag"]["count"]["set"], getSelection?: DeepPartial<ReqType["main"]["tag"]["count"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "tag",
    act: "count",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  return result;
};
