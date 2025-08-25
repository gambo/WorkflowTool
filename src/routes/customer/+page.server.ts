import { schema } from './schema.server';
import z from 'zod';
export async function load() {

    const form = z.toJSONSchema(schema, {
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