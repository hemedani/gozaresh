import { enums, number, object, optional, string } from "@deps";
import { selectStruct } from "../../../mod.ts";
import { report_status_array } from "@model";

export const getsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			status: optional(enums(report_status_array)),
			categoryId: optional(string()),
			tagId: optional(string()),
		}),
		get: selectStruct("report", 2),
	});
};
