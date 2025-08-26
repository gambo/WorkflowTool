import { toJSONSchema } from '$lib/server/db/helper';
import { schema } from './schema.server';

export async function load() {
    const form = toJSONSchema(schema);
    return { form };
}