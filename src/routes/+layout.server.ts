import { requireLogin } from "$lib/server/db/auth";
import * as schema from '$lib/server/db/schema'

export async function load() {
    // const user = requireLogin()
    const menu = Object.keys(schema)
    return {
        // user,
        menu
    }
}