import { crud } from "$lib/server/db/helper";
import { column } from "$lib/server/db/schema";
import type { BuildRefine } from "drizzle-zod";
import z from "zod";

const refinements = {
    order: z.coerce.number().int().min(10, 'Order must be more than 10').max(20, 'Order must be less than 20').optional(),
    check: z.coerce.boolean().optional()
} satisfies BuildRefine<typeof column, undefined>

export const { list, add, del, edit, find_by_id } = crud({
    label: 'column',
    table: column,
    refinements
});