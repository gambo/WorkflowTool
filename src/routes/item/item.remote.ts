import { crud } from "$lib/server/db/helper";
import { item } from "$lib/server/db/schema";
import { refinements } from "./schema";
// import z from "zod";


export const { list, add, del, edit, find_by_id } = crud({
    label: 'item',
    table: item,
    refinements
});