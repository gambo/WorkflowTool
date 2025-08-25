import { crud } from "$lib/server/db/helper";
import { customer } from "./schema.server";
import { refinements } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id } = crud({
    label: 'customer',
    table: customer,
    refinements
});