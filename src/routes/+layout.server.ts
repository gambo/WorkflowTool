import { requireLogin } from "$lib/db/auth";
import * as schema from '$lib/db/schema'

export async function load() {
    // const user = requireLogin()
    const menu = Object.keys(schema)
    return {
        // user,
        menu
    }
}