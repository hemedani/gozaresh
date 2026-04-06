"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const updateUser = async (data: ReqType["main"]["user"]["updateUser"]["set"], getSelection?: DeepPartial<ReqType["main"]["user"]["updateUser"]["get"]>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "user",
    act: "updateUser",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  return result;
};
