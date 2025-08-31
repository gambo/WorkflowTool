import { crud } from "$lib/db/helper";
import { item, refinements } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id, list_asc_by, list_desc_by } = crud({
    label: 'item',
    table: item,
    refinements
});