import { crud } from "$lib/server/db/helper";
import { column } from "./schema.server";
import { refinements } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id } = crud({
    label: 'item',
    table: column,
    refinements
});