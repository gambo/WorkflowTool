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

export const jobs = query(() => {
    return db.query.job.findMany()
})

export const job = query(z.union([z.string(), z.undefined()]), (id) => {
    if (!id) return
    return db.query.job.findFirst({
        where: eq(table.job.id, id)
    })
})

export const add_job = form(async (data) => {
    try {
        await db.insert(table.job).values({
            id: generateId(),
            status: data.get('status') as "active" | "inactive",
            created: new Date(),
            updated: new Date(),
        })
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