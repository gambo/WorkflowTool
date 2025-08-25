import { crud } from "$lib/server/db/helper";
import { job } from "$lib/server/db/schema";
import type { BuildRefine } from "drizzle-zod";
// import z from "zod";

const refinements = {
    created: z => z.meta({ widget: 'date' }),
} satisfies BuildRefine<typeof job, undefined>

export const { list, add, del, edit, find_by_id } = crud({
    label: 'job',
    table: job,
    refinements
});