import { job } from '$lib/server/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
export async function load() {

    const ok = createInsertSchema(job);
    const form = z.toJSONSchema(ok, {
        unrepresentable: "any",
        override: (ctx) => {
            const def = ctx.zodSchema._zod.def;
            if (def.type === "date") {
                ctx.jsonSchema.type = "string";
                ctx.jsonSchema.format = "date-time";
            }
        },
    });
    return { form };
}