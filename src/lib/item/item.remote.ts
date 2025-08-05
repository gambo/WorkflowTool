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

export const items = query(() => {
    return db.query.item.findMany()
})

export const item = query(z.union([z.string(), z.undefined()]), (id) => {
    if (!id) return
    return db.query.item.findFirst({
        where: eq(table.item.id, id)
    })
})

export const add_item = form(async (data) => {
    try {
        await db.insert(table.item).values({
            id: generateId(),
            description: data.get('description') as string,
            created: new Date(),
            updated: new Date(),
        })
        items().refresh()
        return { success: true, message: 'Item added successfully' }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: message }
    }
})

export const edit_item = form(async (data) => {
    try {
        await db.update(table.item).set({
            id: data.get('id') as string,
            description: data.get('description') as string,
            created: new Date(),
            updated: new Date(),
        }).where(eq(table.item.id, data.get('id') as string))
        items().refresh()
        return { success: true, message: 'Item edited successfully' }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log({ error })
        return { success: false, error: message }
    }
})


export const delete_item = form(async (data) => {
    try {
        const itemId = data.get('itemId') as string;
        await db.delete(table.item).where(eq(table.item.id, itemId));
        items().refresh()
        return { success: true }
    } catch (e) {
        console.log(222, { e })
        return { error: 'Failed to delete item' }
    }
})