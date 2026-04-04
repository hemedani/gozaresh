import type { ActFn, Document } from "@deps";
import { report } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
	const {
		set: { page, limit, status, categoryId, tagId },
		get,
	} = body.details;

	const pipeline: Document[] = [];

	status &&
		pipeline.push({
			$match: { status },
		});

	categoryId &&
		pipeline.push({
			$match: { "category._id": categoryId },
		});

	tagId &&
		pipeline.push({
			$match: { "tags._id": tagId },
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await report
		.aggregation({
			pipeline,
			projection: get,
		})
		.toArray();
};
