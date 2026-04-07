"use server";
import { AppApi } from "@/lib/api";
import { ReqType, DeepPartial } from "@/types/declarations";
import { cookies } from "next/headers";

export const gets = async (
  data: ReqType["main"]["file"]["gets"]["set"],
  getSelection?: DeepPartial<ReqType["main"]["file"]["gets"]["get"]>,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const result = await AppApi(undefined, token).send({
    service: "main",
    model: "file",
    act: "gets",
    details: {
      set: data,
      get: getSelection || {},
    },
  });

  return result;
};
