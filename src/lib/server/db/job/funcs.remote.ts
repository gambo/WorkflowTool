import { crud } from "$lib/server/db/helper";
import { job, refinements } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id } = crud({
    label: 'job',
    table: job,
    refinements
});