import { schema } from '../schema.server';
import { toJSONSchema } from '$lib/server/db/helper';

export async function load() {

    const form = toJSONSchema(schema);
    return { form };
}
