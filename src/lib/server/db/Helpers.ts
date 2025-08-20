import { form, query } from "$app/server";
import { db } from "$lib/server/db";
import { eq, getTableColumns, type TableConfig } from "drizzle-orm";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";
import type { RemoteForm } from "@sveltejs/kit";
import type { $ZodIssue } from "zod/v4/core";
import type { ZodObject } from "zod";

type AddToDBRemoteFunction = RemoteForm<{
    success: true;
    message: string;
} | {
    success: false;
    error: $ZodIssue[];
}>;

type CrudConfig = {
    table: SQLiteTable<TableConfig>,
    schema: ZodObject,
    label: string
}
export const crud = (config: CrudConfig) => {
    const { table, schema, label } = config
    const list = query(async () => db.select().from(table))
    const add: AddToDBRemoteFunction = form(async (data) => {
        const formdata = Object.fromEntries(data.entries())
        const value = schema.safeParse(formdata)
        if (value.success) {
            await db.insert(table).values(value.data)
            list().refresh()
            return { success: true, message: `Successfully added new ${label}` }
        } else {
            return { success: false, error: value.error.issues }
        }
    })

    const del = form(async (data) => {
        const id_to_delete = data.get('id')
        const { id } = getTableColumns(table)
        await db.delete(table).where(eq(id, id_to_delete))
        list().refresh()
    })

    return { list, add, del }
}