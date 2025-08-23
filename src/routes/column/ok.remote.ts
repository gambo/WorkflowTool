import { crud } from "$lib/server/db/helper";
import { column } from "$lib/server/db/schema";

export const { list, add, del, edit, find_by_id } = crud<typeof column>({
    table: column,
    label: 'column',
})