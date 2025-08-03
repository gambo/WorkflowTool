import { form, query } from '$app/server'
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import z from 'zod';

function generateId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}

export const users = query(() => {
    return db.query.user.findMany()
})

export const user = query(z.union([z.string(), z.undefined()]), (id) => {
    if (!id) return
    return db.query.user.findFirst({
        where: eq(table.user.id, id)
    })
})

export const add_user = form(async (data) => {
    try {
        await db.insert(table.user).values({
            id: generateId(),
            username: data.get('username') as string,
            passwordHash: data.get('passwordHash') as string,
            status: data.get('status') as "active" | "inactive",
            created: new Date(),
            updated: new Date(),
        })
        users().refresh()
        return { success: true, message: 'User added successfully' }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: message }
    }
})

export const edit_user = form(async (data) => {
    try {
        await db.update(table.user).set({
            id: data.get('id') as string,
            username: data.get('username') as string,
            passwordHash: data.get('passwordHash') as string,
            status: data.get('status') as "active" | "inactive",
            created: new Date(),
            updated: new Date(),
        }).where(eq(table.user.id, data.get('id') as string))
        users().refresh()
        return { success: true, message: 'User edited successfully' }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log({ error })
        return { success: false, error: message }
    }
})


export const delete_user = form(async (data) => {
    try {
        const userId = data.get('userId') as string;
        await db.delete(table.user).where(eq(table.user.id, userId));
        users().refresh()
        return { success: true }
    } catch (e) {
        console.log(222, { e })
        return { error: 'Failed to delete user' }
    }
})