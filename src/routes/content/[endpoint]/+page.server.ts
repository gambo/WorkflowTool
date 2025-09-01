import { toJSONSchema } from '$lib/server/db/helper.js';
import { validEndpoints } from './validEndpoints.js';
import type { ZodType } from 'zod';

export async function load({ params }) {
    const { endpoint } = params;
    if (!validEndpoints.includes(endpoint)) {
        throw new Error('Invalid endpoint');
    }
    type Schema<T extends ZodType = ZodType> = T;
    const schema: Schema = await import(`$lib/db/${endpoint}/schema.server.ts`).then(x => x.schema);
    const form = toJSONSchema(schema);
    return { endpoint, form };
}