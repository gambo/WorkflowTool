import { item } from "$lib/server/db/schema";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof item, undefined>

export const schema = createInsertSchema(item, refinements);