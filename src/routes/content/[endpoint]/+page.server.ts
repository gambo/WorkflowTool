import { toJSONSchema } from '$lib/db/helper.js';
import { enabled_endpoints } from '$lib/db/enabled_endpoints.js';
import type { ZodType } from 'zod';

export async function load({ params }) {
    const { endpoint } = params;
    if (!enabled_endpoints.includes(endpoint)) {
        throw new Error('Invalid endpoint');
    }
    type Schema<T extends ZodType = ZodType> = T;
    type Config = {
        label: string
        description: string
    }
    type ImportFile = { schema: Schema, config: Config }
    const { schema, config }: ImportFile = await import(`$lib/db/${endpoint}/schema.server.ts`).then(x => x);
    const form = toJSONSchema(schema);
    return { endpoint, form, label: config.label, description: config.description };
}