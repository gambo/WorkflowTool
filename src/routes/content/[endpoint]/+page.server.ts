import { toJSONSchema } from '$lib/db/helper.js';
import type { ZodType } from 'zod';

export async function load({ params }) {
    const { endpoint } = params
    type Schema<T extends ZodType = ZodType> = T
    const schema: Schema = await import(`$lib/db/${endpoint}/schema.server.ts`).then(x => x.schema)
    const form = toJSONSchema(schema);
    return { endpoint, form };
}