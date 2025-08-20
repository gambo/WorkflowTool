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
    return db.query.job.findFirst({
        where: eq(table.job.id, id),
        with: {
            jobItems: {
                with: {
                    item: true
                }
            }
        }
    })
})


export const jobItems = query(z.string(), (jobId) => {
    return db.select().from(table.jobItems).where(eq(table.jobItems.jobId, jobId))
        .leftJoin(table.item, eq(table.jobItems.itemId, table.item.id))
})

export const add_job = form(async (data) => {
    const invalid: Record<string, unknown> = Object.fromEntries(data.entries());
    console.log(123, Object.fromEntries(data.entries()))
    invalid.id = generateId();
    invalid.created = new Date();
    invalid.updated = new Date();
    invalid.quantity = Number(invalid.quantity ?? 0);

    const value = createInsertSchema(table.job).safeParse(invalid);
    if (value.success) {
        await db.insert(table['job']).values(value.data)
        for (const item of data.getAll('item_description')) {
            await db.insert(table.jobItems).values({
                id: generateId(),
                created: new Date(),
                updated: new Date(),
                jobId: invalid.id as string,
                itemId: String(item),
            })
        }
        await jobs().refresh()
        return { success: true, message: 'Job added successfully' }
    } else {
        console.log(value)
        return db_failure(value.error)
    }
})

const db_failure = (error: unknown) => {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message }
}

export const edit_job = form(async (data) => {
    try {
        await db.update(table.job).set({
            id: data.get('id') as string,
            status: data.get('status') as "active" | "inactive",
            quantity: Number(data.get('quantity') ?? 0),
            description: data.get('description') as string,
            priority: data.get('priority') as "high" | "medium" | "low",
            updated: new Date(),
        }).where(eq(table.job.id, data.get('id') as string))

        await jobs().refresh()
        return { success: true, message: 'Job edited successfully' }
    } catch (error) { return db_failure(error) }
})


export const delete_job = form(async (data) => {
    try {
        const jobId = data.get('jobId') as string;
        await db.delete(table.job).where(eq(table.job.id, jobId));
        await jobs().refresh()
        return { success: true }
    } catch (e) { return db_failure(e) }
})