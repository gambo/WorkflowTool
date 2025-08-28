import { crud } from "$lib/server/db/helper";
import { item } from "./schema.server";
import { refinements } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id, list_asc_by, list_desc_by } = crud({
    label: 'item',
    table: item,
    refinements
});