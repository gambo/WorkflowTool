import { form, query } from "$app/server";
import { db } from "$lib/server/db";
import type { RemoteForm } from "@sveltejs/kit";
import { eq, Table, type SQLWrapper } from 'drizzle-orm'
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from 'zod'
import type { $ZodIssue } from 'zod/v4/core';

type AddType = RemoteForm<
    | { status: 'success'; message: string }
    | { status: 'fail'; error: $ZodIssue[] }
>
type EditType = RemoteForm<
    | { status: 'success'; message: string }
    | { status: 'fail'; error: $ZodIssue[] | string }
>

type CrudConfig<T extends Table> = {
    label: string;
    table: T & {
        id: SQLWrapper
    }
}

export const crud = <T extends Table>(config: CrudConfig<T>) => {
    const { table, label } = config
    const insertSchema = createInsertSchema(table);
    const editSchema = createUpdateSchema(table);

    const list = query(async () => {
        return await db.select().from(table)
    })

    const find_by_id = query(z.int(), async (id_to_del) => {
        if ('id' in table) {
            return await db.select().from(table).where(eq(table.id, id_to_del))
        }
    })


    const add: AddType = form(async (data) => {
        const invalid = Object.fromEntries(data.entries())
        const values = insertSchema.safeParse(invalid)
        if (values.success) {
            await db.insert(table).values(values.data)
            await list().refresh()
            return { status: 'success', message: `Successfully added new ${label}` }
        } else {
            return { status: 'fail', error: values.error.issues }
        }
    })


    const edit: EditType = form(async (data) => {
        const invalid = Object.fromEntries(data.entries())
        const values = editSchema.safeParse(invalid)
        if (values.success) {
            if ('id' in values.data) {
                await db.update(table).set(values.data).where(eq(table.id, values.data.id))
                await list().refresh()
                return { status: 'success', message: `Successfully edited new column` }
            }
        } else {
            return { status: 'fail', error: values.error.issues }
        }
    })

    const del = form(async (data) => {
        const id_to_delete = data.get('id')
        if (typeof id_to_delete === 'string') {
            await db.delete(table).where(eq(table.id, parseInt(id_to_delete)))
            await list().refresh()
            return { status: 'success', message: 'Successfully deleted' }
        } else {
            return { status: 'fail', message: 'Could not delete' }
        }
    })
    return { list, add, del, edit, find_by_id }
}