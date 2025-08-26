import { crud } from "$lib/server/db/helper";
import { item } from "./schema.server";
import { refinements } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id } = crud({
    label: 'item',
    table: item,
    refinements
});