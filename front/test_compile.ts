import { ReqType } from "./src/types/declarations";

const setQuery: ReqType["main"]["user"]["getUsers"]["set"] = {
  page: 1,
  limit: 10,
};
setQuery.search = "test";
