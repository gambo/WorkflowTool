import { form, query } from '$app/server'
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';
import z from 'zod';

function generateId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}

export const jobs = query(async () => {
    return db.query.job.findMany({
        with: {
            jobItems: {
                with: {
                    item: true
                }
            }
        }
    })
})

export const job = query(z.union([z.string(), z.undefined()]), (id) => {
    if (!id) return
    return db.select().from(table.job)
        .where(eq(table.job.id, id))
        .leftJoin(table.jobItems, eq(table.job.id, table.jobItems.jobId))
        .leftJoin(table.item, eq(table.jobItems.itemId, table.item.id))
})


export const jobItems = query(z.string(), (jobId) => {
    return db.select().from(table.jobItems).where(eq(table.jobItems.jobId, jobId))
        .leftJoin(table.item, eq(table.jobItems.itemId, table.item.id))
})

export const add_job = form(async (data) => {
    try {
        const invalid: Record<string, unknown> = Object.fromEntries(data.entries());
        invalid.id = generateId();
        invalid.created = new Date();
        invalid.updated = new Date();
        invalid.quantity = Number(invalid.quantity ?? 0);

        const value = createInsertSchema(table.job).parse(invalid);
        await db.insert(table.job).values(value)
        for (const item of data.getAll('item_description')) {
            await db.insert(table.jobItems).values({
                id: generateId(),
                created: new Date(),
                updated: new Date(),
                jobId: invalid.id as string,
                itemId: String(item),
            }).catch((e) => {
                throw new Error(`Failed to add job item: ${e.message}`);
            })
        }
        jobs().refresh()
        return { success: true, message: 'Job added successfully' }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return { success: false, error: message }
    }
})

export const edit_job = form(async (data) => {
    try {
        await db.update(table.job).set({
            id: data.get('id') as string,
            status: data.get('status') as "active" | "inactive",
            quantity: Number(data.get('quantity') ?? 0),
            description: data.get('description') as string,
            priority: data.get('priority') as "high" | "medium" | "low",
            created: new Date(),
            updated: new Date(),
        }).where(eq(table.job.id, data.get('id') as string))
        jobs().refresh()
        return { success: true, message: 'Job edited successfully' }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.log({ error })
        return { success: false, error: message }
    }
})


export const delete_job = form(async (data) => {
    try {
        const jobId = data.get('jobId') as string;
        await db.delete(table.job).where(eq(table.job.id, jobId));
        jobs().refresh()
        return { success: true }
    } catch (e) {
        console.log(222, { e })
        return { error: 'Failed to delete job' }
    }
})