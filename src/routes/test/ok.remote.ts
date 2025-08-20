import { crud } from "$lib/server/db/Helpers";
import { column, column_schema } from "$lib/server/db/schema";

const config = {
    table: column,
    schema: column_schema,
    label: 'Column'
}
const { list, add, del } = crud(config)
export { list, add, del }