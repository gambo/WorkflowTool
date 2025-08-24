import { form, query } from "$app/server";
import { db } from "$lib/server/db";
import type { RemoteForm } from "@sveltejs/kit";
import { eq, getTableColumns, Table } from 'drizzle-orm'
import { createUpdateSchema, type BuildRefine } from "drizzle-zod";
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
    table: T
    refinements: RefineSchema<T>
}
export type RefineSchema<TTable extends Table> = BuildRefine<
    TTable["_"]["columns"],
    undefined
>;

export const crud = <T extends Table>(config: CrudConfig<T>) => {
    const { label, table, refinements } = config;
    const insertSchema = createUpdateSchema(table, refinements);
    const editSchema = createUpdateSchema(table, refinements);
    const list = query(async () => {
        const ret = await db.select().from(table as T)
        return ret
    })

    const find_by_id = query(z.int(), async (id_to_del) => {
        const { id } = getTableColumns(table)
        return await db.select().from(table).where(eq(id, id_to_del))
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
        const id_to_edit = invalid['id']
        const values = editSchema.safeParse(invalid)
        if (values.success) {
            const { id } = getTableColumns(table)
            await db.update(table).set(values.data).where(eq(id, id_to_edit))
            await list().refresh()
            return { status: 'success', message: `Successfully edited new column` }
        } else {
            return { status: 'fail', error: values.error.issues }
        }
    })

    const del = form(async (data) => {
        const id_to_delete = data.get('id')
        if (typeof id_to_delete === 'string') {
            const { id } = getTableColumns(table)
            await db.delete(table).where(eq(id, parseInt(id_to_delete)))
            await list().refresh()
            return { status: 'success', message: 'Successfully deleted' }
        } else {
            return { status: 'fail', message: 'Could not delete' }
        }
    })
    return { list, add, del, edit, find_by_id }
}