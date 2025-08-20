import { crud } from "$lib/server/db/Helpers";
import { column, column_schema } from "$lib/server/db/schema";

const { list, add, del } = crud(column, column_schema)
export { list, add, del }