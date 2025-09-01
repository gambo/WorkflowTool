import { enabled_endpoints } from '$lib/db/enabled_endpoints.js';

export async function load({ data }) {
    const { endpoint } = data;
    if (!enabled_endpoints.includes(endpoint)) {
        throw new Error('Invalid endpoint');
    }
    const { list, list_desc_by, list_asc_by, add, del, edit } = await import(`$lib/db/${endpoint}/funcs.remote.ts`).then(x => x);
    return { ...data, list, list_desc_by, list_asc_by, add, del, edit, endpoint };
}