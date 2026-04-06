"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const count = async (data: ReqType["main"]["city"]["count"]["set"], getSelection?: DeepPartial<ReqType["main"]["city"]["count"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "city",
    act: "count",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  return result;
};
